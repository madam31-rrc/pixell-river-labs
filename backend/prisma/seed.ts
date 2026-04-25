import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const departmentsData = [
  {
    name: 'Engineering',
    employees: [
      { firstName: 'Priyanka', lastName: 'Bose' },
      { firstName: 'Madeleine', lastName: 'Madden' },
      { firstName: 'Taylor', lastName: 'Napier' },
      { firstName: 'Alex', lastName: 'Johnson' },
      { firstName: 'Sam', lastName: 'Williams' },
      { firstName: 'Jordan', lastName: 'Smith' },
    ],
  },
  {
    name: 'IT Technicians',
    employees: [
      { firstName: 'Iniko', lastName: 'Stonebear' },
      { firstName: 'Tala', lastName: 'Braveheart' },
      { firstName: 'Kiona', lastName: 'Redhawk' },
      { firstName: 'Liam', lastName: 'Brown' },
    ],
  },
  {
    name: 'Human Resources',
    employees: [
      { firstName: 'Jesse', lastName: 'Azure' },
      { firstName: 'Stacy', lastName: 'Silver' },
      { firstName: 'Morgan', lastName: 'Gold' },
      { firstName: 'Casey', lastName: 'Copper' },
    ],
  },
];

const organizationRolesData = [
  { firstName: 'Jo-Anne', lastName: 'Sinclair', title: 'CEO/Chair of Board' },
  { firstName: 'Jackson', lastName: 'Smith', title: 'COO/VP Operations' },
  { firstName: 'Susan', lastName: 'Thomas', title: 'CFO/VP Administration' },
  { firstName: 'Richa', lastName: 'Kaur', title: 'VP Client Services' },
  { firstName: 'Josee', lastName: 'Benjamin', title: 'CIO' },
  { firstName: 'Vincent', lastName: 'Grey', title: 'VP Sales & Marketing' },
];

async function main() {
  for (const dept of departmentsData) {
    const department = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: { name: dept.name },
    });

    for (const emp of dept.employees) {
      const existing = await prisma.employee.findFirst({
        where: {
          firstName: emp.firstName,
          lastName: emp.lastName,
          departmentId: department.id,
        },
      });

      if (!existing) {
        await prisma.employee.create({
          data: { ...emp, departmentId: department.id },
        });
      }
    }
  }

  for (const role of organizationRolesData) {
    await prisma.organizationRole.upsert({
      where: { title: role.title },
      update: {},
      create: role,
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
