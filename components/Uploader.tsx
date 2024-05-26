'use client';

import {
	useState,
	useCallback,
	useMemo,
	type ChangeEvent,
	useRef,
} from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2, Trash2, Wand2Icon } from 'lucide-react';
import { cn } from '@/utils';
import { toast } from 'sonner';

function Uploader({
	onUpload,
	isLoading,
	withUser,
}: {
	onUpload: (file: File | null) => void;
	isLoading?: boolean;
	withUser?: boolean;
}) {
	const [data, setData] = useState<{
		image: string | null;
	}>({
		image: null,
	});
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [dragActive, setDragActive] = useState(false);

	const onChangePicture = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.currentTarget.files?.[0];
			if (file) {
				if (file.size / 1024 / 1024 > 5) {
					toast.error('File size too big (max 5MB)', {
						duration: 5000,
					});
				} else if (file.type === 'image/gif' || file.type === 'video/mp4') {
					toast.error('The file must be an image, jpg or png', {
						duration: 5000,
					});
				} else {
					setFile(file);
					const reader = new FileReader();
					reader.onload = (e) => {
						setData((prev) => ({ ...prev, image: e.target?.result as string }));
					};
					reader.readAsDataURL(file);
				}
			}
		},
		[setData],
	);

	const saveDisabled = useMemo(() => {
		return !data.image || isLoading;
	}, [data.image, isLoading]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await onUpload(file);
	};

	return (
		<form
			className={cn('flex flex-col gap-3', file ? 'aspect-square' : 'h-48')}
			onSubmit={handleSubmit}
		>
			<div className='relative flex flex-col flex-1 min-w-[350px] border border-gray-300 rounded-md transition-all'>
				<label
					htmlFor='image-upload'
					className={cn(
						'group relative flex flex-1 cursor-pointer flex-col items-center justify-center rounded-md bg-white shadow-sm transition-all hover:bg-gray-50',
					)}
				>
					<div
						className='absolute z-[5] h-full w-full rounded-md'
						onDragOver={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setDragActive(true);
						}}
						onDragEnter={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setDragActive(true);
						}}
						onDragLeave={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setDragActive(false);
						}}
						onDrop={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setDragActive(false);

							const file = e.dataTransfer.files?.[0];
							if (file) {
								if (file.size / 1024 / 1024 > 5) {
									toast.error('File size too big (max 5MB)', {
										duration: 5000,
									});
								} else {
									setFile(file);
									const reader = new FileReader();
									reader.onload = (e) => {
										setData((prev) => ({
											...prev,
											image: e.target?.result as string,
										}));
									};
									reader.readAsDataURL(file);
								}
							}
						}}
					/>
					<div
						className={`${
							dragActive ? 'border-2 border-black' : ''
						} absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
							data.image
								? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
								: 'bg-white opacity-100 hover:bg-gray-50'
						}`}
					>
						<ImagePlus className='w-8 h-8 text-gray-400' />
						<p className='text-xs text-center text-gray-500'>
							Select your image to 3Dfy
						</p>
						<p className='text-xs text-center text-gray-500'>
							Drag and drop or click to upload.
						</p>
						<p className='text-xs text-center text-gray-500'>
							Max file size: 5MB
						</p>
						<span className='sr-only'>Photo upload</span>
					</div>
					{data.image && (
						<img
							src={data.image}
							alt='Preview'
							className='object-contain w-full h-full rounded-md'
						/>
					)}
				</label>
				<div className='flex mt-1 rounded-md shadow-sm sr-only'>
					<input
						ref={imageInputRef}
						id='image-upload'
						name='image'
						type='file'
						accept='.jpg, .jpeg, .png, .webp'
						className='sr-only'
						onChange={onChangePicture}
					/>
				</div>

				{file ? (
					<div className='absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full transition-all rounded-md hover:bg-white-100 hover:bg-opacity-40 group hover:backdrop-blur-sm'>
						<Button
							variant={'outline'}
							size={'icon'}
							disabled={saveDisabled}
							onClick={(e) => {
								e.preventDefault();
								setData({ image: null });
								setFile(null);
								// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
								imageInputRef.current && (imageInputRef.current.value = '');
							}}
							className='text-white transition-opacity bg-transparent opacity-0 group-hover:opacity-100 hover:bg-zinc-50 hover:text-zinc-400'
						>
							<Trash2 className='w-12 h-12 p-2' />
						</Button>
					</div>
				) : null}
			</div>

			{file ? (
				withUser ? (
					<Button size={'lg'} disabled={saveDisabled}>
						{isLoading ? (
							<Loader2 className='w-6 h-6 mr-2 animate-spin text-slate-100' />
						) : (
							<Wand2Icon className='w-5 h-5 mr-2' />
						)}
						<p className='text-sm'>Make 3D</p>
					</Button>
				) : (
					<p className='mx-auto'>Please sign in first</p>
				)
			) : null}

			{!file ? (
				<p className='pt-2 text-xs text-center text-gray-500'>
					Accepted formats: .png, .jpg
				</p>
			) : null}
		</form>
	);
}

export default Uploader;
