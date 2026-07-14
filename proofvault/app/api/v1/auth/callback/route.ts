import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { AuthService } from '@/lib/services/auth-service';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Missing code parameter',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: error.message,
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Check if this is a new user and create profile/portfolio if needed
    if (data.session) {
      const userId = data.user.id;
      const email = data.user.email;
      
      // Check if user already has a profile
      const existingProfile = await prisma.profiles.findUnique({
        where: { userId },
      });
      
      if (!existingProfile && email) {
        await AuthService.createUserProfile(userId, email);
      }
    }

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Authentication successful',
        data: {
          session: {
            user: {
              id: data.user.id,
              email: data.user.email,
              role: data.user.user_metadata?.role || 'user',
            },
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