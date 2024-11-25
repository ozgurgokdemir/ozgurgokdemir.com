import type { ComponentProps } from 'react';

type TagProps = ComponentProps<'button'> & {
  current?: boolean;
};

function Tag({
  current = false,
  type = 'button',
  children,
  ...props
}: TagProps) {
  return (
    <button
      type={type}
      className={`group text-base font-semibold outline-2 outline-offset-2 outline-blue-500 transition-colors focus-visible:outline ${current ? 'flex h-10 items-center gap-2 rounded-full bg-white/10 pl-3 pr-4 text-white hover:bg-white/15' : 'text-white/60 hover:text-white'}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Tag;
