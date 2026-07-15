import { MediaService } from '@/lib/services/media-service';
import { prisma } from '@/lib/prisma/client';

describe('MediaService', () => {
  beforeEach(async () => {
    // Clear any test data
    await prisma.media_files.deleteMany({});
    await prisma.users.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await prisma.media_files.deleteMany({});
    await prisma.users.deleteMany({});
  });

  describe('validateUpload', () => {
    it('should validate allowed file types', async () => {
      const isValid = await MediaService.validateUpload(
        'test-user',
        'test-image.png',
        'image/png',
        1000000 // 1MB
      );
      expect(isValid).toBe(true);
    });

    it('should reject disallowed file types', async () => {
      const isValid = await MediaService.validateUpload(
        'test-user',
        'test-file.exe',
        'application/x-executable',
        1000000 // 1MB
      );
      expect(isValid).toBe(false);
    });

    it('should reject oversized files', async () => {
      const isValid = await MediaService.validateUpload(
        'test-user',
        'test-file.png',
        'image/png',
        15 * 1024 * 1024 // 15MB, over the 10MB limit
      );
      expect(isValid).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a media file record', async () => {
      const userId = 'test-user-id';
      const fileName = 'test-image.png';
      const mimeType = 'image/png';
      const fileSize = 100000;

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const mediaFile = await MediaService.create(
        userId,
        fileName,
        mimeType,
        fileSize,
        'general'
      );

      expect(mediaFile).toBeDefined();
      expect(mediaFile.userId).toBe(userId);
      expect(mediaFile.originalFilename).toBe(fileName);
      expect(mediaFile.mimeType).toBe(mimeType);
      expect(mediaFile.fileSizeBytes).toBe(fileSize);
      expect(mediaFile.r2Key).toContain(userId);
      expect(mediaFile.r2Key).toContain(fileName);
    });
  });

  describe('getByIdAndUserId', () => {
    it('should retrieve a media file by ID and user ID', async () => {
      const userId = 'test-user-id';
      const fileName = 'test-image.png';
      const mimeType = 'image/png';
      const fileSize = 100000;

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const mediaFile = await prisma.media_files.create({
        data: {
          userId,
          r2Key: `general/${userId}/test-key-${fileName}`,
          mimeType,
          fileSizeBytes: fileSize,
          originalFilename: fileName,
        },
      });

      const retrievedMediaFile = await MediaService.getByIdAndUserId(
        mediaFile.id,
        userId
      );

      expect(retrievedMediaFile).toBeDefined();
      expect(retrievedMediaFile?.id).toBe(mediaFile.id);
      expect(retrievedMediaFile?.userId).toBe(userId);
    });

    it('should return null for non-existent media file', async () => {
      const userId = 'test-user-id';
      const nonExistentId = 'non-existent-id';

      const retrievedMediaFile = await MediaService.getByIdAndUserId(
        nonExistentId,
        userId
      );

      expect(retrievedMediaFile).toBeNull();
    });
  });

  describe('getUserMedia', () => {
    it('should retrieve user media files with pagination', async () => {
      const userId = 'test-user-id';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      // Create multiple media files
      await prisma.media_files.create({
        data: {
          userId,
          r2Key: `general/${userId}/test-key-1.png`,
          mimeType: 'image/png',
          fileSizeBytes: 100000,
          originalFilename: 'test-image-1.png',
        },
      });

      await prisma.media_files.create({
        data: {
          userId,
          r2Key: `general/${userId}/test-key-2.png`,
          mimeType: 'image/png',
          fileSizeBytes: 200000,
          originalFilename: 'test-image-2.png',
        },
      });

      const result = await MediaService.getUserMedia(userId, { limit: 10 });

      expect(result.items).toHaveLength(2);
      expect(result.items[0].originalFilename).toBe('test-image-2.png'); // Most recent first
      expect(result.items[1].originalFilename).toBe('test-image-1.png');
    });
  });

  describe('delete', () => {
    it('should delete a media file and its variants', async () => {
      const userId = 'test-user-id';
      const fileName = 'test-image.png';
      const mimeType = 'image/png';
      const fileSize = 100000;

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const mediaFile = await prisma.media_files.create({
        data: {
          userId,
          r2Key: `general/${userId}/test-key-${fileName}`,
          mimeType,
          fileSizeBytes: fileSize,
          originalFilename: fileName,
        },
      });

      // Create a variant for this media file
      await prisma.media_variants.create({
        data: {
          mediaFileId: mediaFile.id,
          variantType: 'thumbnail',
          r2Key: `general/${userId}/test-key-thumb-${fileName}`,
          width: 150,
          height: 150,
          fileSizeBytes: 10000,
          mimeType,
        },
      });

      await MediaService.delete(mediaFile.id, userId);

      const deletedMediaFile = await prisma.media_files.findUnique({
        where: { id: mediaFile.id },
      });
      expect(deletedMediaFile).toBeNull();

      const deletedVariants = await prisma.media_variants.findMany({
        where: { mediaFileId: mediaFile.id },
      });
      expect(deletedVariants).toHaveLength(0);
    });
  });
});