import { cn } from '@/utils';

export const WireGray = ({ className }: { className?: string }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width='500px'
		viewBox='0 0 515 329'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('absolute', className)}
	>
		<path d='M0.5 1C270 1 279 130 515 130' stroke='#fff3e5' strokeWidth={2} />
		<path
			d='M515 202C269 202 268 328 0.5 328'
			stroke='#fff3e5'
			strokeWidth={2}
		/>
		<path
			d='M0.5 261C270 261 279 184 515 184'
			stroke='#fff3e5'
			strokeWidth={2}
		/>
		<path
			d='M0.5 160C150.5 160 337 166 517 166'
			stroke='#fff3e5'
			strokeWidth={2}
		/>
		<path d='M515 148C269 148 268 68 0.5 68' stroke='#fff3e5' strokeWidth={2} />
	</svg>
);

export const WireColor = ({ className }: { className?: string }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width='500px'
		viewBox='0 0 515 329'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('absolute', className)}
	>
		<defs>
			<linearGradient id='gradient'>
				<stop offset='0' stopColor='white' stopOpacity='0' />
				<stop offset='0.8' stopColor='white' stopOpacity='1' />
				<stop offset='0.8' stopColor='white' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='warm-gradient' gradientTransform='rotate(90)'>
				<stop offset='0%' stopColor='#f56565' />
				<stop offset='100%' stopColor='#ecc94b' />
			</linearGradient>
			<mask id='gradient-mask'>
				<rect
					className='mask-rect'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask1'>
				<rect
					className='mask-rect1'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask2'>
				<rect
					className='mask-rect2'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask3'>
				<rect
					className='mask-rect3'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
		</defs>

		<path
			d='M0.5 1C270 1 279 130 515 130'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask2)'
			strokeWidth={2}
		/>
		<path
			d='M515 148C269 148 268 68 0.5 68'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask3)'
			strokeWidth={2}
		/>
		<path
			d='M0.5 160C150.5 160 337 166 517 166'
			stroke='#f56565'
			mask='url(#gradient-mask2)'
			strokeWidth={2}
		/>
		<path
			d='M0.5 261C270 261 279 184 515 184'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask1)'
			strokeWidth={2}
		/>
		<path
			d='M515 202C269 202 268 328 0.5 328'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask3)'
			strokeWidth={2}
		/>
	</svg>
);

export const WireColorAlt = ({ className }: { className?: string }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width='500px'
		viewBox='0 0 515 329'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('absolute', className)}
	>
		<defs>
			<linearGradient id='gradient'>
				<stop offset='0' stopColor='white' stopOpacity='0' />
				<stop offset='0.8' stopColor='white' stopOpacity='1' />
				<stop offset='0.8' stopColor='white' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='warm-gradient' gradientTransform='rotate(90)'>
				<stop offset='0%' stopColor='#f56565' />
				<stop offset='100%' stopColor='#ecc94b' />
			</linearGradient>
			<mask id='gradient-mask'>
				<rect
					className='mask-rect'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask1'>
				<rect
					className='mask-rect1'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask2'>
				<rect
					className='mask-rect2'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask3'>
				<rect
					className='mask-rect3'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
		</defs>

		<path
			d='M0.5 1C270 1 279 130 515 130'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask3)'
			strokeWidth={2}
		/>
		<path
			d='M515 148C269 148 268 68 0.5 68'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask2)'
			strokeWidth={2}
		/>
		<path
			d='M0.5 160C150.5 160 337 166 517 166'
			stroke='#f56565'
			mask='url(#gradient-mask)'
			strokeWidth={2}
		/>
		<path
			d='M0.5 261C270 261 279 184 515 184'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask3)'
			strokeWidth={2}
		/>
		<path
			d='M515 202C269 202 268 328 0.5 328'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask)'
			strokeWidth={2}
		/>
	</svg>
);

export const WireColorAltAlt = ({ className }: { className?: string }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width='500px'
		viewBox='0 0 515 329'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('absolute', className)}
	>
		<defs>
			<linearGradient id='gradient'>
				<stop offset='0' stopColor='white' stopOpacity='0' />
				<stop offset='0.8' stopColor='white' stopOpacity='1' />
				<stop offset='0.8' stopColor='white' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='warm-gradient' gradientTransform='rotate(90)'>
				<stop offset='0%' stopColor='#f56565' />
				<stop offset='100%' stopColor='#ecc94b' />
			</linearGradient>
			<mask id='gradient-mask3'>
				<rect
					className='mask-rect3'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
			<mask id='gradient-mask4'>
				<rect
					className='mask-rect4'
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gradient)'
				/>
			</mask>
		</defs>

		<path
			d='M0.5 1C270 1 279 130 515 130'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask4)'
			strokeWidth={2}
		/>
		<path
			d='M515 148C269 148 268 68 0.5 68'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask3)'
			strokeWidth={2}
		/>
		<path
			d='M0.5 160C150.5 160 337 166 517 166'
			stroke='#f56565'
			mask='url(#gradient-mask4)'
			strokeWidth={2}
		/>
		<path
			d='M0.5 261C270 261 279 184 515 184'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask2)'
			strokeWidth={2}
		/>
		<path
			d='M515 202C269 202 268 328 0.5 328'
			stroke='url(#warm-gradient)'
			mask='url(#gradient-mask4)'
			strokeWidth={2}
		/>
	</svg>
);
