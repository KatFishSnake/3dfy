'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { User } from '@/dbschema/interfaces';
import { toast } from 'sonner';
import { updateUserEmail } from '@/app/actions';

const EmailForm = ({ currentUser }: { currentUser: User }) => {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		await updateUserEmail(email);
		setIsLoading(false);
		toast.success('Email added successfully.', {
			duration: 5000,
		});
	};

	if (!currentUser || currentUser.email) {
		return null;
	}

	return (
		<div className='flex flex-0 flex-col max-w-[500px] px-6 p-4 rounded-xl bg-slate-50 border-2 border-zinc-100 mb-6'>
			<h1 className='text-lg font-bold text-zinc-600'>
				Get Notified When Your Model is Ready
			</h1>
			<p className='mb-4 text-sm text-zinc-400'>
				The generation process takes about 1-2 minutes. Enter your email address
				below and we'll notify you once it's done.
			</p>

			<form
				onSubmit={handleSubmit}
				className='flex items-center space-x-2 relative'
			>
				<Mail className='text-zinc-500 absolute left-4 w-5 h-5' />
				<Input
					type='email'
					placeholder='Enter your email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='flex-1 pl-[36px]'
				/>
				<Button variant={'outline'} type='submit'>
					{isLoading ? 'Loading...' : 'Submit'}
				</Button>
			</form>
		</div>
	);
};

export default EmailForm;
