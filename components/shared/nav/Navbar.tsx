"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import { ModeToggle } from "../ModeToggle";
import { LargeNavLinks } from "./utils/LargeNavLinks";
import { MobileNavDropdown } from "./utils/MobileNavDropdown";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // * Listen for scroll events to update sticky behavior.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // * Update window width state.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-2 z-[9999] transition-all transform ease-in-out duration-500 mt-3",
        scrolled ? "md:px-16" : ""
      )}
    >
      <div
        className={cn(
          "transition-all transform ease-in-out duration-500 container mx-auto bg-white dark:bg-slate-900 flex items-center justify-between border rounded p-2 lg:p-4",
          scrolled ? "max-w-7xl" : ""
        )}
      >
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="flex items-center space-x-3">
          {/* Desktop Navigation: Large screen links */}
          {!isMobile && <LargeNavLinks />}

          {/* Mobile Navigation: Render dropdown for mobile devices */}
          {isMobile && <MobileNavDropdown />}

          {/* Mode Toggle */}
          <ModeToggle />
        </div>

        <BorderBeam
          duration={40}
          size={100}
          reverse
          className="from-transparent via-green-500 to-transparent"
        />
      </div>
    </nav>
  );
}
