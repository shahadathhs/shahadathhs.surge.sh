export interface TimelineEntry {
  title: string;
  company: string;
  location: string;
  designation: string;
  responsibilities: string[];
}

export const experienceData: TimelineEntry[] = [
  {
    title: "Nov 2024 – Mar 2025",
    company: "Monster Studio",
    location: "Chattogram, Bangladesh · On-site",
    designation: "Web Developer",
    responsibilities: [
      "Contributed to both frontend and backend development in a large-scale MERN stack project.",
      "Built reusable components and REST APIs using React.js, Remix, Express.js, Node.js, and MongoDB.",
      "Managed and configured a large-scale Nx monorepo to optimize modularity and scalability.",
      "Led a frontend team, facilitating collaboration and improving productivity.",
    ],
  },
  {
    title: "Sep 2024 – Oct 2024",
    company: "Monster Studio",
    location: "Chattogram, Bangladesh · On-site",
    designation: "Quality Assurance Intern",
    responsibilities: [
      "Wrote comprehensive unit tests for frontend and backend using Jest, Vitest, MSW, and Supertest.",
      "Explored and experimented with K6 for backend load testing and performance profiling.",
      "Contributed to improving overall code quality and reliability in a full-stack testing environment.",
    ],
  },
  {
    title: "Aug 2024",
    company: "Monster Studio",
    location: "Chattogram, Bangladesh · On-site",
    designation: "Trainee Frontend Developer",
    responsibilities: [
      "Gained practical experience with React.js, Tailwind CSS, and modern frontend workflows.",
      "Participated in UI implementation, responsive design, and component architecture basics.",
    ],
  },
];