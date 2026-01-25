import { Github, Star, GitFork, ExternalLink } from 'lucide-react';

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
    <div className="group border-b border-border/50 hover:bg-muted/30 transition-all px-4 -mx-4 rounded-lg">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col md:flex-row md:items-center justify-between py-8 gap-6"
      >
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
            {language && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-tighter">
                {language}
              </span>
            )}
          </div>

          <p className="text-muted-foreground line-clamp-2 text-sm md:text-base leading-relaxed italic max-w-3xl">
            {description ||
              'Explore the source code on GitHub for more details...'}
          </p>

          <div className="flex items-center gap-6 text-muted-foreground text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" />
              {stars}
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork className="h-3.5 w-3.5" />
              {forks}
            </span>
          </div>
        </div>

        <div className="flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
          View Repository
          <ExternalLink className="ml-2 h-4 w-4" />
        </div>
      </a>
    </div>
  );
}
