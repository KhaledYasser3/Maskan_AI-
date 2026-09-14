import { Listing } from './listings.types';
import { ViewingStatus } from './common.types';
import { User } from './auth.types';

export interface FavoriteItem {
  id: string;
  userId: string;
  listingId: string;
  listing?: Listing;
  createdAt: string;
}

export interface ViewingRequest {
  id: string;
  listingId: string;
  listing?: Listing;
  studentId: string;
  student?: User;
  ownerId: string;
  owner?: User;
  message?: string;
  status: ViewingStatus;
  scheduledAt?: string;
  feedback?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listing?: Listing;
  studentId: string;
  student?: User;
  ownerId: string;
  owner?: User;
  lastMessage?: MessageItem;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'VIEWING_UPDATE' | 'NEW_MESSAGE' | 'VERIFICATION_UPDATE' | 'SYSTEM';
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface ReportPayload {
  targetType: 'LISTING' | 'USER' | 'PROPERTY';
  targetId: string;
  reason: string;
  details?: string;
}
