import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';
import {
  HomeDiscoveryData,
  Listing,
  ListingFilterParams,
  NeighborhoodItem,
} from '../types/listings.types';

export const listingsApi = {
  // Get home discovery data: featured listings, neighborhoods, and stats
  async getHomeDiscovery(): Promise<ApiResponse<HomeDiscoveryData>> {
    return apiClient.get('/discovery/home');
  },

  // Get campus neighborhoods list
  async getNeighborhoods(): Promise<ApiResponse<NeighborhoodItem[]>> {
    return apiClient.get('/discovery/neighborhoods');
  },

  // Search & filter listings with pagination
  async getListings(params?: ListingFilterParams): Promise<ApiResponse<Listing[]>> {
    return apiClient.get('/listings', { params });
  },

  // Get detailed listing by UUID
  async getListingById(id: string): Promise<ApiResponse<Listing>> {
    return apiClient.get(`/listings/${id}`);
  },

  // Compare multiple listings by their IDs
  async getCompareListings(ids: string[]): Promise<ApiResponse<Listing[]>> {
    return apiClient.get(`/listings/compare?ids=${ids.join(',')}`);
  },
};
