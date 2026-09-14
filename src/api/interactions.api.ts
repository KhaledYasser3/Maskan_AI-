import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';
import {
  AppNotification,
  Conversation,
  FavoriteItem,
  MessageItem,
  ReportPayload,
  ViewingRequest,
} from '../types/interactions.types';
import { Listing } from '../types/listings.types';

export const interactionsApi = {
  // Favorites
  async getFavorites(): Promise<ApiResponse<FavoriteItem[]>> {
    return apiClient.get('/favorites');
  },

  async addFavorite(listingId: string): Promise<ApiResponse<FavoriteItem>> {
    return apiClient.post(`/favorites/${listingId}`);
  },

  async removeFavorite(listingId: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.delete(`/favorites/${listingId}`);
  },

  // Comparisons
  async getComparisons(): Promise<ApiResponse<Listing[]>> {
    return apiClient.get('/comparisons');
  },

  async addComparison(listingId: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post(`/comparisons/${listingId}`);
  },

  async removeComparison(listingId: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.delete(`/comparisons/${listingId}`);
  },

  // Viewings
  async requestViewing(payload: {
    listingId: string;
    message?: string;
  }): Promise<ApiResponse<ViewingRequest>> {
    return apiClient.post('/viewings/requests', payload);
  },

  async updateViewingRequest(
    id: string,
    payload: {
      status: 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
      scheduledAt?: string;
    }
  ): Promise<ApiResponse<ViewingRequest>> {
    return apiClient.patch(`/viewings/requests/${id}`, payload);
  },

  async updateScheduledViewing(
    id: string,
    payload: {
      feedback?: string;
      rating?: number;
    }
  ): Promise<ApiResponse<ViewingRequest>> {
    return apiClient.patch(`/viewings/${id}`, payload);
  },

  // Messages & Conversations
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return apiClient.get('/messages/conversations');
  },

  async startConversation(payload: {
    listingId: string;
    ownerUserId: string;
  }): Promise<ApiResponse<Conversation>> {
    return apiClient.post('/messages/conversations', payload);
  },

  async getMessages(conversationId: string): Promise<ApiResponse<MessageItem[]>> {
    return apiClient.get(`/messages/conversations/${conversationId}/messages`);
  },

  async sendMessage(
    conversationId: string,
    content: string
  ): Promise<ApiResponse<MessageItem>> {
    return apiClient.post(`/messages/conversations/${conversationId}/messages`, {
      content,
    });
  },

  // Notifications
  async getNotifications(): Promise<ApiResponse<AppNotification[]>> {
    return apiClient.get('/notifications');
  },

  // Reports
  async submitReport(payload: ReportPayload): Promise<ApiResponse<{ id: string }>> {
    return apiClient.post('/reports', payload);
  },
};
