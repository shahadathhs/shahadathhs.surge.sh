'use client';

import ImageSlider from '@/components/shared/ImageSlider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/constant/projectData';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <main className="container">
      <div className="w-full max-w-4xl mx-auto md:border-l md:border-r py-10">
        <div className="flex justify-center">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
        <div className="text-center max-w-3xl mx-auto md:px-4">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {project.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 max-w-3xl mx-auto md:px-4 pt-5">
          <ImageSlider images={project.images} />

          <div className="space-y-5">
            <div className="gap-3 grid grid-cols-2">
              {project?.liveLink && (
                <Button asChild className="w-full" variant="outline">
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}

              <Button asChild className="w-full" variant="outline">
                <Link
                  href={project.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Source Code
                </Link>
              </Button>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">Project Overview</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">Core Features</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.coreFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">Challenges Faced</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.challengesFaced.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">Core Technologies</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.coreTechnology.map((tech, index) => (
                  <Badge key={index}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
