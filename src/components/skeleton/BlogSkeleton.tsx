import { Skeleton } from '@/components/ui/skeleton';

export default function BlogSkeleton() {
  return (
    <div className="glass border-foreground/5 p-8 rounded-[2rem] space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4 mb-1">
            <Skeleton className="h-4 w-24 opacity-20" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-12 rounded-full opacity-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-3/4 opacity-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full opacity-20" />
            <Skeleton className="h-4 w-2/3 opacity-20" />
          </div>
        </div>
        <Skeleton className="h-12 w-12 rounded-full opacity-10" />
      </div>
    </div>
  );
}
