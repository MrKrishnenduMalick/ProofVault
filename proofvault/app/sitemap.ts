import { MetadataRoute } from 'next';
import { PortfolioService } from '@/lib/services/portfolio-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // In a real implementation, this would fetch published portfolios from the database
  // For now, we're using mock data
  const publishedPortfolios = [
    { slug: 'john-doe-developer', updatedAt: new Date().toISOString() },
    { slug: 'jane-smith-designer', updatedAt: new Date().toISOString() },
  ];

  const portfolioEntries = publishedPortfolios.map((portfolio) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://proofvault.com'}/u/${portfolio.slug}`,
    lastModified: portfolio.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://proofvault.com'}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://proofvault.com'}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...portfolioEntries,
  ];
}