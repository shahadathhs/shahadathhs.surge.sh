import { ActiveLink } from '@/components/shared/nav/utils/ActiveLink';
import { navLinks } from '@/constant/navigationLinks';
import { useActiveSection } from '@/hooks/use-active-section';
import { nanoid } from 'nanoid';

export const LargeNavLinks = () => {
  const activeSection = useActiveSection(navLinks.map((l) => l.link));

  return (
    <div className="flex items-center space-x-2 lg:space-x-3 mr-3">
      {navLinks.map((link) => (
        <ActiveLink
          key={nanoid()}
          href={link.link}
          isActive={activeSection === link.link}
        >
          {link.title}
        </ActiveLink>
      ))}
    </div>
  );
};
