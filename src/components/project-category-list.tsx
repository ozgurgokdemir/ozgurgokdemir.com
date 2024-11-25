import { type ComponentProps, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import useProjects from '@/hooks/use-projects';
import Tag from '@/components/tag';

type ProjectCategoryListProps = ComponentProps<'ul'> & {
  categories: string[];
};

function ProjectCategoryList({
  categories,
  children,
}: ProjectCategoryListProps) {
  const { currentCategory, setCurrentCategory } = useProjects();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryQuery = searchParams.get('category');
    const currentCategory = categories.find(
      (category) => category.toLowerCase() === categoryQuery,
    );
    setCurrentCategory(currentCategory ?? null);
  }, []);

  function handleCategoryChange(category: string) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('category', category.toLowerCase());
    history.replaceState({}, '', `?${searchParams.toString()}`);
    setCurrentCategory(category);
  }

  function handleClearCategory() {
    const url = new URL(location.href);
    url.search = '';
    history.replaceState({}, '', url.toString());
    setCurrentCategory(null);
  }

  const otherCategories = categories.filter(
    (category) => category !== currentCategory,
  );

  const variants = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      opacity: 1,
      transform: 'scale(1)',
    },
  };

  return (
    <ul className="flex h-[--header-height] items-center gap-8 overflow-x-auto whitespace-nowrap px-4 [scrollbar-width:none] md:px-0 [&::-webkit-scrollbar]:hidden">
      <AnimatePresence mode="popLayout">
        {currentCategory && (
          <motion.li
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Tag current={true} onClick={handleClearCategory}>
              {children}
              {currentCategory}
            </Tag>
          </motion.li>
        )}
        {otherCategories.map((category) => (
          <motion.li
            key={category}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Tag onClick={() => handleCategoryChange(category)}>{category}</Tag>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default ProjectCategoryList;
