import { NextResponse } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { MediaService } from '@/lib/services/media-service';
import { validateFileUpload } from '@/lib/security/input-validator';
import { z } from 'zod';

const uploadUrlSchema = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(100),
  fileSize: z.number().positive(),
  uploadContext: z.enum(['avatar', 'project', 'resume', 'general']).default('general'),
});

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
    const parsedBody = uploadUrlSchema.safeParse(body);

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

    const { fileName, mimeType, fileSize, uploadContext } = parsedBody.data;

    // Validate file upload parameters
    const validation = validateFileUpload(fileName, mimeType, fileSize);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'File validation failed',
          data: { errors: validation.errors },
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

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

    // Generate a signed upload URL
    const uploadResult = await MediaService.generateUploadUrl(
      session.user.id,
      fileName,
      mimeType,
      uploadContext
    );

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Upload URL generated successfully',
        data: {
          uploadUrl: uploadResult.uploadUrl,
          mediaId: uploadResult.mediaId,
          r2Key: uploadResult.r2Key,
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