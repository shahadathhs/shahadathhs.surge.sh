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
import { AlertCircle, Github } from 'lucide-react';
import ProjectSkeleton from '../skeleton/ProjectSkeleton';
import { PINNED_REPOS } from '@/constant/projectConfig';

export default function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const loadRepos = async () => {
      const response = await fetchMultipleRepos('shahadathhs', PINNED_REPOS);

      if (response.isRateLimited) {
        setIsRateLimited(true);
      }

      if (response.data.length === 0 && response.isRateLimited) {
        const fallbackRepos: GithubRepo[] = PINNED_REPOS.map((name, index) => ({
          id: index,
          name,
          description:
            'API rate limit exceeded. View repository directly on GitHub.',
          html_url: `https://github.com/shahadathhs/${name}`,
          stargazers_count: 0,
          forks_count: 0,
          language: '',
          updated_at: new Date().toISOString(),
          fork: false,
        }));
        setRepos(fallbackRepos);
      } else if (response.data.length === 0 && !response.isRateLimited) {
        const fallbackResponse = await fetchGithubRepos('shahadathhs');
        setRepos(
          fallbackResponse.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 5),
        );
        setIsRateLimited(!!fallbackResponse.isRateLimited);
      } else {
        setRepos(response.data);
      }
      setLoading(false);
    };
    loadRepos();
  }, []);

  return (
    <section
      id="projects"
      className="py-24 max-w-6xl mx-auto scroll-mt-24 px-4 md:px-0"
    >
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Open Source
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              A curated selection of backend tools, infrastructure templates,
              and full-stack experiments.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full px-6 glass">
            <Link
              href="https://github.com/shahadathhs"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Follow on GitHub
            </Link>
          </Button>
        </div>

        {isRateLimited && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl glass border-amber-500/20 bg-amber-500/5 flex items-center gap-4"
          >
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-500/80 font-medium">
              GitHub API rate limit reached. Displaying cached data.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            : repos.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
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

        <div className="flex justify-center">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link
              href="https://github.com/shahadathhs?tab=repositories"
              target="_blank"
            >
              View All Repositories →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
