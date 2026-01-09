'use client';

import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
};

export function useBlogs() {
  const { data, error, isLoading, mutate } = useSWR('/api/blogs', fetcher);

  return {
    blogs: data,
    isLoading,
    isError: error,
    mutate,
  };
}
