'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 bg-background text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="text-xs font-bold uppercase tracking-widest hover:underline decoration-border underline-offset-4"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-widest hover:underline decoration-border underline-offset-4"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
