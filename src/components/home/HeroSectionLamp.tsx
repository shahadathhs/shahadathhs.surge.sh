"use client";

import { LampContainer } from "../ui/lamp";
import { motion } from "motion/react";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../ui/button";

export default function HeroSectionLamp() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.3,
          ease: "easeInOut",
        }}
        className="mt-4 bg-gradient-to-br from-slate-300 to-slate-500 
      py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-5xl"
      >
        Hi, I am
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 2.2,
          ease: "easeInOut",
        }}
        className="mt-2 bg-gradient-to-br from-slate-300 to-slate-500 
      py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-5xl"
      >
        Shahadath Hossen Sajib
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.7,
          duration: 3.1,
          ease: "easeInOut",
        }}
        className="mt-2 py-4 text-center text-4xl font-medium tracking-tight text-white md:text-5xl"
      >
        <Typewriter
          words={["Junior Backend Developer", "MERN Stack Developer"]}
          loop={Infinity}
          cursor
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.4,
          duration: 4,
          ease: "easeInOut",
        }}
        className="mt-6 flex justify-center"
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="hover:scale-105 transition-all duration-300"
        >
          <Link
            target="_blank"
            href="https://drive.google.com/file/d/1dtZCEgZyof-qrUreeVpXDlOovosegpuf/view"
            rel="noopener noreferrer"
          >
            View My Resume
          </Link>
        </Button>
      </motion.div>
    </LampContainer>
  );
}
