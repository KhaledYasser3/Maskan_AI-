export interface ApiResponse<T = any> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    [key: string]: any;
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export type UserRole = 'STUDENT' | 'OWNER' | 'SUPERVISOR' | 'ADMIN';

export type PropertyType = 'APARTMENT' | 'STUDIO' | 'SHARED_ROOM' | 'DORMITORY' | 'VILLA_ROOM';

export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED';

export type ViewingStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';

export interface PaginationParams {
  page?: number;
  limit?: number;
}
