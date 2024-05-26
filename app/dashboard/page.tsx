import { GridImages } from '@/components/GridImages';
import { redirect } from 'next/navigation';
import { auth } from '@/edgedb';
import type { User } from '@/dbschema/interfaces';
import EmailForm from '@/components/EmailPrompt';
import { RefreshCache } from '@/components/RefreshCache';
import { checkIfImagesChanged } from '../actions';

export default async function DashboardPage() {
	const session = auth.getSession();
	const signedIn = await session.isSignedIn();

	if (!signedIn) {
		redirect(auth.getBuiltinUIUrl());
	}

	const [user] = (await session.client.query(
		'SELECT User {*} FILTER .id = global current_user.id',
	)) as User[];

	return (
		<div className='flex-1 w-full custom-screen'>
			<div className='pt-12'>
				<RefreshCache check={checkIfImagesChanged} />
				<EmailForm currentUser={user} />
				<GridImages />
			</div>
		</div>
	);
}
