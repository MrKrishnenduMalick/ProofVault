import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { AnalyticsService } from '@/lib/services/analytics-service';

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

    // Verify that the user owns the portfolio
    const userPortfolio = await AnalyticsService.getUserPortfolio(session.user.id, params.id);
    if (!userPortfolio) {
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

    // Parse query parameters
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const granularity = url.searchParams.get('granularity') || 'daily'; // daily, weekly, monthly

    // Get portfolio analytics
    const analytics = await AnalyticsService.getPortfolioAnalytics(
      params.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      granularity as 'daily' | 'weekly' | 'monthly'
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Portfolio analytics retrieved successfully',
        data: analytics,
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