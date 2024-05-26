import { auth } from '@/edgedb';
import type { User } from '@/dbschema/interfaces';

type RequestDeleteGeneration = {
	data: {
		predictionId: string;
	};
};

export async function DELETE(req: Request) {
	const {
		data: { predictionId },
	}: RequestDeleteGeneration = await req.json();

	if (!predictionId) {
		return new Response('Prediction ID is required', { status: 400 });
	}

	const session = await auth.getSession();
	const [user] = (await session.client.query(
		'SELECT User {*} FILTER .id = global current_user.id',
	)) as User[];

	const userId = user?.id;
	if (userId === null) {
		return new Response('User not found', { status: 404 });
	}

	try {
		const generationsDeleted = await session.client.query(
			'DELETE Generation FILTER .id = <uuid>$id',
			{
				id: predictionId,
			},
		);

		if (generationsDeleted === null) {
			return new Response('Generation not found', { status: 404 });
		}

		return new Response('Generation deleted', { status: 200 });
	} catch (error) {
		console.error('Error deleting generation: ', error);
		return new Response('Error deleting generation', { status: 500 });
	}
}
