'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { contactEmail } from '@/constant/contactInfo';
import { socialLinks } from '@/constant/socialLinks';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = contactEmail;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-32 max-w-6xl mx-auto scroll-mt-24 px-4 md:px-0"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-16">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl"
        >
          <h2 className="text-5xl font-bold tracking-tighter leading-none">
            Let&apos;s build something{' '}
            <span className="text-accent italic">exceptional</span>.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium opacity-60">
            Currently open to new opportunities and interesting collaborations.
          </p>
        </motion.div>

        {/* Primary CTA - The Email Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-6xl group"
        >
          <div className="absolute inset-x-0 -bottom-12 -top-12 bg-accent/5 rounded-[4rem] blur-3xl group-hover:bg-accent/10 transition-colors" />
          <button
            onClick={copyToClipboard}
            className="relative overflow-hidden w-full glass p-12 md:p-16 rounded-[3rem] border-foreground/5 hover:border-foreground/10 transition-all flex flex-col items-center gap-6 group/btn"
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover/btn:opacity-100 transition-opacity">
              Contact me at
            </span>
            <span className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter break-all">
              {email}
            </span>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-bold tracking-wide transition-all group-hover/btn:scale-105">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? 'Copied' : 'Copy Email'}
            </div>
          </button>
        </motion.div>

        {/* Socials - Minimalist Footer of the Section */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
            >
              <link.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              {link.name}
              <ArrowUpRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-40 group-hover:ml-0 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
