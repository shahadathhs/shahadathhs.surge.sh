import configuration from '@/config/configuration';
import bcrypt from 'bcryptjs';
import prisma from '@/db';

async function main() {
  const adminEmail = configuration.adminEmail || 'admin@example.com';
  const adminPassword = configuration.adminPassword || 'password123';
  const adminName = configuration.adminName || 'Admin';

  console.info('Seeding admin user...');

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.info({ admin });
}

main();
