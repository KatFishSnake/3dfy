import { getEnv, ENV_KEY } from '@/utils/env';
import Replicate, { type Prediction } from 'replicate';
import type { TwoD3DControlNetRequest } from '../utils/types';

export class ReplicateClient {
	replicate: Replicate;

	constructor(apiKey: string) {
		this.replicate = new Replicate({
			auth: apiKey,
		});
	}

	generate3DModel = async (
		request: TwoD3DControlNetRequest,
	): Promise<Prediction> => {
		const callbackURL = `${process.env.WEBHOOK_URL}/api/webhook?token=${process.env.WEBHOOK_TOKEN}`;
		const input = {
			seed: 42,
			image_path: request.image_path,
			export_video: request.export_video,
			sample_steps: request.sample_steps,
			export_texmap: request.export_texmap,
			remove_background: request.remove_background,
		};

		const output = await this.replicate.predictions.create({
			version:
				'4f151757fd04d508b84f2192a17f58d11673971f05d9cb1fd8bd8149c6fc7cbb',
			input: input,
			webhook: callbackURL,
			webhook_events_filter: ['completed', 'start', 'output'],
		});

		if (!output) {
			throw new Error('Failed to generate QR code');
		}

		return output;
	};

	deleteGeneration = async (predictionId: string) => {
		try {
			const result = await this.replicate.predictions.cancel(predictionId);
			return result;
		} catch (error) {
			return { error: (error as Error).message };
		}
	};
}

const apiKey = getEnv(ENV_KEY.REPLICATE_API_KEY);
if (!apiKey) {
	throw new Error('REPLICATE_API_KEY is not set');
}
export const replicateClient = new ReplicateClient(apiKey);
