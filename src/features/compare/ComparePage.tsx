import React, { useEffect } from 'react';
import { useCompare } from '../../context/CompareContext';
import { useFavorites } from '../../context/FavoritesContext';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';
import { CohortSyncBanner } from './CohortSyncBanner';
import { AIVerdictBanner } from './AIVerdictBanner';
import { ComparisonMatrixTable } from './ComparisonMatrixTable';
import { EmptyState } from '../../components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, addToCompare } = useCompare();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // If compare list is empty, prefill with 2 mock listings for rich demo experience
    if (compareList.length === 0) {
      MOCK_FEATURED_LISTINGS.slice(0, 3).forEach((l) => addToCompare(l));
    }
  }, [compareList.length, addToCompare]);

  const displayList = compareList.length > 0 ? compareList : MOCK_FEATURED_LISTINGS.slice(0, 3);

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Sub-Header Status Strip */}
      <CohortSyncBanner savedCount={favorites.length || 4} />

      {/* Page Content Container */}
      <div className="max-w-[1200px] w-full mx-auto px-margin py-space-lg flex flex-col gap-space-xl">
        {displayList.length > 0 ? (
          <>
            {/* Title & Executive Cohort Verdict */}
            <AIVerdictBanner />

            {/* Comparison Matrix Table */}
            <ComparisonMatrixTable
              listings={displayList}
              onRemove={removeFromCompare}
            />
          </>
        ) : (
          <EmptyState
            icon="compare_arrows"
            title="Your comparison matrix is empty"
            description="Add at least 2 properties from the explore page to compare rent, amenities, and walking distances side-by-side."
            actionText="Explore Student Flats"
            onAction={() => navigate('/explore')}
          />
        )}
      </div>
    </div>
  );
};
