import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { env } from '@/config/env';

const resend = new Resend(env.RESEND_API_KEY);

export const server = {
  sendMessage: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
    }),
    handler: async ({ name, email, message }) => {
      const { error } = await resend.emails.send({
        from: `Özgür Gökdemir <${env.EMAIL_ADDRESS}>`,
        to: env.EMAIL_ADDRESS,
        subject: `Message from ${name}`,
        html: `Name:<br>${name}<hr>Email:<br>${email}<hr>Message:<br>${message}`,
      });
      if (error) {
        const errorMessage = 'Message could not be sent.';
        console.error(errorMessage, error);
        throw new Error(errorMessage);
      }
    },
  }),
};
