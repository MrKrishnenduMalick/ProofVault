import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { MediaService } from '@/lib/services/media-service';

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
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const cursor = url.searchParams.get('cursor') || undefined;

    // Get user's media files
    const result = await MediaService.getUserMedia(
      session.user.id,
      { limit, cursor }
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Media files retrieved successfully',
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
    const { fileName, mimeType, fileSize, uploadContext } = body;

    // Validate file type and size against user's plan limits
    const isValid = await MediaService.validateUpload(
      session.user.id,
      fileName,
      mimeType,
      fileSize
    );

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'File validation failed',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Create a media file record
    const newMedia = await MediaService.create(
      session.user.id,
      fileName,
      mimeType,
      fileSize,
      uploadContext
    );

    return NextResponse.json(
      {
        success: true,
        status: 201,
        message: 'Media file created successfully',
        data: newMedia,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
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