import { z } from 'astro/zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string(),
  EMAIL_ADDRESS: z.email(),
});

export const env = envSchema.parse(import.meta.env);
