import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { portfolioUpdateSchema } from '@/lib/validation/portfolio-schemas';
import { z } from 'zod';
import { PortfolioService } from '@/lib/services/portfolio-service';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Props) {
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

    // Fetch portfolio
    const portfolio = await PortfolioService.getByIdAndUserId(params.id, session.user.id);

    if (!portfolio) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'Portfolio not found',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio retrieved successfully',
        data: portfolio,
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

export async function PATCH(request: Request, { params }: Props) {
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
    const parsedBody = portfolioUpdateSchema.safeParse(body);

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

    // Check if user owns the portfolio
    const existingPortfolio = await PortfolioService.getByIdAndUserId(params.id, session.user.id);
    if (!existingPortfolio) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'Portfolio not found',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // If slug is being updated, validate uniqueness
    if (slug && slug !== existingPortfolio.slug) {
      const existingBySlug = await PortfolioService.getBySlug(slug);
      if (existingBySlug) {
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
    }

    // Update portfolio
    const updatedPortfolio = await PortfolioService.updateById(
      params.id,
      session.user.id,
      {
        slug,
        sectionsConfig,
        theme,
      }
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio updated successfully',
        data: updatedPortfolio,
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

export async function DELETE(request: Request, { params }: Props) {
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

    // Check if user owns the portfolio
    const existingPortfolio = await PortfolioService.getByIdAndUserId(params.id, session.user.id);
    if (!existingPortfolio) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'Portfolio not found',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // Delete portfolio (soft delete in a real implementation)
    await PortfolioService.deleteById(params.id, session.user.id);

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio deleted successfully',
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