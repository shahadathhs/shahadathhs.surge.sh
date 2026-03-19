'use client';

import { useEffect, useState } from 'react';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';

export default function Blogs() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchMediumPosts('shahadathhs');
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-xs font-bold uppercase tracking-widest opacity-40 animate-pulse mb-16">
        Loading blogs...
      </div>
    );
  }
  if (posts.length === 0) return null;

  return (
    <section className="space-y-8 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        Writing
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.link} className="group">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1"
            >
              <h3 className="font-bold hover:underline decoration-border underline-offset-4 decoration-2">
                {post.title}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
                {new Date(post.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </a>
          </div>
        ))}
      </div>
      <a
        href="https://medium.com/@shahadathhs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
      >
        Read More on Medium →
      </a>
    </section>
  );
}
