import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';
import { User } from '../types/auth.types';
import {
  AdminReportItem,
  VerificationDecisionPayload,
  VerificationSubmission,
} from '../types/dashboard.types';

export const adminApi = {
  // Get verification queue of pending property reviews
  async getVerificationQueue(): Promise<ApiResponse<VerificationSubmission[]>> {
    return apiClient.get('/verifications/queue');
  },

  // Review a verification request (Approve, Reject, Resubmission)
  async reviewVerification(
    id: string,
    payload: VerificationDecisionPayload
  ): Promise<ApiResponse<VerificationSubmission>> {
    return apiClient.patch(`/verifications/${id}/review`, payload);
  },

  // Get users list for admin management
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
  }): Promise<ApiResponse<User[]>> {
    return apiClient.get('/admin/users', { params });
  },

  // Update user status (Active / Inactive)
  async updateUserStatus(
    id: string,
    payload: { isActive: boolean }
  ): Promise<ApiResponse<User>> {
    return apiClient.patch(`/admin/users/${id}/status`, payload);
  },

  // Get reports queue
  async getReports(params?: {
    status?: string;
    page?: number;
  }): Promise<ApiResponse<AdminReportItem[]>> {
    return apiClient.get('/admin/reports', { params });
  },

  // Resolve report
  async resolveReport(
    id: string,
    payload: { status: 'RESOLVED' | 'DISMISSED'; resolutionNotes?: string }
  ): Promise<ApiResponse<AdminReportItem>> {
    return apiClient.patch(`/admin/reports/${id}`, payload);
  },
};
