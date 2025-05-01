import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <h2 className="text-2xl font-bold">Loading...</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Please wait while I prepare my portfolio content for you.
        </p>
      </div>
    </div>
  );
}
