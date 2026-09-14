import React from 'react';
import { Listing } from '../../types/listings.types';
import { ListingCard } from './ListingCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';

export interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
  onResetFilters?: () => void;
}

export const ListingGrid: React.FC<ListingGridProps> = ({
  listings,
  isLoading,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden p-0 flex flex-col gap-3"
          >
            <Skeleton variant="rectangular" height={200} />
            <div className="p-4 flex flex-col gap-2.5">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        icon="search_off"
        title="No flats match your exact filters"
        description="Try relaxing walking distance limits, increasing the budget threshold, or clearing specific amenities."
        actionText="Reset All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};
