import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrashIcon, FileIcon, ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

interface MediaGridProps {
  mediaFiles: MediaFile[];
  onDelete: (id: string) => void;
}

export function MediaGrid({ mediaFiles, onDelete }: MediaGridProps) {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [altText, setAltText] = useState('');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-primary" />;
    }
    return <FileIcon className="h-8 w-8 text-primary" />;
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/media/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        onDelete(id);
      } else {
        throw new Error(result.message || 'Failed to delete file');
      }
    } catch (error: any) {
      console.error('Error deleting media file:', error);
      // Show error to user in a real app
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaFiles.map((file) => (
        <Card key={file.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-center mb-2">
              {getFileIcon(file.mimeType)}
            </div>
            <p className="text-sm font-medium truncate">{file.originalFilename}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(file.fileSizeBytes)}</p>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedFile(file);
                    setAltText(file.altText);
                  }}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Media Details</DialogTitle>
                  <DialogDescription>
                    Update the alt text for this media file
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="altText">Alt Text</Label>
                    <Input
                      id="altText"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Describe the content of this image for accessibility"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedFile(null);
                      setAltText('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={async () => {
                      // In a real app, this would save the alt text to the backend
                      setSelectedFile(null);
                      setAltText('');
                    }}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => handleDelete(file.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}