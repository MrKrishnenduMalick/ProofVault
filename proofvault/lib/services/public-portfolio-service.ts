import { prisma } from '@/lib/prisma/client';

export class PublicPortfolioService {
  /**
   * Gets a published portfolio by slug
   */
  static async getBySlug(slug: string) {
    // In a real implementation, this would fetch from the database
    // For now, we're returning mock data
    if (slug === 'john-doe-developer') {
      return {
        id: '1',
        slug: 'john-doe-developer',
        userId: 'user-1',
        status: 'published',
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
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profile: {
          displayName: 'John Doe',
          headline: 'Software Developer',
          bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies',
          location: 'San Francisco, CA',
          websiteUrl: 'https://johndoe.dev',
          socialLinks: {
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
          },
          avatarUrl: '/placeholder-avatar.jpg',
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
    }
    return null;
  }
}