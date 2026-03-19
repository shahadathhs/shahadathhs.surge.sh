import { aboutMeBio } from '@/constant/aboutMe';

export default function About() {
  return (
    <section className="space-y-4 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        About
      </h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {aboutMeBio.trim()}
        </p>
      </div>
    </section>
  );
}
