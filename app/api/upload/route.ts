import { NextResponse } from 'next/server';

import type { UploadFileResult } from 'uploadthing/types';
import { utapi } from '@/libs/Uploadthing';
import { nanoid } from '@/utils';

export const runtime = 'edge';

export async function POST(req: Request) {
	const file = await req.body;
	const contentType = req.headers.get('content-type') || 'text/plain';
	const filename = `${nanoid()}.${contentType.split('/')[1]}`;

	if (!file) {
		return NextResponse.error();
	}

	const blob = await streamToBlob(file, contentType);
	const response: UploadFileResult = await utapi.uploadFiles(
		new File([blob], filename),
	);

	return NextResponse.json({ url: response.data?.url });
}

async function streamToBlob(
	stream: ReadableStream<Uint8Array>,
	contentType: string,
): Promise<Blob> {
	const reader = stream.getReader();
	const data = [];

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		data.push(value);
	}

	return new Blob(data, { type: contentType });
}
