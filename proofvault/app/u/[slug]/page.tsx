import { notFound } from 'next/navigation';
import { PublicPortfolio } from '@/components/portfolio/public-portfolio';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  // In a real implementation, this would fetch from the database
  // For now, we're using mock data
  const portfolio = {
    title: 'John Doe - Software Developer',
    headline: 'Building modern web applications',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies',
    avatarUrl: '/placeholder-avatar.jpg',
  };

  if (!portfolio) {
    return {};
  }

  return {
    title: portfolio.title,
    description: portfolio.headline,
    openGraph: {
      title: portfolio.title,
      description: portfolio.headline,
      type: 'website',
      url: `https://proofvault.com/u/${params.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(portfolio.title)}&subtitle=${encodeURIComponent(portfolio.headline)}`,
          width: 1200,
          height: 630,
          alt: portfolio.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: portfolio.title,
      description: portfolio.headline,
    },
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  // In a real implementation, this would fetch from the database
  // For now, we're using mock data
  const portfolio = {
    id: '1',
    slug: params.slug,
    title: 'John Doe - Software Developer',
    headline: 'Building modern web applications',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies',
    location: 'San Francisco, CA',
    websiteUrl: 'https://johndoe.dev',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
    avatarUrl: '/placeholder-avatar.jpg',
    sectionsConfig: {
      hero: true,
      about: true,
      projects: true,
      skills: true,
      experience: true,
      education: true,
      contact: true,
    },
    theme: {
      primaryColor: '#3B82F6',
      fontSize: 'base',
      layout: 'default',
    },
    projects: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce solution built with React and Node.js',
        coverImageUrl: '/placeholder-project-1.jpg',
        liveUrl: 'https://ecommerce-demo.com',
        repoUrl: 'https://github.com/johndoe/ecommerce',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        startDate: '2023-01-01',
        endDate: '2023-06-01',
        featured: true,
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates',
        coverImageUrl: '/placeholder-project-2.jpg',
        liveUrl: 'https://taskmanager-demo.com',
        repoUrl: 'https://github.com/johndoe/taskmanager',
        technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        startDate: '2022-08-01',
        endDate: '2022-12-01',
        featured: false,
      },
    ],
  };

  if (!portfolio || portfolio.sectionsConfig === undefined) {
    notFound();
  }

  return (
    <PublicPortfolio portfolio={portfolio} />
  );
}