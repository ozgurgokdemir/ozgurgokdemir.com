import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      color: z.string(),
      featured: z.boolean().default(false),
      sortOrder: z.number().optional(),
    }),
});

export const collections = { projects };
