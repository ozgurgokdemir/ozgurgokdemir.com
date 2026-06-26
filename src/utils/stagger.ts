export type StaggerIndexConfig = Record<number, number> & {
  default: number;
};

// `default` is mobile-first; numeric keys are min-width breakpoints in pixels.
export function stagger(config: StaggerIndexConfig) {
  return JSON.stringify(config);
}
