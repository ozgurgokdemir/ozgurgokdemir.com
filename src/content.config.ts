import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/projects' }),
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

const technologies = defineCollection({
  loader: file('src/data/technologies.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    category: z.string(),
    icon: z.string(),
  }),
});

const navigation = defineCollection({
  loader: file('src/data/navigation.json'),
  schema: z.object({
    id: z.string(),
    pathname: z.string(),
    text: z.string(),
  }),
});

const contact = defineCollection({
  loader: file('src/data/contact.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    text: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  projects,
  technologies,
  navigation,
  contact,
};
