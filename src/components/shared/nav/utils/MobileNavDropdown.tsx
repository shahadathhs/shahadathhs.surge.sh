import { nanoid } from 'nanoid';
import { ActiveLink } from './ActiveLink';
import { navLinks } from '@/constant/navigationLinks';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export const MobileNavDropdown = () => {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="z-[10000] w-72">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-left font-bold text-xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <div key={nanoid()} onClick={handleItemClick}>
              <ActiveLink href={link.link} extraClasses="text-lg block py-2">
                {link.title}
              </ActiveLink>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
