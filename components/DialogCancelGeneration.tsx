'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

export function DialogCancelGeneration({
	label = 'Delete',
	predictionId,
	classNameTrigger,
	handleRevalidatePath,
}: {
	label: string;
	predictionId: string;
	classNameTrigger?: string;
	handleRevalidatePath: (path: string) => void;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		e.nativeEvent.stopImmediatePropagation();

		setIsDeleting(true);

		try {
			const response = await fetch('/api/delete-generation', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						predictionId: predictionId,
					},
				}),
			});

			if (response.status !== 200) {
				toast.error('An error occurred. Please try again later.', {
					duration: 5000,
				});
				setIsDeleting(false);
				setOpen(false);
				return;
			}

			toast.success('Generation deleted successfully.', {
				duration: 5000,
			});

			if (pathname !== '/dashboard') {
				router.push('/dashboard');
			}

			handleRevalidatePath('/');
			setIsDeleting(false);
			setOpen(false);
		} catch (error) {
			console.error(error);
			toast.error('An error occurred. Please try again later.');
			setIsDeleting(false);
			setOpen(false);
		}
	};

	return (
		<>
			<Button
				size='sm'
				variant='destructive'
				onClick={(e) => {
					e.preventDefault();
					e.nativeEvent.stopImmediatePropagation();
					setOpen(true);
				}}
				className={classNameTrigger}
			>
				{label}
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{label} generation</DialogTitle>
					</DialogHeader>
					<DialogDescription className='flex flex-col gap-2'>
						<p>
							Are you absolutely sure that you want to {label.toLowerCase()} the
							generation of the 3D asset?
						</p>
						<Button onClick={handleDelete} variant='destructive'>
							{!isDeleting ? (
								`${label} generation`
							) : (
								<Loader2 className='w-8 h-8 text-white animate-spin' />
							)}
						</Button>
					</DialogDescription>
				</DialogContent>
			</Dialog>
		</>
	);
}
