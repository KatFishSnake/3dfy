import { ArrowLeft, FileDown, Loader2 } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

import { Button, buttonVariants } from '@/components/ui/button';
import ModelRenderingView from '@/components/ModelRenderingView';
import { DialogCancelGeneration } from '@/components/DialogCancelGeneration';
import e from '@/dbschema/edgeql-js';

import { DialogShareX } from '@/components/DialogShareX';
import { auth } from '@/edgedb';

interface PageProps {
	params: {
		itemid: string;
	};
}

export default async function Page({ params: { itemid } }: PageProps) {
	const session = auth.getSession();
	async function handleRevalidatePath(path: string) {
		'use server';
		revalidatePath(path);
	}

	const data = await e
		.select(e.Generation, (generation) => ({
			status: true,
			id: true,
			replicateId: true,
			output_image_path: true,
			output_video_path: true,
			output_obj_path: true,
			output_mtl_path: true,
			output_texture_path: true,
			filter_single: e.op(generation.id, '=', e.uuid(itemid)),
		}))
		.run(session.client);

	if (data === null) {
		<div>
			<p>Generation not found</p>
		</div>;
	}

	if (data?.status !== 'succeeded') {
		return (
			<div className='flex flex-col items-center justify-center flex-1'>
				<div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<Loader2 className='w-8 h-8 animate-spin' />
						<div className='flex flex-col text-center'>
							<h2 className='text-2xl font-bold'>
								Asset Generation in Progress
							</h2>
							<p className='mt-2 text-gray-600 dark:text-gray-400'>
								Please wait while we generate your asset. This may take a few
								moments.
							</p>
							<Link
								href='/dashboard'
								className={buttonVariants({
									size: 'sm',
									variant: 'default',
									className: 'mt-4 w-full sm:w-1/2 mx-auto',
								})}
							>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Go back
							</Link>
							<DialogCancelGeneration
								classNameTrigger='mt-4 w-full sm:w-1/2 mx-auto'
								handleRevalidatePath={handleRevalidatePath}
								predictionId={data?.id!}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex-1 custom-screen pt-12'>
			<div className='flex flex-row justify-between'>
				<div className='flex gap-2'>
					{data.output_image_path ? (
						<Link href={data.output_image_path} download>
							<Button variant='outline' size='sm'>
								<FileDown className='w-4 h-4 mr-2' />
								Download Image
							</Button>
						</Link>
					) : null}
					{data.output_video_path ? (
						<Link href={data.output_video_path} download>
							<Button variant='outline' size='sm'>
								<FileDown className='w-4 h-4 mr-2' />
								Download Video
							</Button>
						</Link>
					) : null}
					{data.output_obj_path ? (
						<Link href={data.output_obj_path} download>
							<Button variant='outline' size='sm'>
								<FileDown className='w-4 h-4 mr-2' />
								Download OBJ
							</Button>
						</Link>
					) : null}
					{data.output_mtl_path ? (
						<Link href={data.output_mtl_path} download>
							<Button variant='outline' size='sm'>
								<FileDown className='w-4 h-4 mr-2' />
								Download MTL
							</Button>
						</Link>
					) : null}
					{data.output_texture_path ? (
						<Link href={data.output_texture_path} download>
							<Button variant='outline' size='sm'>
								<FileDown className='w-4 h-4 mr-2' />
								Download Texture
							</Button>
						</Link>
					) : null}
				</div>
				<DialogCancelGeneration
					handleRevalidatePath={handleRevalidatePath}
					predictionId={data.id}
				/>
			</div>
			<div className='pt-12'>
				<div className='space-y-8 md:space-y-12'>
					<div className='p-6 bg-zinc-100 : null}rounded-lg dark:bg-gray-800 md:p-8 rounded-md'>
						<h2 className='mb-4 text-2xl font-bold'>3D rendering</h2>
						<div className='max-w-xl mx-auto aspect-square'>
							{data.output_obj_path &&
							data.output_mtl_path &&
							data.output_texture_path ? (
								<ModelRenderingView
									obj={data.output_obj_path}
									mtl={data.output_mtl_path}
									texture={data.output_texture_path}
								/>
							) : null}
						</div>
					</div>
					<div className='grid gap-8 md:grid-cols-2 md:gap-12'>
						{data.output_image_path ? (
							<div className='space-y-4'>
								<h2 className='text-2xl font-bold'>Image surrounded</h2>
								<DialogShareX url={data.output_image_path} />
								<Image
									alt='Acme 3D Printer'
									className='object-contain rounded-lg aspect-square'
									height={600}
									src={data.output_image_path}
									width={800}
								/>
							</div>
						) : null}
						<div className='space-y-4'>
							{data.output_video_path ? (
								<>
									<h2 className='text-2xl font-bold'>Model recording</h2>
									<DialogShareX url={data.output_video_path} />
									<div className='overflow-hidden rounded-lg aspect-square'>
										<video
											autoPlay
											className='object-cover w-full h-full'
											loop
											muted
											playsInline
											src={data.output_video_path}
										/>
									</div>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
