import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Blog Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        The blog you are looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild className="mt-8">
        <Link href="/blogs">Back to BLogs</Link>
      </Button>
    </div>
  );
}
