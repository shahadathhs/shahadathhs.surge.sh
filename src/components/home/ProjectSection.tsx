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

const PINNED_REPOS = [
  'barisathi',
  'bike-shop',
  'generate-password',
  'turborepo-starter',
];

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground font-medium">
          Fetching projects from GitHub...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full mt-10 border rounded overflow-clip">
      <section
        id="projects"
        className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl mb-4 font-bold text-black dark:text-white max-w-4xl">
                Open Source Projects
              </h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-base max-w-2xl">
                A collection of my recent backend tools, infrastructure
                templates, and full-stack experiments.
              </p>
            </div>

            <Button asChild variant="outline" className="font-bold">
              <Link
                href="https://github.com/shahadathhs?tab=repositories"
                target="_blank"
              >
                View All Repositories
              </Link>
            </Button>
          </div>

          <div className="flex flex-col max-w-7xl mx-auto border-t border-border/50">
            {repos.map((repo, idx) => (
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
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
