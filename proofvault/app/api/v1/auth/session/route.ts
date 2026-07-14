import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';

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
          message: 'No active session',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Session retrieved successfully',
        data: {
          session: {
            user: {
              id: session.user.id,
              email: session.user.email,
              role: session.user.user_metadata?.role || 'user',
            },
            expires_at: session.expires_at,
          },
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