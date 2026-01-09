import { Button } from '@/components/ui/button';
import { getBlogBySlug } from '@/lib/blog-service';
import { Blog } from '@/lib/models';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = (await getBlogBySlug(slug)) as unknown as Blog;

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found',
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = (await getBlogBySlug(slug)) as unknown as Blog;

  if (!blog) notFound();

  return (
    <main className="container">
      <div className="w-full max-w-4xl mx-auto md:border-l md:border-r py-10">
        <div className="flex justify-center">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blogs
            </Link>
          </Button>
        </div>

        <article className="prose prose-stone mx-auto dark:prose-invert lg:prose-lg">
          <div className="not-prose mb-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
                {blog.category}
              </span>
            </div>
          </div>

          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={blog.thumbnailUrl || '/placeholder.svg?height=400&width=800'}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-stone lg:prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </main>
  );
}
