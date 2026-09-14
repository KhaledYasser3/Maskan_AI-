import { PropertyType, VerificationStatus } from './common.types';

export interface PropertyImage {
  id?: string;
  url: string;
  isPrimary?: boolean;
  caption?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  category?: 'ESSENTIAL' | 'STUDY' | 'COMFORT' | 'BUILDING';
}

export interface WalkingDistance {
  destination: string;
  minutes: number;
  distanceMeters?: number;
}

export interface Property {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  city: string;
  neighborhood: string;
  universityArea: string;
  address: string;
  latitude?: number;
  longitude?: number;
  totalBedrooms: number;
  totalBathrooms: number;
  floorNumber?: number;
  isFurnished: boolean;
  images: PropertyImage[];
  amenities: string[];
  walkingDistances: WalkingDistance[];
  verificationStatus: VerificationStatus;
  verificationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Listing {
  id: string;
  propertyId: string;
  property?: Property;
  title: string;
  description?: string;
  rentAmount: number;
  depositAmount: number;
  minStudents: number;
  maxStudents: number;
  studentSharePrice?: number;
  availableFrom: string;
  isAvailable: boolean;
  matchScore?: number;
  matchConfidence?: number;
  matchExplanation?: string;
  createdAt: string;
}

export interface ListingFilterParams {
  page?: number;
  limit?: number;
  q?: string;
  city?: string;
  universityArea?: string;
  neighborhood?: string;
  propertyType?: PropertyType;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  minStudents?: number;
  maxStudents?: number;
  furnished?: boolean;
  maxWalkingMinutes?: number;
  amenities?: string[];
  sort?: 'rent_asc' | 'rent_desc' | 'newest' | 'walking_asc';
}

export interface NeighborhoodItem {
  id: string;
  name: string;
  university: string;
  flatsCount: number;
  avgRent: number;
  avgWalkMinutes: number;
  imageUrl?: string;
}

export interface HomeDiscoveryData {
  featuredListings: Listing[];
  neighborhoods: NeighborhoodItem[];
  stats: {
    totalListings: number;
    verifiedProperties: number;
    activeStudents: number;
    avgSavedPerMonth: number;
  };
}
