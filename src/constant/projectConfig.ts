export const repoCategories = {
  'Starter Kits & Boilerplates': [
    'nestjs-prisma-aws-starter',
    'nx-remix-starter',
    'turborepo-starter',
  ],
  'AI & Machine Learning': ['rag', 'voice-to-text'],
  'Tools & Utilities': ['systemix', 'local-mail-stack', 'docker-cheatsheet'],
  'Applications & Projects': [
    'vortex',
    'barisathi',
    'bike-shop',
    'knowledge-capsule',
  ],
};

export const PINNED_REPOS = Object.values(repoCategories).flat();
