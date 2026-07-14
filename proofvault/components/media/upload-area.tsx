import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadIcon, FileIcon } from 'lucide-react';
import { MediaService } from '@/lib/services/media-service';

interface UploadAreaProps {
  onUploadSuccess: (file: any) => void;
}

export function UploadArea({ onUploadSuccess }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    if (files.length === 0) return;

    const file = files[0];
    setIsUploading(true);

    try {
      // Get upload URL from the API
      const uploadResponse = await fetch('/api/v1/media/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          fileSize: file.size,
          uploadContext: 'general',
        }),
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success) {
        throw new Error(uploadResult.message || 'Failed to get upload URL');
      }

      // Upload file directly to R2
      const uploadResult2 = await fetch(uploadResult.data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResult2.ok) {
        throw new Error('Failed to upload file to storage');
      }

      // Confirm the upload with the backend
      const confirmResponse = await fetch(`/api/v1/media/${uploadResult.data.mediaId}/confirm`, {
        method: 'POST',
      });

      const confirmResult = await confirmResponse.json();

      if (!confirmResult.success) {
        throw new Error(confirmResult.message || 'Failed to confirm upload');
      }

      toast({
        title: 'Success',
        description: `File "${file.name}" uploaded successfully`,
      });

      // Call the success callback with the new file info
      onUploadSuccess({
        id: uploadResult.data.mediaId,
        originalFilename: file.name,
        r2Key: uploadResult.data.r2Key,
        mimeType: file.type,
        fileSizeBytes: file.size,
        altText: '',
        createdAt: new Date().toISOString(),
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
      />
      <UploadIcon className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
      <p className="mb-1 font-medium">Drag and drop files here</p>
      <p className="text-sm text-muted-foreground mb-3">or click to browse</p>
      <p className="text-xs text-muted-foreground">Supports images, PDFs, and documents</p>
      <Button 
        className="mt-4" 
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Select Files'}
      </Button>
    </div>
  );
}