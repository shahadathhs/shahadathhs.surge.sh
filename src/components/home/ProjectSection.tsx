'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  fetchGithubRepos,
  fetchMultipleRepos,
  GithubRepo,
} from '@/services/github-service';
import ProjectCard from '../card/ProjectCard';
import { motion } from 'motion/react';

import { BorderBeam } from '../magicui/border-beam';

import ProjectSkeleton from '../skeleton/ProjectSkeleton';

import { PINNED_REPOS } from '@/constant/projectConfig';

export default function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchMultipleRepos('shahadathhs', PINNED_REPOS);

      // If no pinned repos found (fallback), fetch latest
      if (data.length === 0) {
        const allRepos = await fetchGithubRepos('shahadathhs');
        setRepos(
          allRepos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 5),
        );
      } else {
        setRepos(data);
      }
      setLoading(false);
    };
    loadRepos();
  }, []);

  return (
    <div
      id="projects"
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col max-w-4xl mb-10 gap-4">
            <div>
              <h2 className="text-4xl mb-4 font-bold dark:text-white text-black">
                Open Source Projects
              </h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300  text-base max-w-2xl">
                A collection of my recent backend tools, infrastructure
                templates, and full-stack experiments.
              </p>
            </div>
          </div>

          <div className="flex flex-col max-w-7xl mx-auto border-t border-border/50">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))
              : repos.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      name={repo.name}
                      description={repo.description}
                      url={repo.html_url}
                      stars={repo.stargazers_count}
                      forks={repo.forks_count}
                      language={repo.language}
                    />
                  </motion.div>
                ))}
          </div>

          <div className="flex justify-center mt-16">
            <Button asChild variant="outline" className="font-bold">
              <Link
                href="https://github.com/shahadathhs?tab=repositories"
                target="_blank"
              >
                View All Repositories
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
