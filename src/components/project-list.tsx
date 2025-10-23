import type { ProjectWithGetImage } from '@/types/project';
import { AnimatePresence, motion } from 'motion/react';
import useProjects from '@/hooks/use-projects';
import ProjectCard from '@/components/project-card';

type ProjectListProps = {
  projects: ProjectWithGetImage[];
};

function ProjectList({ projects }: ProjectListProps) {
  const { currentCategory } = useProjects();

  const filteredProjects = projects.filter(
    (project) =>
      !currentCategory ||
      (currentCategory === 'Featured' && project.featured) ||
      project.category === currentCategory,
  );

  const variants = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: (index: number) => ({
      opacity: 1,
      transform: 'scale(1)',
      transition: {
        delay: index * 0.075,
      },
    }),
  };

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {filteredProjects.map(({ id, title, description, image }, index) => (
          <motion.li
            key={id}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={index}
          >
            <ProjectCard
              id={id}
              title={title}
              description={description}
              image={image}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default ProjectList;
