import type { ImageMetadata, GetImageResult } from 'astro';

export type Project = {
  title: string;
  description: string;
  image: ImageMetadata;
  color: string;
  category: string;
  slug: string;
  featured: boolean;
  livePreview?: string;
  sourceCode?: string;
  order?: number;
};

export type ProjectWithGetImage = Omit<Project, 'image'> & {
  image: GetImageResult;
};
