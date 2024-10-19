import { z } from 'astro:schema';

const envSchema = z.object({
  RESEND_API_KEY: z.string(),
  EMAIL_ADDRESS: z.string().email(),
});

export const env = envSchema.parse(import.meta.env);
