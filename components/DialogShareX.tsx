'use client';

import { Twitter, Share } from 'lucide-react';

import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { CopyInput } from './CopyInput';

const popupCenter = ({
	url,
	title,
	w,
	h,
}: { url: string; title: string; w: number; h: number }) => {
	const dualScreenLeft =
		window.screenLeft !== undefined ? window.screenLeft : window.screenX;
	const dualScreenTop =
		window.screenTop !== undefined ? window.screenTop : window.screenY;

	const width = window.innerWidth
		? window.innerWidth
		: document.documentElement.clientWidth
			? document.documentElement.clientWidth
			: screen.width;
	const height = window.innerHeight
		? window.innerHeight
		: document.documentElement.clientHeight
			? document.documentElement.clientHeight
			: screen.height;

	const systemZoom = width / window.screen.availWidth;
	const left = (width - w) / 2 / systemZoom + dualScreenLeft;
	const top = (height - h) / 2 / systemZoom + dualScreenTop;
	const newWindow = window.open(
		url,
		title,
		`
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `,
	);

	return newWindow;
};

export function DialogShareX(props: { url: string }) {
	const handleOnShare = () => {
		const popup = popupCenter({
			url: `https://twitter.com/intent/tweet?text=Check Image generated by ThreeFire ${props.url} @andre0x0 @alex_enax`,
			title: 'Share',
			w: 800,
			h: 400,
		});

		popup?.focus();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Share size={18} className='text-[#878787] -mt-[1px] cursor-pointer' />
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<div className='p-6'>
					<DialogHeader>
						<DialogTitle>Share</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						Thanks for sharing our pitch deck.
					</DialogDescription>

					<div className='grid gap-6 py-4'>
						<CopyInput value={props.url} />
						<Button
							className='flex items-center w-full h-10 space-x-2'
							onClick={handleOnShare}
						>
							<span>Share on</span>
							<Twitter />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
