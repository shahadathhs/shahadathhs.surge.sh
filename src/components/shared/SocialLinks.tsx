import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="flex space-x-4 mt-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="https://www.linkedin.com/in/shahadathhs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="https://x.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Twitter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="https://web.facebook.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Facebook</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="https://github.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>GitHub</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
