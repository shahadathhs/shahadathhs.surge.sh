import AboutMeSection from '@/components/home/AboutMeSection';
import CertificateTimeline from '@/components/home/CertificateTimeline';
import ContactSection from '@/components/home/ContactSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import FeaturedBlogsSection from '@/components/home/FeaturedBlogsSection';
import HeroSection from '@/components/home/HeroSection';
import ProjectSection from '@/components/home/ProjectSection';
import SkillsSection from '@/components/home/SkillsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificateTimeline />
      <ContactSection />
      <ProjectSection />
      <FeaturedBlogsSection />
    </main>
  );
}
