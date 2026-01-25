'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { TypingAnimation } from '../magicui/typing-animation';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'shahadathhossensajib732@gmail.com';

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
    <div className="relative overflow-hidden items-center p-8 md:p-16 border rounded mt-10 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-8">
        <h2 className="text-3xl font-semibold">
          <TypingAnimation>Get in touch</TypingAnimation>
        </h2>

        <p className="text-muted-foreground max-w-2xl">
          I'm always open to new opportunities, collaborations, or just a
          friendly chat about backend architecture and API design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-8">
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
              <span className="text-primary text-sm font-medium truncate max-w-[200px]">
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
        </div>
      </div>
    </div>
  );
}
