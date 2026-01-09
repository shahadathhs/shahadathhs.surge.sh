import { BlogForm } from '@/components/blog/blog-form';
import { getBlogById } from '@/lib/blog-service';
import { Blog } from '@/lib/models';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = (await getBlogById(id)) as unknown as Blog & { _id: string };

  if (!blog) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog</h1>
        <p className="text-muted-foreground">Make changes to your blog post</p>
      </div>
      <BlogForm blog={blog} />
    </div>
  );
}
