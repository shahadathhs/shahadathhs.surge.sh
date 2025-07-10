"use client";

import { Database, Server, ShieldCheck, User } from "lucide-react";
import { motion } from "motion/react";
import { WarpBackground } from "../magicui/warp-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const features = [
  {
    title: "API Design",
    description: "Creating RESTful APIs for seamless data exchange.",
    icon: Server,
  },
  {
    title: "Robust Databases",
    description:
      "Crafting optimized schemas and queries for performant data storage.",
    icon: Database,
  },
  {
    title: "Security First",
    description:
      "Implementing authentication, authorization, and secure API practices.",
    icon: ShieldCheck,
  },
  {
    title: "Collaborative Excellence",
    description:
      "Thriving in team environments with clean code and peer reviews.",
    icon: User,
  },
];

export default function AboutMeSection() {
  return (
    <WarpBackground>
      <section
        id="about"
        className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* Text & Features */}
        <div className="flex-1 space-y-6">
          {/* about me title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-4 font-bold text-black dark:text-white max-w-4xl mt-10 md:mt-0">
              About Me
            </h2>
          </motion.div>

          {/* about me description */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-base">
              Hi, I'm Shahadath Hossen Sajib — a backend developer passionate about building clean, scalable, and maintainable systems. 
              I currently work at a service-based company where I develop APIs and backend features using NestJS, Drizzle ORM, Prisma, and PostgreSQL.
              Starting my journey with the MERN stack, I gradually found my interest in the backend ecosystem — working with databases, designing APIs, and focusing on performance and clean architecture.
              Outside of work, I’m actively learning advanced NestJS patterns, PostgreSQL internals, and data structures & algorithms to sharpen my problem-solving and system design skills. I also love working on side projects that challenge me and help me grow as a developer.
              I’m always eager to explore new technologies, improve my craft, and collaborate on meaningful products.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Card className="hover:shadow-xl transform hover:-translate-y-1 transition">
                  <CardHeader className="flex items-center gap-4">
                    <feature.icon className="w-6 h-6 text-blue-500" />
                    <CardTitle className="text-lg font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </WarpBackground>
  );
}
