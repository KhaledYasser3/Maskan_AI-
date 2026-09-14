import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';

export interface UploadResponse {
  storageKey: string;
  url: string;
  filename: string;
  size: number;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

function validateFile(file: File, allowedTypes?: string[]) {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File size exceeds the 10MB maximum limit.');
  }
  if (allowedTypes && allowedTypes.length > 0) {
    const isAllowed = allowedTypes.some((type) => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type === type || file.name.toLowerCase().endsWith(type);
    });
    if (!isAllowed) {
      throw new Error(`File type not supported. Allowed formats: ${allowedTypes.join(', ')}`);
    }
  }
}

export const uploadsApi = {
  // Upload property image (JPEG, PNG, WEBP)
  async uploadPropertyImage(file: File): Promise<ApiResponse<UploadResponse>> {
    validateFile(file, ['image/jpeg', 'image/png', 'image/webp', '.jpg', '.jpeg', '.png', '.webp']);
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post('/uploads/property-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Upload ownership & verification documents (PDF, JPEG, PNG, WEBP)
  async uploadVerificationDocument(file: File): Promise<ApiResponse<UploadResponse>> {
    validateFile(file, [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      '.pdf',
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
    ]);
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post('/uploads/verification-documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Upload lease agreement documents for AI analysis (PDF, JPEG, PNG, WEBP, TXT)
  async uploadLeaseDocument(file: File): Promise<ApiResponse<UploadResponse>> {
    validateFile(file, [
      'application/pdf',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/webp',
      '.pdf',
      '.txt',
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
    ]);
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post('/uploads/lease-documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
