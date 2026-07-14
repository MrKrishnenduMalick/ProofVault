import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import { MediaLibrary } from '@/components/media/media-library';

export default async function MediaLibraryPage() {
  // Verify user is authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/(auth)/login');
  }

  // In a real implementation, we would fetch the user's media files
  // For now, we're using mock data
  const mediaFiles = [
    {
      id: '1',
      originalFilename: 'project-screenshot.png',
      r2Key: 'projects/project-1/screenshot.png',
      mimeType: 'image/png',
      fileSizeBytes: 123456,
      altText: 'Screenshot of the e-commerce platform',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      originalFilename: 'logo.svg',
      r2Key: 'avatars/user-1/logo.svg',
      mimeType: 'image/svg+xml',
      fileSizeBytes: 45678,
      altText: 'Company logo',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      originalFilename: 'resume.pdf',
      r2Key: 'resumes/user-1/resume.pdf',
      mimeType: 'application/pdf',
      fileSizeBytes: 987654,
      altText: 'John Doe Resume',
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground">
          Upload and manage images and documents for your portfolio
        </p>
      </div>

      <MediaLibrary mediaFiles={mediaFiles} />
    </div>
  );
}