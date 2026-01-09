export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl?: string;
  skills: string[];
  description: string;
  logo: string;
}

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Next Level Web development',
    organization: 'Programming Hero',
    issueDate: 'Issued May 2025',
    credentialId: 'PHL2B4MERNWEB9-10321213',
    credentialUrl:
      'https://web.programming-hero.com/verification?validationNumber=PHL2B4MERNWEB9-10321213',
    skills: [
      'MongoDB',
      'Express.js',
      'PostgreSQL',
      'Node.js',
      'TypeScript',
      'Next.js',
      'Mongoose ODM',
    ],
    description:
      'In this program, I learned a comprehensive range of technologies, including TypeScript, Node.js, Express, React, Next.js, MongoDB, and Mongoose.',
    logo: '/programminghero_logo.jpeg',
  },
  {
    id: '2',
    title: 'React Testing Library with Jest / Vitest',
    organization: 'Udemy',
    issueDate: 'Issued Sep 2024',
    credentialId: 'UC-0ef939de-66dd-421c-993d-b2f7cddae802',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-0ef939de-66dd-421c-993d-b2f7cddae802',
    skills: ['Jest', 'Vitest', 'React Testing Library', 'Jest'],
    description:
      'This course helped me learn best practices for testing applications using Vitest and React Testing Library in a test-driven development (TDD) approach.',
    logo: '/udemy_logo.jpeg',
  },
  {
    id: '3',
    title: 'Quality Assurance',
    organization: 'FreeCodeCamp',
    issueDate: 'Issued Aug 2024',
    credentialId: 'fcc4b53621b-923e-4494-a85b-3667294ce6e7',
    credentialUrl:
      'https://www.freecodecamp.org/certification/fcc4b53621b-923e-4494-a85b-3667294ce6e7/quality-assurance-v7',
    skills: ['Mocha', 'Chai'],
    description:
      'This program helped me learn REST API testing using Mocha and Chai.',
    logo: '/free_code_camp_logo.jpeg',
  },
  {
    id: '4',
    title: 'Complete Web Development Course',
    organization: 'Programming Hero',
    issueDate: 'Issued Jun 2024',
    credentialId: '',
    skills: [
      'REST APIs',
      'JSON Web Token (JWT)',
      'React.js',
      'JavaScript',
      'HTML5',
      'Tailwind CSS',
      'Firebase',
    ],
    description:
      'This program helped me learn Tailwind CSS, JavaScript, React, REST APIs, and Firebase.',
    logo: '/programminghero_logo.jpeg',
  },
];
