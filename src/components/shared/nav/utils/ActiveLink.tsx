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
      className={`relative py-1 text-sm transition-colors duration-300 hover:text-blue-500 ${
        isActive
          ? 'text-blue-600 dark:text-blue-400 font-semibold'
          : 'text-neutral-600 dark:text-neutral-400'
      } ${extraClasses}`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
