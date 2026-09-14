import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  allowedExtensions?: string[];
  maxSizeMb?: number;
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  helperText = 'PDF, PNG, JPG, or TXT up to 10MB',
  allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.txt'],
  maxSizeMb = 10,
  onFileSelect,
  isLoading = false,
  error,
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = (file: File) => {
    setValidationError(null);

    // Check size limit (<= 10MB)
    if (file.size > maxSizeMb * 1024 * 1024) {
      setValidationError(`File exceeds the maximum ${maxSizeMb}MB limit.`);
      return;
    }

    // Check extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => ext.toLowerCase() === extension);
    if (!isAllowed) {
      setValidationError(`Unsupported format. Allowed: ${allowedExtensions.join(', ')}`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className={twMerge('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-label-md font-label-md text-on-surface text-left">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150',
          isDragOver
            ? 'border-secondary bg-secondary-fixed/10 scale-[1.01]'
            : selectedFile
            ? 'border-tertiary bg-tertiary-fixed/20'
            : 'border-outline-variant/60 bg-surface-container-low hover:bg-surface-container hover:border-outline-variant'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={allowedExtensions.join(',')}
          onChange={handleChange}
          className="hidden"
          disabled={isLoading}
        />

        <div className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-warm-sm flex items-center justify-center text-secondary mb-3">
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
          ) : selectedFile ? (
            <span className="material-symbols-outlined text-2xl text-tertiary">
              check_circle
            </span>
          ) : (
            <span className="material-symbols-outlined text-2xl">upload_file</span>
          )}
        </div>

        {selectedFile ? (
          <div className="flex flex-col items-center">
            <span className="font-label-lg text-primary truncate max-w-xs">
              {selectedFile.name}
            </span>
            <span className="text-body-sm text-on-surface-variant mt-0.5">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="font-label-lg text-primary">
              <span className="text-secondary font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-body-sm text-on-surface-variant/70 mt-1">
              {helperText}
            </p>
          </div>
        )}
      </div>

      {(validationError || error) && (
        <span className="text-body-sm text-error font-body-sm flex items-center gap-1 mt-1 text-left">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {validationError || error}
        </span>
      )}
    </div>
  );
};
