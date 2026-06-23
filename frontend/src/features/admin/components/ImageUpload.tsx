import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { adminApi } from "../../../lib/admin-api";
import { env } from "../../../lib/env";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const result = await adminApi.upload<{ url: string; filename: string }>("/admin/upload-image", file);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const imageUrl = value?.startsWith("/") ? `${env.API_URL}${value}` : value;

  return (
    <div className={className}>
      {value ? (
        <div className="relative inline-block">
          <img src={imageUrl} alt="Uploaded" className="h-32 rounded-lg object-cover border border-white/10" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-blue-500/50 hover:bg-white/5 transition-colors"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
          ) : (
            <>
              <Upload size={20} className="text-gray-500 mb-2" />
              <span className="text-sm text-gray-500">Click or drag to upload</span>
            </>
          )}
        </div>
      )}
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  );
}
