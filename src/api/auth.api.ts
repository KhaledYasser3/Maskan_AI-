import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth.types';

export const authApi = {
  // Register public user (Student or Owner)
  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post('/auth/register', payload);
  },

  // Login with email & password
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post('/auth/login', payload);
  },

  // Get current user from token
  async getMe(): Promise<ApiResponse<User>> {
    return apiClient.get('/auth/me');
  },

  // Get full user profile with role sub-profiles
  async getFullProfile(): Promise<ApiResponse<User>> {
    return apiClient.get('/users/me');
  },

  // Update profile data
  async updateProfile(payload: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.patch('/users/me', payload);
  },
};
