'use server';

import { auth } from '@/edgedb';
import { revalidatePath } from 'next/cache';
const authActions = auth.createServerActions();

export const { signout, emailPasswordSignIn } = authActions;

export async function updateUserEmail(email: string) {
	const session = auth.getSession();

	const updateUserEmail = await session.client.query(
		`UPDATE User
     FILTER global current_user.id = .id
     SET {
       email := <str>$newEmail
     }`,
		{
			newEmail: email, // replace this with the new email address variable
		},
	);

	revalidatePath('/');

	return updateUserEmail;
}

export async function checkIfImagesChanged() {
	const session = auth.getSession();
	const generations = await session.client.query(
		`SELECT Generation {
      id,
      status
    }
    FILTER .created_by.id = global current_user.id`,
	);

	if ((generations as any[]).some((gen) => gen.status !== 'succeeded')) {
		revalidatePath('/');
	}

	return;
}
