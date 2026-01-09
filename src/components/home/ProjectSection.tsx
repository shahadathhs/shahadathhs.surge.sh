import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { projects } from '@/constant/projectData';
import ProjectCard from '../card/ProjectCard';

export default function ProjectSection() {
  // Only show the first two projects on the home page
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mt-2">
              Check out some of my recent work
            </p>
          </div>

          <div className="hidden md:flex">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
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

        <div className="flex md:hidden mt-8 w-full justify-center">
          <Button asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
