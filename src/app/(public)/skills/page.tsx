import SkillsSection from "@/components/home/SkillsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Portfolio",
  description: "Know about my skills",
};

export default function ProjectsPage() {
  return (
    <main className="my-10">
      <SkillsSection />
    </main>
  );
}
