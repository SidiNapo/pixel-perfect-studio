import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file.',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Image must be less than 5MB.',
      });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message,
      });
    } else {
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      onChange(urlData.publicUrl);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully.',
      });
    }

    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img
            src={value}
            alt="Featured"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 flex items-center justify-center text-destructive-foreground hover:bg-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {uploading ? (
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                <span className="text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
            </>
          )}
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
