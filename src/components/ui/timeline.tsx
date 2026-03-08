'use client';

import type { TimelineEntry } from '@/constant/experienceData';
import { cn } from '@/lib/utils';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

interface TimelineProps {
  data: TimelineEntry[];
}

export const Timeline = ({ data }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 40%'],
  });

  // Calculate timeline progress based on scroll
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white dark:bg-neutral-950 font-sans pt-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl mb-4 font-bold text-black dark:text-white max-w-4xl">
            My Tech Journey
          </h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-base text-justify max-w-2xl">
            Over the past 2 years, I&apos;ve grown through hands-on experience
            and real-world projects. Here&apos;s a look at some key milestones
            that shaped my path so far. Always open to exciting opportunities.
            Let&apos;s connect!
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-neutral-200 dark:bg-neutral-800">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Timeline entries */}
          {data.map((entry, index) => (
            <TimelineEntryComponent
              key={index}
              entry={entry}
              index={index}
              isActive={activeIndex === index}
              setActive={() => setActiveIndex(index)}
              clearActive={() => setActiveIndex(null)}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TimelineEntryProps {
  entry: TimelineEntry;
  index: number;
  isActive: boolean;
  setActive: () => void;
  clearActive: () => void;
  isEven: boolean;
}

const TimelineEntryComponent = ({
  entry,
  index,
  isActive,
  setActive,
  clearActive,
  isEven,
}: TimelineEntryProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  console.log(isEven);

  return (
    <motion.div
      className="relative mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      custom={index}
      variants={variants}
    >
      {/* Timeline dot */}
      <div className="absolute z-10">
        <motion.div
          className={cn(
            'h-8 w-8 rounded-full border-4 border-white dark:border-neutral-950 flex items-center justify-center transition-all duration-300',
            isActive
              ? 'bg-blue-500 scale-125'
              : 'bg-neutral-200 dark:bg-neutral-700',
          )}
          whileHover={{ scale: 1.2 }}
        />
      </div>

      {/* Content card */}
      <div className="ml-12">
        <motion.div
          className={cn(
            'bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-lg border border-neutral-100 dark:border-neutral-800 transition-all duration-300',
            isActive &&
              'shadow-xl border-blue-200 dark:border-blue-900 -translate-y-1',
          )}
          whileHover={{ y: -5 }}
          onMouseEnter={setActive}
          onMouseLeave={clearActive}
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
            <CalendarIcon className="h-4 w-4" />
            <span className="font-medium">{entry.title}</span>
          </div>

          <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-1">
            {entry.designation}
          </h3>
          <div className="xl:flex items-center gap-1 text-neutral-500 dark:text-neutral-400 mb-4">
            <span className="font-medium">{entry.company}</span>
            <span className="hidden xl:block">•</span>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" />
              <span className="text-xs md:text-sm">{entry.location}</span>
            </div>
          </div>

          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
            {entry.responsibilities.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 before:content-['•'] before:text-blue-500 before:mr-2"
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};
