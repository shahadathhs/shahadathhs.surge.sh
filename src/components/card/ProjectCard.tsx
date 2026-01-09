import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageSlider from "../shared/ImageSlider";

interface ProjectCardProps {
  id: string;
  title: string;
  shortDescription: string;
  images: string[];
  technologies: string[];
}

export default function ProjectCard({
  id,
  title,
  shortDescription,
  images,
  technologies,
}: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden pt-0">
      <div className="relative h-[250px]">
        <ImageSlider images={images} className="h-[250px]" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-muted text-xs rounded-md">
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="px-2 py-1 bg-muted text-xs rounded-md">
              +{technologies.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link href={`/projects/${id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
