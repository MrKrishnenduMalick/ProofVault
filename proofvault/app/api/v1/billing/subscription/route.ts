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

    // Get user's subscription
    const subscription = await BillingService.getSubscriptionByUserId(session.user.id);

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'No subscription found',
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
        message: 'Subscription retrieved successfully',
        data: subscription,
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
    const { plan } = body;

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Plan is required',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Create or update subscription
    const subscription = await BillingService.createOrUpdateSubscription(
      session.user.id,
      plan
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Subscription updated successfully',
        data: subscription,
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