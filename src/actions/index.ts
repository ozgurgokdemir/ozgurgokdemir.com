import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { env } from 'cloudflare:workers';
import { Resend } from 'resend';

export const server = {
  sendMessage: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.email(),
      message: z.string(),
    }),
    handler: async ({ name, email, message }) => {
      const resend = new Resend(env.RESEND_API_KEY);

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
