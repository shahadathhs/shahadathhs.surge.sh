import { heroData } from '@/constant/heroData';
import { socialLinks } from '@/constant/socialLinks';

export default function Hero() {
  return (
    <section className="space-y-4 mb-16">
      <h1 className="text-4xl font-bold">{heroData.secondLine}</h1>
      <p className="text-muted-foreground text-lg font-medium leading-relaxed">
        Backend Developer | Node.js & NestJS | Python & FastAPI | Microservices
        Architect
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors underline decoration-border underline-offset-4"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
}
