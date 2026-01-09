import { nanoid } from "nanoid";
import { ActiveLink } from "./ActiveLink";
import { navLinks } from "@/constant/navigationLinks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const MobileNavDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[10000]">
        {navLinks.map((link) => (
          <DropdownMenuItem key={nanoid()}>
            <ActiveLink href={link.link}>{link.title}</ActiveLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
