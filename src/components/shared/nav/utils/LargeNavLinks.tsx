import { ActiveLink } from '@/components/shared/nav/utils/ActiveLink';
import { navLinks } from '@/constant/navigationLinks';
import { nanoid } from 'nanoid';

export const LargeNavLinks = () => {
  return (
    <div className="flex items-center space-x-2 lg:space-x-3 mr-3">
      {navLinks.map((link) => (
        <ActiveLink key={nanoid()} href={link.link}>
          {link.title}
        </ActiveLink>
      ))}
    </div>
  );
};
