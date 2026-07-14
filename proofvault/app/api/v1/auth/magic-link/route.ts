import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { commonSchemas } from '@/lib/security/input-validator';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    
    const body = await request.json();
    const parsedBody = commonSchemas.email.safeParse(body.email);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Validation error',
          data: { errors: parsedBody.error.flatten().fieldErrors },
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const email = parsedBody.data;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // We can customize the email template in Supabase dashboard
        emailRedirectTo: `${request.url}/../callback`,
      },
    });

    if (error) {
      // Don't expose specific error details to prevent account enumeration
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'If this email exists in our system, a magic link has been sent',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Always return success to prevent account enumeration
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'If this email exists in our system, a magic link has been sent',
        data: { email: parsedBody.data },
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