"use client";

import React from "react";
import { WarpBackground } from "../magicui/warp-background";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { User, Server, Database, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "API Design",
    description:
      "Creating RESTful and GraphQL APIs for seamless data exchange.",
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
        className="container mx-auto flex flex-col md:flex-row items-center gap-10 p-8"
      >
        {/* Text & Features */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mt-2 text-lg text-gray-700">
              I&apos;m a backend developer passionate about building secure,
              efficient, and scalable applications. With expertise in
              server-side architecture, database design, and API security, I
              thrive on transforming complex challenges into elegant solutions.
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
