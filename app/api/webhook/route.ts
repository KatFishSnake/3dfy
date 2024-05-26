import type { Prediction } from 'replicate';
import type { UploadFileResult } from 'uploadthing/types';
import e from '@/dbschema/edgeql-js';
import { auth } from '@/edgedb';
import { utapi } from '@/libs/Uploadthing';
import { getResendInstance } from '@/libs/resend';

const resend = getResendInstance();

export async function POST(req: Request) {
	const url = new URL(req.url);
	const token = url.searchParams.get('token');
	const session = await auth.getSession();

	if (token !== process.env.WEBHOOK_TOKEN) {
		console.error('Missing token', req.url);
		return new Response('Missing token', { status: 400 });
	}

	const prediction: Prediction = await req.json();

	const generation = await e.select(e.Generation, (generation) => ({
		id: true,
		replicateId: true,
		created_by: true,
		filter_single: e.op(generation.replicateId, '=', prediction.id),
	}));

	if (!generation) {
		console.error('Missing generation id', generation, prediction.id);
		return new Response('Generation not found', { status: 404 });
	}

	let uploadedFiles: UploadFileResult[] = [];
	const parsedPrediction = { ...prediction };

	if (parsedPrediction.status === 'processing') {
		return new Response('OK', { status: 200 });
	}

	if (parsedPrediction.status === 'succeeded') {
		// Upload to uploadthing of the assets received from Replicate
		const outputReplica: string[] = prediction.output ?? [];
		if (outputReplica.length > 0) {
			try {
				uploadedFiles = await utapi.uploadFilesFromUrl(outputReplica);
				parsedPrediction.output = uploadedFiles.map((file) => file.data?.url);
			} catch (e) {
				console.error('Error uploading files: ', e);
				return new Response('Error uploading files', { status: 500 });
			}
		}
	}

	const sessionClientWithConfig = session.client.withConfig({
		apply_access_policies: false,
	});

	try {
		const updateGeneration = await sessionClientWithConfig.query(
			`UPDATE Generation
			 FILTER .replicateId = <str>$replicateId
			 SET {
				 status := <str>$status,
				 updated := datetime_of_statement(),
				 output_image_path := <str>$output_image_path,
				 output_video_path := <str>$output_video_path,
				 output_obj_path := <str>$output_obj_path,
				 output_mtl_path := <str>$output_mtl_path,
				 output_texture_path := <str>$output_texture_path
			 }`,
			{
				replicateId: prediction.id,
				status: prediction.status,
				output_image_path: parsedPrediction.output[0],
				output_video_path: parsedPrediction.output[1],
				output_obj_path: parsedPrediction.output[2],
				output_mtl_path: parsedPrediction.output[3],
				output_texture_path: parsedPrediction.output[4],
			},
		);

		if (updateGeneration.length) {
			const [userId] = await sessionClientWithConfig.query(
				`SELECT Generation {
					created_by: {
						id
					}
				}
				FILTER .replicateId = <str>$replicateId`,
				{
					replicateId: prediction.id,
				},
			);

			// Second query to get the user email using the user ID
			const [userEmail] = await session.client.query(
				`SELECT User.email
				 FILTER User.id = <uuid>$userId`,
				{
					userId: (userId as { created_by: { id: string } }).created_by.id,
				},
			);

			console.log('userId', userEmail);

			const { error: errorEmail } = await resend.emails.send({
				from: 'info@3Dfy.tools',
				to: [userEmail as string],
				subject: 'Congratulations - Your 3D model is ready!',
				text: `Dear User,
			
			Your 3D model is now ready for you to view and download. 
			
			Please click the link below to access your model:
			https://3dfy-hosting-test.vercel.app/${
				(updateGeneration[0] as { id: string }).id
			}
			
			Thank you for using our service!
			
			Best regards,
			The 3Dfy Team`,
			});

			if (errorEmail) {
				console.error('Error sending email: ', errorEmail);
			}
		}

		console.info('[LOG] Generated: ', updateGeneration);
	} catch (e) {
		console.error('Error saving prediction to the database: ', e);
		return new Response('Error saving prediction to the database', {
			status: 500,
		});
	}

	return new Response('OK', { status: 200 });
}
