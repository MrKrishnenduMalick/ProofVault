import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { FunnelTrackingService } from '@/lib/analytics/funnel-tracking';

export async function GET(request: Request) {
  try {
    const supabase = createClient();
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user.user_metadata?.role === 'admin') {
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
    const startDateParam = url.searchParams.get('startDate');
    const endDateParam = url.searchParams.get('endDate');

    const startDate = startDateParam ? new Date(startDateParam) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const endDate = endDateParam ? new Date(endDateParam) : new Date();

    // Get funnel data
    const funnelData = await FunnelTrackingService.getFunnelData(startDate, endDate);

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Funnel data retrieved successfully',
        data: funnelData,
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
        message: error.message || 'Internal server error',
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}