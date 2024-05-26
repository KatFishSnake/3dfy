import type { Resend as ResendType } from 'resend';
import { Resend } from 'resend';

let resend: ResendType | null = null;
export function getResendInstance(): ResendType {
	if (!resend) {
		resend = new Resend(process.env.RESEND_API_KEY);
	}
	return resend;
}
