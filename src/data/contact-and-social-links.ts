import { env } from '@/config/env';

type ContactAndSocialLink = {
  url: string;
  text: string;
  title: string;
  icon: string;
};

const contactAndSocialLinks: ContactAndSocialLink[] = [
  {
    title: 'Email',
    url: `mailto:${env.EMAIL_ADDRESS}`,
    text: env.EMAIL_ADDRESS,
    icon: 'heroicons:envelope',
  },
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/ozgurgokdemir',
    text: 'linkedin.com/in/ozgurgokdemir',
    icon: 'fa6-brands:linkedin-in',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ozgurgokdemir',
    text: 'github.com/ozgurgokdemir',
    icon: 'simple-icons:github',
  },
  {
    title: 'CodePen',
    url: 'https://codepen.io/ozgurgokdemir',
    text: 'codepen.io/ozgurgokdemir',
    icon: 'fa6-brands:codepen',
  },
];

export default contactAndSocialLinks;
