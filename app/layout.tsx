import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/sonner';
import { signout } from './actions';
import './globals.css';
import { auth } from '@/edgedb';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const title = '3Dfy - 2D to 3D Generator';
const description =
	'3Dfy elevates your visuals with our powerful image to model conversion';
const url = 'https://3dfy.tools';
const ogimage = 'https://3dfy.tools/og-image.png';
const sitename = '3dfy.tools';

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title,
	description,
	openGraph: {
		images: [ogimage],
		title,
		description,
		url: url,
		siteName: sitename,
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		images: [ogimage],
		title,
		description,
	},
};

const handleSignOut = async () => {
	'use server';

	await signout();
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.getSession();
	const signedIn = await session.isSignedIn();
	return (
		<html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<head>
				<PlausibleProvider domain='qrgpt.io' />
			</head>
			<body>
				<main className='flex flex-col h-screen'>
					{!signedIn ? (
						<header>
							<nav
								className={
									'w-full md:static md:text-sm flex justify-end custom-screen pt-2'
								}
							>
								<div className='items-center flex gap-2'>
									<Link
										href={auth.getBuiltinUIUrl()}
										prefetch={false}
										className='text-sm font-semibold leading-6 text-gray-800'
									>
										<Button size={'sm'} variant={'outline'}>
											Sign in
										</Button>
									</Link>
									<Link
										href={auth.getBuiltinUISignUpUrl()}
										prefetch={false}
										className='text-sm font-semibold leading-6 text-gray-900'
									>
										<Button size={'sm'} variant={'outline'}>
											Sign up
										</Button>
									</Link>
								</div>
							</nav>
						</header>
					) : (
						<Navbar onSignOut={handleSignOut} />
					)}

					{children}
					<Footer />
				</main>
				<Analytics />
				<Toaster />
			</body>
		</html>
	);
}
