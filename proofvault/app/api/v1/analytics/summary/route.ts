import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { AnalyticsService } from '@/lib/services/analytics-service';

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

    // Parse query parameters
    const url = new URL(request.url);
    const portfolioId = url.searchParams.get('portfolioId');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!portfolioId) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Portfolio ID is required',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Verify that the user owns the portfolio
    const userPortfolio = await AnalyticsService.getUserPortfolio(session.user.id, portfolioId);
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

    // Get analytics summary
    const summary = await AnalyticsService.getSummary(
      portfolioId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Analytics summary retrieved successfully',
        data: summary,
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