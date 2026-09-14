import React from 'react';
import { Listing } from '../../types/listings.types';
import { formatCurrency } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';

export const PricingBreakdown: React.FC<{ listing: Listing }> = ({ listing }) => {
  const students = listing.minStudents || 3;
  const sharePrice =
    listing.studentSharePrice || Math.round(listing.rentAmount / students);
  const depositPerStudent = Math.round(listing.depositAmount / students);

  return (
    <Card elevation="level-1" className="p-6 bg-surface-container-lowest text-left flex flex-col gap-4">
      <h3 className="font-headline-sm text-primary">Financial & Rent Breakdown</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Per Student Monthly */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
          <span className="text-body-sm text-on-surface-variant font-medium">
            Per Student Monthly Rent
          </span>
          <span className="font-headline-lg text-secondary font-bold mt-1">
            {formatCurrency(sharePrice)}
          </span>
          <span className="text-xs text-on-surface-variant/70 mt-1">
            {formatCurrency(listing.rentAmount)} / {students} occupants
          </span>
        </div>

        {/* Security Deposit Share */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
          <span className="text-body-sm text-on-surface-variant font-medium">
            Refundable Security Deposit
          </span>
          <span className="font-headline-lg text-primary font-bold mt-1">
            {formatCurrency(depositPerStudent)}
          </span>
          <span className="text-xs text-on-surface-variant/70 mt-1">
            Returned upon lease completion
          </span>
        </div>

        {/* Utilities & Maintenance */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
          <span className="text-body-sm text-on-surface-variant font-medium">
            Estimated Monthly Utilities
          </span>
          <span className="font-headline-lg text-primary font-bold mt-1">
            ~EGP 250
          </span>
          <span className="text-xs text-on-surface-variant/70 mt-1">
            Electricity, Water & Fiber Wi-Fi
          </span>
        </div>
      </div>
    </Card>
  );
};
