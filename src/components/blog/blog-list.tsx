import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllBlogs } from "@/lib/blog-service";
import { nanoid } from "nanoid";

export async function BlogList({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const blogs = await getAllBlogs(query, category);

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No blog posts found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={nanoid()} className="flex flex-col overflow-hidden pt-0">
          <div className="relative h-48 w-full">
            <Image
              src={blog.thumbnailUrl || "/placeholder.svg?height=200&width=400"}
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
            <CardTitle className="line-clamp-2 pt-2">{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{blog.excerpt}</p>
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
      ))}
    </div>
  );
}
