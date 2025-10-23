import type { ProjectWithGetImage } from '@/types/project';

type ProjectCardProps = Pick<
  ProjectWithGetImage,
  'title' | 'description' | 'image' | 'id'
>;

function ProjectCard({ title, description, image, id }: ProjectCardProps) {
  return (
    <a className="group flex flex-col outline-none" href={`/projects/${id}`}>
      <div className="relative aspect-video overflow-hidden rounded-xl outline-2 outline-offset-2 outline-blue-500 after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-inset after:ring-white/20 group-hover:outline group-focus-visible:outline">
        <img src={image.src} alt={description} {...image.attributes} />
      </div>
      <footer className="py-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="truncate text-base font-medium text-white/60">
          {description}
        </p>
      </footer>
    </a>
  );
}

export default ProjectCard;
