'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Home, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Blogs',
    href: '/dashboard/blogs',
    icon: FileText,
  },
  {
    title: 'New Blog',
    href: '/dashboard/blogs/new',
    icon: Plus,
  },
  // {
  //   title: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  // },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-2 py-4 text-sm ml-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          className={cn(
            'flex w-full items-center justify-start gap-2',
            pathname === item.href && 'bg-secondary font-medium',
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
