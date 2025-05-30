import { BorderBeam } from "@/components/magicui/border-beam";
import Terminal from "@/components/terminal/Terminal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TerminalPage() {
  return (
    <div className="my-10 py-10 px-4 md:px-16 border rounded relative overflow-clip">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="flex justify-center">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center mb-2">
            Now about me via commands
          </h1>
          <p className="text-center text-muted-foreground">
            Type commands like <code>skills</code>, <code>projects</code>, or{" "}
            <code>contact</code> to explore my portfolio interactively.
          </p>
        </div>

        <div className="border rounded shadow  relative h-[400px] overflow-x-clip">
          {/* terminal div */}
          <Terminal />
          <BorderBeam duration={40} size={300} />
        </div>
      </div>

      {/* border beam */}
      <BorderBeam duration={40} size={300} />
    </div>
  );
}
