import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFeaturedBlogs } from '@/lib/blog-service';
import { nanoid } from 'nanoid';

export default async function FeaturedBlogsSection() {
  const blogs = await getFeaturedBlogs();

  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Blogs</h2>
          <p className="text-muted-foreground mt-2">
            Explore latest blog posts and insights
          </p>
        </div>

        <div className="hidden md:flex">
          <Button asChild>
            <Link href="/blogs">View All Blogs</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card key={nanoid()} className="flex flex-col overflow-hidden pt-0">
              <div className="relative h-48 w-full">
                <Image
                  src={
                    blog.thumbnailUrl || '/placeholder.svg?height=200&width=400'
                  }
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                    {blog.category}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 pt-2">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  {blog.excerpt}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/blogs/${blog.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        )}
      </div>

      <div className="flex md:hidden mt-8 w-full justify-center">
        <Button asChild>
          <Link href="/blogs">View All Blogs</Link>
        </Button>
      </div>
    </div>
  );
}
