/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING YUVANTHIKA AQUACARE INITIAL ADMIN & DATA ---');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@Yuvanthika2026!', salt);

  // 1. Create Super Admin User
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@yuvanthikaaquasolar.in' },
    update: { password: passwordHash, role: 'SUPER_ADMIN' },
    create: {
      name: 'Yuvanthika Super Admin',
      email: 'admin@yuvanthikaaquasolar.in',
      password: passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✓ Super Admin created:', superAdmin.email);

  // 2. Create Store Admin User
  const storeAdmin = await prisma.user.upsert({
    where: { email: 'aquacareindia1@gmail.com' },
    update: { role: 'ADMIN' },
    create: {
      name: 'Karur Store Manager',
      email: 'aquacareindia1@gmail.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('✓ Store Admin created:', storeAdmin.email);

  // 3. Seed Initial Site Settings
  const initialSettings = [
    { key: 'companyName', value: 'Yuvanthika Aquacare & Solar Care Systems' },
    { key: 'trustPhrase', value: 'Formerly known as Aqua Care & Solar Care Systems, serving customers since 2014.' },
    { key: 'phone', value: '+91 84288 88854' },
    { key: 'whatsapp', value: '918428888854' },
    { key: 'email', value: 'aquacareindia1@gmail.com' },
    { key: 'address', value: 'Andankoil East, Karur, Tamil Nadu 639002' },
  ];

  for (const s of initialSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log('✓ Site settings initialized.');

  console.log('SEEDING COMPLETED SUCCESSFULLY!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
