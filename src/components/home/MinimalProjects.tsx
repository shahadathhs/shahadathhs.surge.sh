'use client';

import { useEffect, useState } from 'react';
import { fetchMultipleRepos, GithubRepo } from '@/services/github-service';
import { PINNED_REPOS } from '@/constant/projectConfig';

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const response = await fetchMultipleRepos('shahadathhs', PINNED_REPOS);
      setRepos(response.data);
      setLoading(false);
    };
    loadRepos();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <section className="space-y-8 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        Projects
      </h2>
      <div className="space-y-6">
        {repos.map((repo) => (
          <div key={repo.id} className="group">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1"
            >
              <h3 className="font-bold hover:underline decoration-border underline-offset-4 decoration-2">
                {repo.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {repo.description}
              </p>
              {repo.language && (
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">
                  {repo.language}
                </span>
              )}
            </a>
          </div>
        ))}
      </div>
      <a
        href="https://github.com/shahadathhs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
      >
        Explore All Projects →
      </a>
    </section>
  );
}
