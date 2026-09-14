import { UserRole } from './common.types';

export interface StudentProfile {
  university?: string;
  studyLevel?: string;
  budgetMin?: number;
  budgetMax?: number;
  preferredAreas?: string[];
  bio?: string;
}

export interface OwnerProfile {
  organizationName?: string;
  taxId?: string;
  isVerified?: boolean;
  totalProperties?: number;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  studentProfile?: StudentProfile;
  ownerProfile?: OwnerProfile;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: 'STUDENT' | 'OWNER';
  university?: string;
  studyLevel?: string;
  organizationName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
