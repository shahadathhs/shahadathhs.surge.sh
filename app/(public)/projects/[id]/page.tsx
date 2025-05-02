"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/constant/projectData";
import ImageSlider from "@/components/shared/ImageSlider";

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <main className="my-10">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {project.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ImageSlider images={project.images} className="mb-8" />

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Project Overview</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Core Features</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.coreFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Challenges Faced</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.challengesFaced.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Future Plans</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.futurePlans.map((plan, index) => (
                  <li key={index}>{plan}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Core Technologies</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.coreTechnology.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-background text-sm rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Technology Versions</h3>
                <div className="mt-2 space-y-2">
                  {Object.entries(project.versionInfo).map(
                    ([tech, version]) => (
                      <div key={tech} className="flex justify-between">
                        <span className="text-muted-foreground">{tech}</span>
                        <span className="font-mono text-sm">{version}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
