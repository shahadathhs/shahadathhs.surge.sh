import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 bg-background text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Page not found.</p>
      <Link
        href="/"
        className="text-xs font-bold uppercase tracking-widest hover:underline decoration-border underline-offset-4"
      >
        Return Home
      </Link>
    </div>
  );
}
