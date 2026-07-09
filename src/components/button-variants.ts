import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex group relative items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--color-primary)_80%,white)] active:bg-primary disabled:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-muted/30',
        outline:
          'border shadow-xs hover:text-accent-foreground bg-accent/20 backdrop-blur-sm border-input hover:bg-accent/30 disabled:bg-muted/30',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 gap-1.5 px-3',
        lg: 'h-10 px-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);
