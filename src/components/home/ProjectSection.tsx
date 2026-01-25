'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchGithubRepos, GithubRepo } from '@/services/github-service';
import ProjectCard from '../card/ProjectCard';
import { motion } from 'motion/react';

export default function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchGithubRepos('shahadathhs');
      // Sort by stars descending and take top 5
      setRepos(
        data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5),
      );
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Open Source Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A collection of my recent backend tools, infrastructure templates,
              and full-stack experiments.
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

        <div className="flex flex-col max-w-5xl mx-auto border-t border-border/50">
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
  );
}
