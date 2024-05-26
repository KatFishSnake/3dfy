import { EdgeDbLogo } from './logos/edgeLogo';
import { V0Logo } from './logos/v0Logo';

const Footer = () => (
	<footer>
		<div className='custom-screen'>
			<div className='py-2 items-center justify-between flex'>
				<p className='text-gray-500 text-xs'>
					Crafted by{' '}
					<a
						href='https://twitter.com/andre0x0'
						className='hover:underline transition'
					>
						🐝 Andre
					</a>{' '}
					and{' '}
					<a
						href='https://twitter.com/alex_enax'
						className='hover:underline transition'
					>
						🦄 Alex
					</a>
					.
				</p>
				<div className='flex items-center gap-x-6 text-gray-400'>
					<span className='text-gray-500 text-xs'>Built with</span>
					<div className='flex gap-2'>
						<a
							className='border border-zinc-200 bg-white rounded-md px-2 py-2 tracking-tight flex gap-1 hover:scale-105 transition'
							href='https://v0.dev/'
							target='_blank'
							rel='noreferrer'
						>
							<V0Logo width={25} />
						</a>
						<a
							className='border border-zinc-200 bg-white rounded-md px-2 py-2 tracking-tight flex gap-1 hover:scale-105 transition'
							href='https://www.edgedb.com/'
							target='_blank'
							rel='noreferrer'
						>
							<EdgeDbLogo width={45} />
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;
