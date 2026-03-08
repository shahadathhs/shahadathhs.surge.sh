'use client';

import { Button } from '@/components/ui/button';
import { IconBrandMedium } from '@tabler/icons-react';
import { CheckCircle, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { TypingAnimation } from '../magicui/typing-animation';

import { BorderBeam } from '../magicui/border-beam';

import { contactEmail } from '@/constant/contactInfo';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = contactEmail;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard', {
      icon: '📋',
      duration: 2000,
      description: 'You can now paste it anywhere you need.',
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      id="contact"
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col items-start text-left max-w-2xl mb-10">
            <h2 className="text-3xl font-semibold dark:text-white text-black  mb-4">
              <TypingAnimation>Get in touch</TypingAnimation>
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300  text-base max-w-4xl">
              {/* I&apos;m always open to new opportunities, collaborations, or just
              a friendly chat about backend architecture and API design. */}
              I&apos;m a backend developer passionate about building clean,
              scalable systems. Here&apos;s a bit about my journey and what I
              bring to the table.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl pt-8 mx-auto">
            {/* github */}
            <a
              href="https://github.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors border border-primary/10 group"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Github className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">GitHub</h3>
              <span className="text-primary text-sm font-medium">
                @shahadathhs
              </span>
            </a>

            {/* linkedin */}
            <a
              href="https://www.linkedin.com/in/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors border border-primary/10 group"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Linkedin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">LinkedIn</h3>
              <span className="text-primary text-sm font-medium">
                in/shahadathhs
              </span>
            </a>

            {/* email */}
            <div className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors border border-primary/10 group relative">
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <div className="flex items-center gap-2">
                <span className="text-primary text-sm font-medium truncate max-w-[150px]">
                  {email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* medium */}
            <a
              href="https://medium.com/@shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors border border-primary/10 group"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <IconBrandMedium className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">Medium</h3>
              <span className="text-primary text-sm font-medium">
                @shahadathhs
              </span>
            </a>
          </div>
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
