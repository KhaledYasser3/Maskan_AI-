import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types/listings.types';
import { listingsApi } from '../../api/listings.api';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';
import { DetailsHeader } from './DetailsHeader';
import { PhotoGallery } from './PhotoGallery';
import { AIMatchCard } from './AIMatchCard';
import { PricingBreakdown } from './PricingBreakdown';
import { WalkingDistanceMap } from './WalkingDistanceMap';
import { AmenitiesSection } from './AmenitiesSection';
import { ScheduleViewingModal } from './ScheduleViewingModal';
import { DirectMessageModal } from './DirectMessageModal';
import { Skeleton } from '../../components/ui/Skeleton';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    if (id) {
      listingsApi
        .getListingById(id)
        .then((res) => {
          if (res.data) {
            setListing(res.data);
          } else {
            const found = MOCK_FEATURED_LISTINGS.find((l) => l.id === id) || MOCK_FEATURED_LISTINGS[0];
            setListing(found);
          }
        })
        .catch(() => {
          const found = MOCK_FEATURED_LISTINGS.find((l) => l.id === id) || MOCK_FEATURED_LISTINGS[0];
          setListing(found);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading || !listing) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-margin py-8 flex flex-col gap-6">
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="rectangular" height={400} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton variant="rectangular" height={200} className="md:col-span-2" />
          <Skeleton variant="rectangular" height={200} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin pt-4 pb-16 flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <DetailsHeader listing={listing} />

      {/* Photo Gallery Grid */}
      <PhotoGallery images={listing.property?.images || []} title={listing.title} />

      {/* Main Content Layout (8 Cols Details + 4 Cols Sticky AI Match) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Description */}
          <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-left">
            <h3 className="font-headline-sm text-primary mb-3">About This Student Flat</h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {listing.description ||
                listing.property?.description ||
                'Fully furnished student apartment tailored for university students. Features quiet dedicated study rooms, high-speed optic fiber connectivity, and rapid walking access to campus lecture halls.'}
            </p>
          </div>

          {/* Pricing & Deposit Breakdown */}
          <PricingBreakdown listing={listing} />

          {/* Walking Distance & Gate Proximity */}
          <WalkingDistanceMap property={listing.property} />

          {/* Amenities & Study Features */}
          <AmenitiesSection amenities={listing.property?.amenities} />
        </div>

        {/* Right Column (4 cols) - Sticky AI Match & Actions */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
          <AIMatchCard
            score={listing.matchScore || 98}
            explanation={listing.matchExplanation}
            onScheduleTour={() => setIsScheduleModalOpen(true)}
            onMessageOwner={() => setIsMessageModalOpen(true)}
          />

          {/* Safety Checklist Card */}
          <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-left flex flex-col gap-3">
            <h4 className="font-label-lg text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified_user
              </span>
              <span>Maskan Safety Guarantee</span>
            </h4>
            <ul className="text-body-sm text-on-surface-variant flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <span className="text-tertiary font-bold">✓</span>
                <span>Ownership title verified with Egyptian Real Estate registry.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tertiary font-bold">✓</span>
                <span>Standardized fair student lease agreement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tertiary font-bold">✓</span>
                <span>Free lease contract AI analysis included.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ScheduleViewingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        listing={listing}
      />

      <DirectMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        listing={listing}
      />
    </div>
  );
};
