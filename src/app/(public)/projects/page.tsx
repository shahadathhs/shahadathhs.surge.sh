import ProjectCard from '@/components/card/ProjectCard';
import { projects } from '@/constant/projectData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Browse all my projects and see my work',
};

export default function ProjectsPage() {
  return (
    <main className="my-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
        <p className="text-muted-foreground mt-2">
          Browse through all my projects and see my work
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            shortDescription={project.shortDescription}
            images={project.images}
            technologies={project.coreTechnology}
          />
        ))}
      </div>
    </main>
  );
}
