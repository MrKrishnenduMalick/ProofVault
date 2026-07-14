import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { portfolioCreateSchema } from '@/lib/validation/portfolio-schemas';
import { z } from 'zod';
import { PortfolioService } from '@/lib/services/portfolio-service';

export async function GET(request: Request) {
  try {
    const supabase = createClient();
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: 'Unauthorized',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    // Fetch user's portfolios
    // In a real implementation, this would fetch from the database
    // For now, we're using mock data
    const portfolios = [
      {
        id: '1',
        userId: session.user.id,
        slug: 'my-portfolio',
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
      },
    ];

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolios retrieved successfully',
        data: portfolios,
        meta: {
          count: portfolios.length,
        },
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

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: 'Unauthorized',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsedBody = portfolioCreateSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Validation error',
          data: { errors: parsedBody.error.flatten().fieldErrors },
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { slug, sectionsConfig, theme } = parsedBody.data;

    // Validate slug uniqueness
    const existingPortfolio = await PortfolioService.getBySlug(slug);
    if (existingPortfolio) {
      return NextResponse.json(
        {
          success: false,
          status: 409,
          message: 'Portfolio slug already exists',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 409 }
      );
    }

    // Create portfolio
    const newPortfolio = await PortfolioService.create({
      userId: session.user.id,
      slug,
      status: 'draft',
      sectionsConfig,
      theme,
    });

    return NextResponse.json(
      {
        success: true,
        status: 201,
        message: 'Portfolio created successfully',
        data: newPortfolio,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
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