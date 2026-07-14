import { NextResponse } from 'next/server';
import { PortfolioService } from '@/lib/services/portfolio-service';

interface Props {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  try {
    // Fetch public portfolio data
    const portfolio = await PortfolioService.getBySlug(params.slug);

    if (!portfolio || portfolio.status !== 'published') {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'Portfolio not found or not published',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // In a real implementation, we would fetch the full portfolio data
    // including projects, profile info, etc.
    const publicPortfolioData = {
      id: portfolio.id,
      slug: portfolio.slug,
      title: portfolio.profile?.displayName || 'Portfolio',
      headline: portfolio.profile?.headline || '',
      bio: portfolio.profile?.bio || '',
      location: portfolio.profile?.location || '',
      websiteUrl: portfolio.profile?.websiteUrl || '',
      socialLinks: portfolio.profile?.socialLinks || {},
      projects: portfolio.projects || [],
      sectionsConfig: portfolio.sectionsConfig || {
        hero: true,
        about: true,
        projects: true,
        skills: true,
        experience: true,
        education: true,
        contact: true,
      },
      theme: portfolio.theme || {
        primaryColor: '#3B82F6',
        fontSize: 'base',
        layout: 'default',
      },
      publishedAt: portfolio.publishedAt,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio retrieved successfully',
        data: publicPortfolioData,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: 'Internal server error',
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}