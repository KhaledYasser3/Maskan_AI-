import React, { useState } from 'react';
import { OwnerListingsManager } from './OwnerListingsManager';
import { AddPropertyWizard } from './AddPropertyWizard';
import { SubmitVerificationModal } from './SubmitVerificationModal';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';
import { Property, Listing } from '../../types/listings.types';

export const OwnerDashboardPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>(MOCK_FEATURED_LISTINGS);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPropertyForVerify, setSelectedPropertyForVerify] = useState<Property | null>(null);

  const handleAddSuccess = (newPropData: any) => {
    const newListing: Listing = {
      id: `list_${Date.now()}`,
      propertyId: newPropData.id,
      title: newPropData.title,
      rentAmount: newPropData.rentAmount,
      depositAmount: newPropData.depositAmount,
      minStudents: newPropData.maxStudents,
      maxStudents: newPropData.maxStudents,
      studentSharePrice: Math.round(newPropData.rentAmount / newPropData.maxStudents),
      availableFrom: '2026-10-01',
      isAvailable: true,
      matchScore: 95,
      createdAt: new Date().toISOString(),
      property: {
        ...newPropData,
        ownerId: 'owner1',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            isPrimary: true,
          },
        ],
        walkingDistances: [{ destination: 'Campus Gate 4', minutes: 10 }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    setListings((prev) => [newListing, ...prev]);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin py-8 flex flex-col gap-8 text-left animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Owner Management Portal
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            Landlord Dashboard
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Manage your student properties, track viewing requests, and verify titles with Maskan supervisors.
          </p>
        </div>

        {/* Quick metrics */}
        <div className="flex items-center gap-4 bg-surface-container-lowest px-5 py-3 rounded-xl border border-outline-variant/20 shadow-sm">
          <div className="text-center">
            <span className="font-headline-sm text-primary font-bold">{listings.length}</span>
            <span className="text-[11px] text-on-surface-variant block">Listings</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/30" />
          <div className="text-center">
            <span className="font-headline-sm text-secondary font-bold">4</span>
            <span className="text-[11px] text-on-surface-variant block">Tour Requests</span>
          </div>
        </div>
      </div>

      {/* Listings Manager */}
      <OwnerListingsManager
        listings={listings}
        onOpenAddWizard={() => setIsWizardOpen(true)}
        onSubmitVerification={(prop) => setSelectedPropertyForVerify(prop)}
      />

      {/* Add Wizard Modal */}
      <AddPropertyWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {/* Verification Submit Modal */}
      {selectedPropertyForVerify && (
        <SubmitVerificationModal
          isOpen={!!selectedPropertyForVerify}
          onClose={() => setSelectedPropertyForVerify(null)}
          property={selectedPropertyForVerify}
          onSuccess={() => {
            setListings((prev) =>
              prev.map((l) =>
                l.property?.id === selectedPropertyForVerify.id
                  ? {
                      ...l,
                      property: {
                        ...l.property,
                        verificationStatus: 'PENDING',
                      },
                    }
                  : l
              )
            );
          }}
        />
      )}
    </div>
  );
};
