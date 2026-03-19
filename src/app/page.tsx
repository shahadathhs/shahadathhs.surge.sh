import Hero from '@/components/home/MinimalHero';
import About from '@/components/home/MinimalAbout';
import Experience from '@/components/home/MinimalExperience';
import Skills from '@/components/home/MinimalSkills';
import Projects from '@/components/home/MinimalProjects';
import Blogs from '@/components/home/MinimalBlogs';
import Contact from '@/components/home/MinimalContact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Blogs />
      <Contact />
    </>
  );
}
