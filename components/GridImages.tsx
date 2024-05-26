import Link from 'next/link';
import { Loader2, Scroll, Wand2Icon } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import { Card, CardContent } from './ui/card';
import { DialogCancelGeneration } from './DialogCancelGeneration';
import { Button } from './ui/button';
import { cn } from '@/utils';
import queryBuilder from '@/dbschema/edgeql-js';
import { auth } from '@/edgedb';
import type { User } from '@/dbschema/interfaces';

export async function GridImages() {
	const session = auth.getSession();

	const [user] = (await session.client.query(
		'SELECT User {*} FILTER .id = global current_user.id',
	)) as User[];

	const generations = await queryBuilder
		.select(queryBuilder.Generation, (generation) => ({
			id: true,
			status: true,
			input_image_path: true,
			filter: queryBuilder.op(
				generation.created_by.id,
				'=',
				queryBuilder.uuid(user?.id!),
			),
		}))
		.run(session.client);

	async function handleRevalidatePath(path: string) {
		'use server';

		revalidatePath(path);
	}

	if (generations.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center'>
				<div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
					<div className='flex flex-col items-center space-y-4'>
						<Scroll className='w-8 h-8 ' />
						<div className='text-center'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
								No generations yet
							</h2>
							<div className='flex gap-2 mt-4 max-w-[300px] mx-auto p-2 rounded-md'>
								<div className='flex items-center justify-center'>
									<Loader2 className='w-4 h-4 animate-spin text-slate-800' />
								</div>
								<p className='text-left text-gray-600 dark:text-gray-400'>
									We are continuously checking for new generations.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{generations.map((item) => (
				<Link
					key={item.id}
					href={`/dashboard/${item.id}`}
					className='relative group'
				>
					<Card className='overflow-hidden'>
						<CardContent className='relative flex items-center justify-center p-0 aspect-square'>
							{item?.input_image_path ? (
								<Image
									fill
									src={item?.input_image_path}
									className={cn(
										item.status === 'starting' ? 'opacity-50' : '',
										'group-hover:scale-105 transition-all object-contain',
									)}
									alt='replicaSet'
								/>
							) : null}
							{item.status === 'starting' ? (
								<div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full backdrop-blur-sm'>
									<div className='flex flex-col items-center justify-center gap-3'>
										<Loader2 className='w-8 h-8 animate-spin ' />
										<span className='font-semibold '>
											Generation in progress
										</span>
									</div>
									<DialogCancelGeneration
										label='Cancel'
										classNameTrigger='mt-4 mx-auto'
										handleRevalidatePath={handleRevalidatePath}
										predictionId={item.id}
									/>
								</div>
							) : null}
						</CardContent>
					</Card>
				</Link>
			))}
			<Card className='bg-zinc-100 border-0 aspect-square'>
				<CardContent className='relative p-0 overflow-hidden aspect-square'>
					<div className='flex flex-col items-center justify-center h-full gap-3'>
						<Link href='/' className='block'>
							<Button size={'lg'}>
								<Wand2Icon className='w-5 h-5 mr-2' />
								<p className='text-sm'>Generate more</p>
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
