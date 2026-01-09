import { Suspense } from "react";
import { BlogList } from "@/components/blog/blog-list";
// import { BlogSearch } from "@/components/blog-search";
// import { CategoryFilter } from "@/components/category-filter";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "All Blogs",
  description: "Browse all our blog posts",
};

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ query: string; category: string }>;
}) {
  const { query, category } = await params;

  return (
    <main className="py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">All Blog Posts</h1>
          <p className="text-muted-foreground">
            Browse through our collection of blog posts
          </p>
        </div>
        {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <BlogSearch />
          <CategoryFilter />
        </div> */}
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
            </div>
          }
        >
          <BlogList query={query} category={category} />
        </Suspense>
      </div>
    </main>
  );
}
