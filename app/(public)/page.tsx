import AboutMeSection from "@/components/home/AboutMeSection";
import ContactSection from "@/components/home/ContactSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectSection from "@/components/home/ProjectSection";
import SkillsSection from "@/components/home/SkillsSection";
import FeaturedBlogsSection from "@/components/home/FeaturedBlogsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
      <ProjectSection />
      <FeaturedBlogsSection />
    </main>
  );
}
