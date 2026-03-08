import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react';

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  extraClasses?: string;
}

export function ActiveLink({
  href,
  children,
  isActive = false,
  extraClasses = '',
}: ActiveLinkProps) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'text-nav-accent'
          : 'text-nav-foreground hover:text-nav-foreground/80'
      } ${extraClasses}`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-nav-accent/0 via-nav-accent to-nav-accent/0"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
