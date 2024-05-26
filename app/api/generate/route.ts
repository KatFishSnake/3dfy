import type { NextRequest } from 'next/server';
import { replicateClient } from '@/libs/Replicate';
import type { Prediction as ReplicatePrediction } from 'replicate';
import e from '@/dbschema/edgeql-js';
import { auth } from '@/edgedb';
import type { User } from '@/dbschema/interfaces';

type GenerateRequest = {
	url: string;
};

interface Input {
	export_texmap?: boolean;
	export_video?: boolean;
	image_path?: string;
	remove_background?: boolean;
	sample_steps?: number;
	seed?: number;
}

interface Prediction extends ReplicatePrediction {
	input: Input;
}

export async function POST(request: NextRequest) {
	const reqBody = (await request.json()) as GenerateRequest;
	const session = await auth.getSession();

	try {
		if (!reqBody.url) {
			throw new Error('URL is required');
		}
	} catch (e) {
		if (e instanceof Error) {
			return new Response(e.message, { status: 400 });
		}
	}

	const replicaRequest: Prediction = await replicateClient.generate3DModel({
		image_path: reqBody.url,
		seed: '42',
		export_video: true,
		sample_steps: 75,
		remove_background: true,
		export_texmap: true,
	});

	const [user] = (await session.client.query(
		'SELECT User {*} FILTER .id = global current_user.id',
	)) as User[];

	const userId = user?.id;

	if (!userId) {
		return new Response('User not found', { status: 404 });
	}

	try {
		await e
			.insert(e.Generation, {
				replicateId: replicaRequest.id,
				status: replicaRequest.status,
				created: new Date(),
				model: replicaRequest.model,
				input_image_path: replicaRequest.input.image_path,
			})
			.run(session.client);
	} catch (e) {
		console.error('Error saving prediction to the database: ', e);
	}

	return new Response(JSON.stringify(replicaRequest), { status: 200 });
}
