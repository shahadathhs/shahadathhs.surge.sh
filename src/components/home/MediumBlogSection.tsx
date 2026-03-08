'use client';

import { useEffect, useState } from 'react';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';
import { Button } from '../ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

import { BorderBeam } from '../magicui/border-beam';

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
    <div
      id="blogs"
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col max-w-4xl mb-10">
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">
              Latest Blogs
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300  text-base max-w-2xl">
              Insights on backend architecture, API design, and modern web
              development.
            </p>
          </div>

          <div className="flex flex-col max-w-7xl mx-auto border-t border-border/50">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <BlogSkeleton key={i} />
                ))
              : posts.map((post, idx) => (
                  <motion.div
                    key={post.link}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/50 hover:bg-muted/30 transition-all px-4 -mx-4 rounded-lg"
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-1">
                          <span className="flex items-center gap-1.5 uppercase tracking-wider">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.pubDate).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              },
                            )}
                          </span>
                          <div className="flex gap-2">
                            {post.categories.slice(0, 2).map((category) => (
                              <span
                                key={category}
                                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-tighter"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-2 text-sm md:text-base leading-relaxed italic max-w-3xl">
                          {post.contentSnippet ||
                            'Read the full deep dive on Medium for more technical insights...'}
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-8 flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Read Story
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </a>
                  </motion.div>
                ))}
          </div>

          {!loading && (
            <div className="flex justify-center mt-16">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 font-bold"
              >
                <a
                  href="https://medium.com/@shahadathhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Explore all on Medium
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
