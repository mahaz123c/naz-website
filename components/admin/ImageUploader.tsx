'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';

const BUCKET = 'vehicle-images';
const MAX_BYTES = 10 * 1024 * 1024;

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  pathPrefix: string;
}

function sanitize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/-+/g, '-');
}

function pathFromPublicUrl(url: string): string | null {
  const marker = `/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export default function ImageUploader({ value, onChange, pathPrefix }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    setError('');
    const supabase = createClient();
    const accepted: File[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith('image/')) {
        setError(`"${f.name}" is not an image.`);
        continue;
      }
      if (f.size > MAX_BYTES) {
        setError(`"${f.name}" is over 10MB.`);
        continue;
      }
      accepted.push(f);
    }
    if (accepted.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];
    for (const file of accepted) {
      const path = `${pathPrefix}/${crypto.randomUUID()}-${sanitize(file.name)}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false });
      if (upErr) {
        setError(upErr.message);
        continue;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }
    onChange([...value, ...newUrls]);
    setUploading(false);
  }

  async function removeAt(index: number) {
    const url = value[index];
    const path = pathFromPublicUrl(url);
    if (path) {
      const supabase = createClient();
      await supabase.storage.from(BUCKET).remove([path]);
    }
    onChange(value.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function makeCover(index: number) {
    if (index === 0) return;
    const next = [...value];
    const [picked] = next.splice(index, 1);
    next.unshift(picked);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg px-4 py-8 cursor-pointer transition-colors ${
          dragOver ? 'border-accent bg-accent/5' : 'border-border hover:border-white/40'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = '';
          }}
        />
        {uploading ? (
          <>
            <Loader2 size={22} className="text-accent animate-spin" />
            <p className="text-sm text-secondary">Uploading…</p>
          </>
        ) : (
          <>
            <Upload size={22} className="text-secondary" />
            <p className="text-sm text-white font-medium">Tap to choose photos or drag &amp; drop</p>
            <p className="text-xs text-secondary">JPG, PNG, WebP &middot; up to 10MB each</p>
          </>
        )}
      </label>

      {error && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-3">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, i) => (
            <div key={url} className="relative bg-background border border-border rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={url} alt="" fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                {i === 0 && (
                  <span className="absolute top-2 left-2 bg-accent text-black text-[10px] font-semibold px-2 py-0.5 rounded">
                    MAIN
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-500 text-white rounded-full p-1.5 transition-colors"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 text-xs">
                <span className="text-secondary">#{i + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="p-1 text-secondary hover:text-white disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === value.length - 1}
                    className="p-1 text-secondary hover:text-white disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => makeCover(i)}
                      className="ml-1 px-2 py-0.5 text-[10px] text-accent border border-accent/40 rounded hover:bg-accent/10"
                    >
                      Make Main
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
