import { atom } from 'nanostores';

export const currentCategory = atom<string | null>(null);
