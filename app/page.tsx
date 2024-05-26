import {
	WireColor,
	WireColorAlt,
	WireColorAltAlt,
	WireGray,
} from '@/components/LandingPageWires';
import WorkspaceSection from '@/components/WorkspaceSection';
import { auth } from '@/edgedb';
import Image from 'next/image';

export default async function Home() {
	const session = await auth.getSession();
	const isSignedIn = await session.isSignedIn();

	return (
		<div className='flex flex-col items-center justify-center flex-1'>
			<section>
				<div className='text-gray-600 custom-screen'>
					<div className='max-w-4xl mx-auto space-y-5 text-center'>
						<h1 className='max-w-xl mx-auto text-4xl font-extrabold text-gray-800 sm:text-6xl'>
							Transform Your <br /> 2D Assets to 3D
						</h1>
						<p className='max-w-md mx-auto'>
							<span className='font-bold'>3Dfy</span>{' '}
							<Image
								src='/logo-animation.gif'
								alt='logo-animated'
								width={20}
								height={15}
								className='inline -mt-2 -ml-1'
								unoptimized
							/>{' '}
							elevates your visuals with our powerful image to model conversion.
						</p>
					</div>
				</div>
			</section>
			<section className='flex py-4 w-full nax-w-[1550px]'>
				<div className='w-full min-h-[350px] h-auto relative overflow-x-hidden overflow-y-visible -mt-12'>
					<WireGray className='right-0 top-[calc(50%-320px/2)]' />
					<WireColor className='right-0 top-[calc(50%-320px/2)]' />
					<WireColorAlt className='right-0 top-[calc(50%-320px/2)]' />
					<WireColorAltAlt className='right-0 top-[calc(50%-320px/2)]' />
				</div>
				<WorkspaceSection isSignedIn={isSignedIn} />
				<div className='w-full min-h-[350px] h-auto rotate-180 relative overflow-x-hidden overflow-y-visible -mt-12'>
					<WireGray className='right-0 bottom-[calc(50%-320px/2)]' />
					<WireColor className='right-0 bottom-[calc(50%-320px/2)]' />
					<WireColorAlt className='right-0 bottom-[calc(50%-320px/2)]' />
					<WireColorAltAlt className='right-0 bottom-[calc(50%-320px/2)]' />
				</div>
			</section>
		</div>
	);
}
