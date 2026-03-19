'use client';

import { useEffect, useState } from 'react';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';
import { Button } from '../ui/button';
import { Calendar, ExternalLink, PenTool } from 'lucide-react';
import { motion } from 'motion/react';
import BlogSkeleton from '../skeleton/BlogSkeleton';

export default function MediumBlogSection() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchMediumPosts('shahadathhs');
      setPosts(data.slice(0, 3));
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (posts.length === 0 && !loading) {
    return null;
  }

  return (
    <section
      id="blogs"
      className="py-24 max-w-6xl mx-auto scroll-mt-24 px-4 md:px-0"
    >
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Writing & Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Deep dives into backend architecture, system design, and the
              evolving AI landscape.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full px-6 glass">
            <a
              href="https://medium.com/@shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              Follow on Medium
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-0">
                  <BlogSkeleton />
                </div>
              ))
            : posts.map((post, idx) => (
                <motion.div
                  key={post.link}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group glass border-foreground/5 p-8 rounded-[2rem] hover:border-foreground/10 transition-all duration-500"
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 group/link"
                  >
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.pubDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <div className="flex gap-2">
                          {post.categories.slice(0, 1).map((category) => (
                            <span
                              key={category}
                              className="px-2 py-0.5 bg-foreground/5 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover/link:text-accent transition-colors duration-500">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2 text-sm md:text-lg leading-relaxed max-w-4xl">
                        {post.contentSnippet ||
                          'Read the full article on Medium.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border border-foreground/5 group-hover/link:bg-foreground group-hover/link:text-background transition-all duration-500 group-hover/link:scale-110">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>
                </motion.div>
              ))}
        </div>

        {!loading && (
          <div className="flex justify-center">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <a
                href="https://medium.com/@shahadathhs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore All on Medium →
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
