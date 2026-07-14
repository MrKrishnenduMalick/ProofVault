import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { BillingService } from '@/lib/services/billing-service';

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
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const cursor = url.searchParams.get('cursor') || undefined;

    // Get user's invoices
    const result = await BillingService.getInvoicesByUserId(
      session.user.id,
      { limit, cursor }
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Invoices retrieved successfully',
        data: result.items,
        meta: {
          nextCursor: result.nextCursor,
          hasNextPage: !!result.nextCursor,
          count: result.items.length,
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