import { cn } from "@/lib/utils";
import {
  IconDatabase,
  IconLanguage,
  IconPackage,
  IconSchool,
  IconServer,
  IconTerminal2,
  IconTestPipe,
  IconTools,
} from "@tabler/icons-react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { words } from "@/constant/skillsData";
import { Badge } from "../ui/badge";

export default function SkillsSection() {
  // 1) change description to string[]
  const skills: Array<{
    title: string;
    description: string[];
  }> = [
    { title: "Languages", description: ["JavaScript", "TypeScript"] },
    { title: "Backend", description: ["Node.js", "Express"] },
    { title: "Databases", description: ["MongoDB", "Mongoose"] },
    { title: "Testing", description: ["Jest", "Supertest"] },
    { title: "Tools", description: ["Git", "VS Code", "Postman"] },
    { title: "Monorepo Tools", description: ["Turborepo", "Nx"] },
    { title: "Currently Learning", description: ["PostgreSQL", "Prisma"] },
    { title: "Package Manager", description: ["npm", "pnpm"] },
  ];

  // 2) map titles to icons in one place
  const iconMap: Record<string, React.ReactNode> = {
    Languages: <IconLanguage className="h-8 w-8" />,
    Backend: <IconServer className="h-8 w-8" />,
    Databases: <IconDatabase className="h-8 w-8" />,
    Testing: <IconTestPipe className="h-8 w-8" />,
    Tools: <IconTools className="h-8 w-8" />,
    "Monorepo Tools": <IconTerminal2 className="h-8 w-8" />,
    "Currently Learning": <IconSchool className="h-8 w-8" />,
    "Package Manager": <IconPackage className="h-8 w-8" />,
  };

  return (
    <div className="my-10">
      <div className="flex flex-col items-center text-xl justify-center">
        <TypewriterEffectSmooth words={words} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 max-w-7xl mx-auto relative z-10">
        {skills.map((skill, idx) => (
          <Skill
            key={skill.title}
            title={skill.title}
            icon={iconMap[skill.title]}
            description={skill.description}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

type SkillProps = {
  title: string;
  description: string[];
  icon: React.ReactNode;
  index: number;
};

const Skill = ({ title, description, icon, index }: SkillProps) => (
  <div
    className={cn(
      "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
      (index === 0 || index === 4) && "lg:border-l",
      index < 4 && "lg:border-b"
    )}
  >
    {/* hover overlay */}
    <div
      className={cn(
        "absolute inset-0 h-full w-full transition duration-200 pointer-events-none",
        index < 4
          ? "bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100"
          : "bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100"
      )}
    />

    {/* icon */}
    <div className="mb-4 px-10 text-neutral-600 dark:text-neutral-400 relative z-10">
      {icon}
    </div>

    {/* title */}
    <div className="relative z-10 mb-2 px-10 text-lg font-bold">
      <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 transition-all duration-200 origin-center group-hover/feature:h-8 group-hover/feature:bg-blue-500" />
      <span className="inline-block transition-transform duration-200 group-hover/feature:translate-x-2 text-neutral-800 dark:text-neutral-100">
        {title}
      </span>
    </div>

    {/* render each description item as a badge */}
    <div className="flex flex-wrap gap-2 px-10 relative z-10">
      {description.map((tech) => (
        <Badge key={tech} variant={"outline"}>
          {tech}
        </Badge>
      ))}
    </div>
  </div>
);
