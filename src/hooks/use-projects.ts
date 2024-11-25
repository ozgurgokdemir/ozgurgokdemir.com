import { useStore } from '@nanostores/react';
import { currentCategory } from '@/stores/projects-store';

function useProjects() {
  return {
    currentCategory: useStore(currentCategory),
    setCurrentCategory: currentCategory.set,
  };
}

export default useProjects;
