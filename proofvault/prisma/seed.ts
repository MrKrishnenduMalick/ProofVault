import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding default technologies...');
  
  // Default technologies
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Language' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'GraphQL', category: 'API' },
    { name: 'REST', category: 'API' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'SASS', category: 'Styling' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'GCP', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Git', category: 'DevOps' },
    { name: 'Figma', category: 'Design' },
    { name: 'Adobe XD', category: 'Design' },
    { name: 'UI/UX', category: 'Design' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Java', category: 'Language' },
    { name: 'C#', category: 'Language' },
    { name: 'Go', category: 'Language' },
    { name: 'Rust', category: 'Language' },
  ];

  for (const tech of technologies) {
    await prisma.technologies.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    });
  }

  console.log('Seeding default tags...');
  
  // Default tags
  const tags = [
    { name: 'Open Source' },
    { name: 'Full Stack' },
    { name: 'Mobile' },
    { name: 'Web' },
    { name: 'E-commerce' },
    { name: 'SaaS' },
    { name: 'API' },
    { name: 'Machine Learning' },
    { name: 'AI' },
    { name: 'Data Science' },
  ];

  for (const tag of tags) {
    await prisma.tags.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });