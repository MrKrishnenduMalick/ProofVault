import { prisma } from '@/lib/prisma/client';
import { R2Client } from '@/lib/storage/r2-client';

export class MediaService {
  /**
   * Validates if a file can be uploaded based on user's plan and file properties
   */
  static async validateUpload(
    userId: string,
    fileName: string,
    mimeType: string,
    fileSize: number
  ): Promise<boolean> {
    // In a real implementation, this would check the user's plan limits
    // For now, we're just doing basic validation
    
    // Check file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip'
    ];
    
    if (!allowedTypes.includes(mimeType)) {
      return false;
    }
    
    // Check file size (limiting to 10MB for demo purposes)
    if (fileSize > 10 * 1024 * 1024) {
      return false;
    }
    
    return true;
  }

  /**
   * Generates a signed upload URL for a file
   */
  static async generateUploadUrl(
    userId: string,
    fileName: string,
    mimeType: string,
    uploadContext: string
  ) {
    // Determine the upload context and create appropriate R2 key
    let r2Key = '';
    switch (uploadContext) {
      case 'avatar':
        r2Key = `avatars/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
      case 'project':
        r2Key = `projects/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
      case 'resume':
        r2Key = `resumes/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
      default:
        r2Key = `general/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
    }

    // Create a media file record in the database
    const mediaFile = await prisma.media_files.create({
      data: {
        userId,
        r2Key,
        mimeType,
        fileSizeBytes: 0, // Will be updated after upload
        originalFilename: fileName,
        altText: null, // Will be set by user after upload
      },
    });

    // Generate the signed upload URL
    const uploadUrl = await R2Client.generateSignedUploadUrl(r2Key, mimeType);

    return {
      uploadUrl,
      mediaId: mediaFile.id,
      r2Key,
    };
  }

  /**
   * Confirms an upload and triggers variant generation
   */
  static async confirmUpload(mediaId: string, userId: string) {
    // In a real implementation, this would:
    // 1. Verify the file exists in R2
    // 2. Get the actual file size from R2
    // 3. Update the media file record with the actual size
    // 4. Trigger background job for variant generation
    
    // For now, we're just updating the record
    const mediaFile = await prisma.media_files.update({
      where: {
        id: mediaId,
        userId,
      },
      data: {
        // In a real implementation, we would update the actual file size here
        fileSizeBytes: 100000, // Placeholder
      },
    });

    // Simulate triggering background job for variant generation
    // In a real app, this would queue a background job
    setTimeout(async () => {
      await this.generateVariants(mediaFile.id);
    }, 1000);

    return mediaFile;
  }

  /**
   * Generates image variants (thumbnail, web-optimized, etc.)
   */
  static async generateVariants(mediaFileId: string) {
    // In a real implementation, this would:
    // 1. Download the original file from R2
    // 2. Generate variants (thumbnail, web-optimized, etc.)
    // 3. Upload variants back to R2
    // 4. Create media_variants records in the database
    
    // For now, we're just creating mock variants
    const mediaFile = await prisma.media_files.findUnique({
      where: { id: mediaFileId },
    });

    if (!mediaFile) {
      throw new Error('Media file not found');
    }

    const variants = [
      {
        mediaFileId,
        variantType: 'thumbnail',
        r2Key: mediaFile.r2Key.replace('.', '_thumb.'),
        width: 150,
        height: 150,
        fileSizeBytes: 10000,
        mimeType: mediaFile.mimeType,
      },
      {
        mediaFileId,
        variantType: 'web',
        r2Key: mediaFile.r2Key.replace('.', '_web.'),
        width: 1200,
        height: 800,
        fileSizeBytes: 50000,
        mimeType: mediaFile.mimeType,
      },
    ];

    for (const variant of variants) {
      await prisma.media_variants.create({
        data: {
          mediaFileId: variant.mediaFileId,
          variantType: variant.variantType,
          r2Key: variant.r2Key,
          width: variant.width,
          height: variant.height,
          fileSizeBytes: variant.fileSizeBytes,
          mimeType: variant.mimeType,
        },
      });
    }
  }

  /**
   * Creates a media file record
   */
  static async create(
    userId: string,
    fileName: string,
    mimeType: string,
    fileSize: number,
    uploadContext: string
  ) {
    // Determine the upload context and create appropriate R2 key
    let r2Key = '';
    switch (uploadContext) {
      case 'avatar':
        r2Key = `avatars/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
      case 'project':
        r2Key = `projects/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
      case 'resume':
        r2Key = `resumes/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
      default:
        r2Key = `general/${userId}/${crypto.randomUUID()}-${fileName}`;
        break;
    }

    const mediaFile = await prisma.media_files.create({
      data: {
        userId,
        r2Key,
        mimeType,
        fileSizeBytes: fileSize,
        originalFilename: fileName,
        altText: null,
      },
    });

    return mediaFile;
  }

  /**
   * Gets a media file by ID and user ID
   */
  static async getByIdAndUserId(id: string, userId: string) {
    return await prisma.media_files.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  /**
   * Gets user's media files with pagination
   */
  static async getUserMedia(
    userId: string,
    options: { limit: number; cursor?: string }
  ) {
    const { limit, cursor } = options;

    const mediaFiles = await prisma.media_files.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1, // Take one extra to determine if there's a next page
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    let nextCursor: string | undefined = undefined;
    if (mediaFiles.length > limit) {
      const nextItem = mediaFiles.pop();
      nextCursor = nextItem?.id;
    }

    return {
      items: mediaFiles,
      nextCursor,
    };
  }

  /**
   * Deletes a media file and its variants
   */
  static async delete(id: string, userId: string) {
    // Get the media file to delete
    const mediaFile = await prisma.media_files.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        variants: true,
      },
    });

    if (!mediaFile) {
      throw new Error('Media file not found');
    }

    // Delete the file and its variants from R2
    await R2Client.deleteFile(mediaFile.r2Key);
    for (const variant of mediaFile.variants) {
      await R2Client.deleteFile(variant.r2Key);
    }

    // Soft delete the media file and its variants from the database
    await prisma.media_files.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Delete related records
    await prisma.media_variants.deleteMany({
      where: { mediaFileId: id },
    });

    // Remove from any projects/profiles that might reference it
    // This would involve updating projects, profiles, etc. that reference this media
    // For now, we're just noting this in a comment
  }
}