import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { BetaInviteService } from '@/lib/features/beta-invites';
import { AuthService } from '@/lib/services/auth-service';

export async function POST(request: Request) {
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

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Email is required',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Create invite
    const invite = await BetaInviteService.createInvite(
      email,
      session.user.id
    );

    // In a real implementation, this would send an email invitation
    // For now, we're just returning the invite data
    console.log(`Beta invite created for: ${email}`);

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Beta invite created successfully',
        data: {
          email: invite.email,
          expiresAt: invite.expiresAt,
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
        message: error.message || 'Internal server error',
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

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

    // Get invite statistics
    const stats = await BetaInviteService.getInviteStats();

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Invite statistics retrieved successfully',
        data: stats,
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