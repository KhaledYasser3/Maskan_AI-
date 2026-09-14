import React from 'react';
import { Property, Listing } from '../../types/listings.types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatters';

export interface OwnerListingsManagerProps {
  listings: Listing[];
  onOpenAddWizard: () => void;
  onSubmitVerification: (property: Property) => void;
}

export const OwnerListingsManager: React.FC<OwnerListingsManagerProps> = ({
  listings,
  onOpenAddWizard,
  onSubmitVerification,
}) => {
  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-md text-primary font-bold">
            My Managed Properties ({listings.length})
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Manage your student listings and submit ownership verification papers.
          </p>
        </div>

        <Button
          variant="accent"
          onClick={onOpenAddWizard}
          leftIcon={<span className="material-symbols-outlined text-[20px]">add_home</span>}
        >
          Add New Property
        </Button>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => {
          const isVerified = l.property?.verificationStatus === 'APPROVED';
          const isPending = l.property?.verificationStatus === 'PENDING';

          return (
            <Card
              key={l.id}
              elevation="level-1"
              className="p-5 bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-outline-variant transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-container">
                  <img
                    src={
                      l.property?.images?.[0]?.url ||
                      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={l.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Verified
                      </span>
                    ) : isPending ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#92400e] shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        Pending Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-error-container text-on-error-container shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        Unverified
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-secondary">
                    {l.property?.neighborhood || 'Dokki'} • {l.property?.universityArea}
                  </span>
                  <h3 className="font-headline-sm text-primary text-base font-bold line-clamp-1 mt-0.5">
                    {l.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant font-semibold mt-1">
                    {formatCurrency(l.rentAmount)} / mo
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
                {!isVerified && l.property && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => onSubmitVerification(l.property!)}
                    leftIcon={
                      <span className="material-symbols-outlined text-[16px]">
                        upload_file
                      </span>
                    }
                  >
                    Submit Ownership Proof
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    Edit Flat
                  </Button>
                  <Button variant="ghost" size="sm" className="text-error hover:bg-error-container/30">
                    Deactivate
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
