import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Listing } from '../../types/listings.types';
import { ListingCard } from '../explore/ListingCard';

export const MOCK_FEATURED_LISTINGS: Listing[] = [
  {
    id: 'f1a9b2c3-1111-4444-9999-000000000001',
    propertyId: 'p1',
    title: 'Al-Dokki Academic Residence, Apt 4',
    description: 'Ultra-quiet 3-bedroom renovated apartment with high-speed fiber internet, private study desks, and 11-min direct walk to Cairo University Gate 4.',
    rentAmount: 5800,
    depositAmount: 5800,
    minStudents: 3,
    maxStudents: 3,
    studentSharePrice: 1933,
    availableFrom: '2026-10-01',
    isAvailable: true,
    matchScore: 98,
    matchConfidence: 0.95,
    matchExplanation: 'Exact budget fit, 11 min walk to Faculty of Engineering, 3 study desks & fiber optic line.',
    createdAt: new Date().toISOString(),
    property: {
      id: 'p1',
      ownerId: 'ow1',
      title: 'Al-Dokki Academic Residence',
      description: 'Modern student residential flat',
      propertyType: 'APARTMENT',
      city: 'Giza',
      neighborhood: 'Dokki',
      universityArea: 'Cairo University',
      address: '34 El-Messaha Square, Dokki, Giza',
      totalBedrooms: 3,
      totalBathrooms: 2,
      isFurnished: true,
      verificationStatus: 'APPROVED',
      amenities: ['Fiber Wi-Fi', 'Air Conditioning', 'Study Desks', 'Balcony', 'Elevator', 'Washing Machine'],
      walkingDistances: [
        { destination: 'Cairo University Gate 4', minutes: 11 },
        { destination: 'Dokki Metro Station', minutes: 6 },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
        { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'f2a9b2c3-2222-4444-9999-000000000002',
    propertyId: 'p2',
    title: 'Bein El-Sarayat Student Flat B2',
    description: 'Spacious furnished flat 5 minutes from Cairo Univ Science Faculty. Low utilities cost, natural gas, elevator.',
    rentAmount: 4800,
    depositAmount: 4800,
    minStudents: 3,
    maxStudents: 4,
    studentSharePrice: 1600,
    availableFrom: '2026-10-01',
    isAvailable: true,
    matchScore: 94,
    matchConfidence: 0.91,
    matchExplanation: 'Closest walking distance to science gates, very budget friendly for 3-4 students.',
    createdAt: new Date().toISOString(),
    property: {
      id: 'p2',
      ownerId: 'ow2',
      title: 'Bein El-Sarayat Student Flat',
      description: 'Ideal for science and engineering students',
      propertyType: 'APARTMENT',
      city: 'Giza',
      neighborhood: 'Bein El-Sarayat',
      universityArea: 'Cairo University',
      address: '12 Bein El-Sarayat St, Giza',
      totalBedrooms: 3,
      totalBathrooms: 1,
      isFurnished: true,
      verificationStatus: 'APPROVED',
      amenities: ['Wi-Fi', 'Elevator', 'Natural Gas', 'Balcony'],
      walkingDistances: [
        { destination: 'Cairo University Science Gate', minutes: 5 },
        { destination: 'Cairo University Metro', minutes: 8 },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1502005229762-ae1b46642009?auto=format&fit=crop&w=800&q=80', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'f3a9b2c3-3333-4444-9999-000000000003',
    propertyId: 'p3',
    title: 'Nasr City Modern Residence, 7th District',
    description: 'Renovated stylish flat near Ain Shams Faculty of Engineering and Abbas El-Akkad. Quiet street, modern furnishings.',
    rentAmount: 6600,
    depositAmount: 6600,
    minStudents: 3,
    maxStudents: 3,
    studentSharePrice: 2200,
    availableFrom: '2026-10-01',
    isAvailable: true,
    matchScore: 91,
    matchConfidence: 0.88,
    matchExplanation: 'Superb quality finishing with AC in every room and full kitchen appliances.',
    createdAt: new Date().toISOString(),
    property: {
      id: 'p3',
      ownerId: 'ow3',
      title: 'Nasr City Modern Residence',
      description: 'Quiet premium apartment',
      propertyType: 'APARTMENT',
      city: 'Cairo',
      neighborhood: 'Nasr City',
      universityArea: 'Ain Shams University',
      address: '45 Tayaran St, 7th District, Nasr City',
      totalBedrooms: 3,
      totalBathrooms: 2,
      isFurnished: true,
      verificationStatus: 'APPROVED',
      amenities: ['Fiber Wi-Fi', 'Air Conditioning', 'Full Kitchen', 'Balcony', 'Elevator'],
      walkingDistances: [
        { destination: 'Ain Shams Engineering Gate', minutes: 14 },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

export const FeaturedListings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-[1200px] mx-auto px-margin py-12 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <span className="font-label-sm text-secondary uppercase tracking-widest font-bold">
            Curated For Fall Intake
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">
            Top AI-Recommended Student Flats
          </h2>
        </div>
        <button
          onClick={() => navigate('/explore')}
          className="text-secondary hover:text-on-secondary-container font-label-md text-label-md flex items-center gap-1 mt-2 sm:mt-0"
        >
          <span>Explore all 120+ flats</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_FEATURED_LISTINGS.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};
