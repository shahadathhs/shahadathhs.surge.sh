'use client';

import { Button } from '@/components/ui/button';
import { quickLinks } from '@/constant/navigationLinks';
import { ArrowUp, Check, Copy, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'shahadathhossensajib732@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative">
      <div className="absolute inset-x-0 -top-[1px] h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* info */}
          <div className="space-y-4 max-w-md">
            {/* Logo and Description */}
            <Link href="/" className="font-bold italic text-xl">
              Shahadath Hossen Sajib
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Backend developer passionate about building scalable, efficient,
              and secure server-side applications with a focus on robust
              architecture and clean code.
            </p>

            {/* Social Links */}
            <SocialLinks />

            {/* email */}
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground truncate max-w-[180px] xl:max-w-[300px]">
                {email}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyEmail}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy email</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-8">
            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Quick Links</h3>
              <ul className="grid grid-cols-1">
                {quickLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.link}
                      className="text-muted-foreground underline text-sm hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Actions</h3>
              <div className="space-y-3 grid grid-cols-1">
                <Button asChild variant="outline">
                  <Link
                    target="_blank"
                    href="https://drive.google.com/file/d/1dtZCEgZyof-qrUreeVpXDlOovosegpuf/view"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                  </Link>
                </Button>

                <Button className="hover:cursor-pointer" onClick={scrollToTop}>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="relative mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
            <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shahadath Hossen Sajib. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
