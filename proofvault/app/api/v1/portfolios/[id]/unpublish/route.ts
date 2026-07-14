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

    // Unpublish portfolio
    const unpublishedPortfolio = await PortfolioService.unpublish(params.id, session.user.id);

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio unpublished successfully',
        data: unpublishedPortfolio,
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