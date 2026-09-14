import { Property } from './listings.types';
import { User } from './auth.types';
import { VerificationStatus } from './common.types';

export type VerificationDocumentType = 
  | 'TEMPORARY_PROOF' 
  | 'OWNERSHIP_CONTRACT' 
  | 'POWER_OF_ATTORNEY' 
  | 'OTHER';

export interface VerificationSubmission {
  id: string;
  propertyId: string;
  property?: Property;
  ownerId: string;
  owner?: User;
  documentType: VerificationDocumentType;
  documentStorageKey: string;
  documentUrl?: string;
  status: VerificationStatus;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface VerificationDecisionPayload {
  status: 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED';
  rejectionReason?: string;
  publishApprovedListings?: boolean;
}

export interface AdminReportItem {
  id: string;
  reporterId: string;
  reporter?: User;
  targetType: 'LISTING' | 'USER' | 'PROPERTY';
  targetId: string;
  reason: string;
  details?: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}
