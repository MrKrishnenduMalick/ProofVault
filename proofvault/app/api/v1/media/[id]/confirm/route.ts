import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { MediaService } from '@/lib/services/media-service';

interface Props {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params }: Props) {
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

    // Verify that the user owns the media file
    const mediaFile = await MediaService.getByIdAndUserId(params.id, session.user.id);
    if (!mediaFile) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'Media file not found',
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // Mark the upload as confirmed and trigger variant generation
    const confirmedMedia = await MediaService.confirmUpload(params.id, session.user.id);

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Upload confirmed successfully',
        data: confirmedMedia,
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