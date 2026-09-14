import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';
import { Property, Listing } from '../types/listings.types';
import {
  VerificationDocumentType,
  VerificationSubmission,
} from '../types/dashboard.types';

export interface CreatePropertyPayload {
  title: string;
  description: string;
  propertyType: string;
  city: string;
  neighborhood: string;
  universityArea: string;
  address: string;
  totalBedrooms: number;
  totalBathrooms: number;
  isFurnished: boolean;
  amenities: string[];
  images: Array<{ url: string; isPrimary?: boolean; caption?: string }>;
}

export interface CreateListingPayload {
  propertyId: string;
  title: string;
  description?: string;
  rentAmount: number;
  depositAmount: number;
  minStudents: number;
  maxStudents: number;
  availableFrom: string;
}

export const ownerApi = {
  // Create a new property
  async createProperty(payload: CreatePropertyPayload): Promise<ApiResponse<Property>> {
    return apiClient.post('/properties', payload);
  },

  // Submit property verification documents
  async submitPropertyVerification(
    propertyId: string,
    payload: {
      documentStorageKey: string;
      documentType: VerificationDocumentType;
    }
  ): Promise<ApiResponse<VerificationSubmission>> {
    return apiClient.post(`/verifications/properties/${propertyId}/submit`, payload);
  },

  // Create a new listing under a property
  async createListing(payload: CreateListingPayload): Promise<ApiResponse<Listing>> {
    return apiClient.post('/listings', payload);
  },

  // Get owner's properties and listings
  async getMyListings(): Promise<ApiResponse<Listing[]>> {
    return apiClient.get('/listings/mine');
  },

  // Get owner's verification requests status
  async getMyVerifications(): Promise<ApiResponse<VerificationSubmission[]>> {
    return apiClient.get('/verifications/mine');
  },
};
