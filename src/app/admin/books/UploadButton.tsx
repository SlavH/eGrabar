"use client";
import { ChangeEvent, useState } from 'react';
import { uploadFile } from '@/lib/storage';

export default function UploadButton({ bucket, onUploaded }: { bucket: string; onUploaded?: (url: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLoading(true);
    setError(null);
    try {
      const url = await uploadFile(bucket, `${Date.now()}_${file.name}`, file);
      onUploaded?.(url);
    } catch {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFile} disabled={loading} />
      {loading && <span className="text-xs text-zinc-500">Uploading...</span>}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
