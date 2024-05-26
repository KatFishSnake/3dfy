'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import Uploader from '@/components/Uploader';

type PropsType = {
	isSignedIn: boolean;
	onLogin?: () => void;
};

const WorkspaceSection = ({ isSignedIn, onLogin }: PropsType) => {
	const router = useRouter();
	const [messageDialog, setMessageDialog] = useState<string>(
		'The generation of the 3D logo is a process that takes up to one',
	);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const handleSubmit = async (file: File | null) => {
		if (!file) return;

		setIsUploading(true);
		const res = await fetch('/api/upload', {
			method: 'POST',
			headers: { 'content-type': file?.type || 'application/octet-stream' },
			body: file,
		});

		if (res.status !== 200) {
			const error = await res.text();
			console.error(error);
			return;
		}

		setIsDialogOpen(true);

		const { url } = await res.json();
		try {
			await fetch('/api/generate', {
				method: 'POST',
				body: JSON.stringify({
					url: url,
				}),
			});

			setIsUploading(false);
			await router.push('/dashboard');
		} catch (error) {
			console.error(error);
			setMessageDialog('An error occurred. Please try again later.');
			setIsUploading(false);
			setIsError(true);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center w-full'>
			<Dialog
				open={isDialogOpen}
				onOpenChange={(visible) => {
					if (!visible) {
						setIsDialogOpen(visible);
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Generation of the 3D logo</DialogTitle>
						<DialogDescription>
							{messageDialog}
							{!isError ? (
								<div className='flex items-center justify-center gap-1 pt-8 text-center text-zinc-700'>
									<Loader2 className='w-3 h-3 animate-spin' />
									Redirecting...
								</div>
							) : null}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
				<Uploader
					onLogin={onLogin}
					onUpload={handleSubmit}
					isLoading={isUploading}
					withUser={isSignedIn}
				/>
			</div>
		</div>
	);
};

export default WorkspaceSection;
