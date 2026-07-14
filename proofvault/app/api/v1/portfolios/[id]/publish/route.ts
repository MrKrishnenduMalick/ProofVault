import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { PortfolioService } from '@/lib/services/portfolio-service';

interface Props {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params }: Props) {
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

    // Check publish preconditions
    const canPublish = await PortfolioService.canPublish(portfolio.id);
    if (!canPublish) {
      return NextResponse.json(
        {
          success: false,
          status: 422,
          message: 'Portfolio does not meet publish requirements',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 422 }
      );
    }

    // Publish portfolio
    const publishedPortfolio = await PortfolioService.publish(params.id, session.user.id);

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio published successfully',
        data: publishedPortfolio,
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