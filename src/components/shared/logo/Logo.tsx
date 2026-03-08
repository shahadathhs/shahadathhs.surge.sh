import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="group relative flex items-center gap-2 font-bold text-lg tracking-tight transition-opacity duration-300 hover:opacity-80"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded bg-nav-accent/10 ring-1 ring-nav-accent/30 group-hover:ring-nav-accent/60 transition-all duration-300">
        <span className="text-nav-accent text-sm font-bold">S</span>
      </div>
      <span className="hidden sm:inline text-nav-foreground">shahadathhs</span>
    </Link>
  );
}
