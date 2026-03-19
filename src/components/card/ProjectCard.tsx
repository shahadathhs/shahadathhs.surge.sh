import { Star, GitFork, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

export default function ProjectCard({
  name,
  description,
  url,
  stars,
  forks,
  language,
}: ProjectCardProps) {
  return (
    <div className="group relative glass border-foreground/5 p-8 rounded-[2rem] hover:border-foreground/10 transition-all duration-500 h-full flex flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full space-y-6"
      >
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors duration-500 leading-none">
              {name}
            </h3>
            <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full border border-foreground/5 group-hover:bg-foreground group-hover:text-background transition-all duration-500">
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>

          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {description || 'No description provided.'}
          </p>
        </div>

        <div className="pt-6 border-t border-foreground/5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground/60 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" />
              {stars}
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork className="h-3.5 w-3.5" />
              {forks}
            </span>
          </div>
          {language && (
            <span className="px-3 py-1 bg-foreground/5 text-foreground/60 rounded-full text-[10px] font-bold uppercase tracking-widest border border-foreground/5">
              {language}
            </span>
          )}
        </div>
      </a>
    </div>
  );
}
