import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function serialize<T>(doc: T): T {
  // JSON.stringify will call .toJSON() on Dates and ObjectIds,
  // then JSON.parse will turn everything back into primitives.
  return JSON.parse(JSON.stringify(doc));
}
