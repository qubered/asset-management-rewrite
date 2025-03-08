import { Resend } from 'resend';
import { env } from "@/env"
import { ReactElement } from 'react';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail(from: string, to: string, subject: string, html?: string, react?: ReactElement) {
    const { data, error } = await resend.emails.send({
        from: from,
        to: to,
        subject: subject,
        react: react,
        html: html,
    })
    if (error) {
        return error
    }
}