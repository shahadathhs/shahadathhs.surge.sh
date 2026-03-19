'use client';

import { useEffect, useState } from 'react';
import { fetchMultipleRepos, GithubRepo } from '@/services/github-service';
import { PINNED_REPOS, repoCategories } from '@/constant/projectConfig';

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const response = await fetchMultipleRepos('shahadathhs', PINNED_REPOS);
        setRepos(response.data);
      } catch (error) {
        console.error('Error loading repos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  if (loading) {
    return (
      <div className="text-xs font-bold uppercase tracking-widest opacity-40 animate-pulse mb-16">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="space-y-12 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        Projects
      </h2>
      <div className="space-y-12">
        {Object.entries(repoCategories).map(([category, repoNames]) => {
          const categoryRepos = repos.filter((repo) =>
            repoNames.includes(repo.name),
          );

          if (categoryRepos.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                {category}
              </h3>
              <div className="space-y-6">
                {categoryRepos.map((repo) => (
                  <div key={repo.id} className="group">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-1"
                    >
                      <h4 className="font-bold hover:underline decoration-border underline-offset-4 decoration-2">
                        {repo.name}
                      </h4>
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
            </div>
          );
        })}
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
