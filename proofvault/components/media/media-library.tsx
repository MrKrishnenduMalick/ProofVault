'use client';

import { useState } from 'react';
import { UploadArea } from './upload-area';
import { MediaGrid } from './media-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MediaFile {
  id: string;
  originalFilename: string;
  r2Key: string;
  mimeType: string;
  fileSizeBytes: number;
  altText: string;
  createdAt: string;
}

interface MediaLibraryProps {
  mediaFiles: MediaFile[];
}

export function MediaLibrary({ mediaFiles }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>(mediaFiles);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = files.filter(file =>
    file.originalFilename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="w-full max-w-sm">
          <Label htmlFor="search" className="sr-only">Search media</Label>
          <Input
            id="search"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <UploadArea onUploadSuccess={(newFile) => setFiles(prev => [newFile, ...prev])} />
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Your Media Files</h3>
        <MediaGrid 
          mediaFiles={filteredFiles} 
          onDelete={(deletedId) => setFiles(prev => prev.filter(f => f.id !== deletedId))} 
        />
      </div>
    </div>
  );
}