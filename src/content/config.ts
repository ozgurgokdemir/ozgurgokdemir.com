import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      color: z.string(),
      category: z.string(),
      featured: z.boolean().default(false),
      livePreview: z.string().url().optional(),
      sourceCode: z.string().url().optional(),
      order: z.number().optional(),
    }),
});

const navigationCollection = defineCollection({
  type: 'data',
  schema: z.object({
    pathname: z.string(),
    text: z.string(),
    order: z.number().default(0),
  }),
});

const socialCollection = defineCollection({
  type: 'data',
  schema: z.object({
    url: z.string().url(),
    text: z.string(),
    icon: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
  navigation: navigationCollection,
  social: socialCollection,
};
