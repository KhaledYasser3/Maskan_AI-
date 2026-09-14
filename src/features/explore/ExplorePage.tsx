import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Listing, ListingFilterParams } from '../../types/listings.types';
import { listingsApi } from '../../api/listings.api';
import { aiApi } from '../../api/ai.api';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';
import { FilterBar } from './FilterBar';
import { AdvancedFilterDrawer } from './AdvancedFilterDrawer';
import { ListingGrid } from './ListingGrid';
import { useToast } from '../../context/ToastContext';
import { useFavorites } from '../../context/FavoritesContext';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteListings } = useFavorites();
  const { info } = useToast();

  const [filters, setFilters] = useState<ListingFilterParams>({
    maxRent: 6000,
    maxWalkingMinutes: 15,
    minStudents: 3,
    sort: 'newest',
  });

  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);

  const isSavedView = searchParams.get('saved') === 'true';
  const promptParam = searchParams.get('prompt');

  // Load listings based on filters
  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isSavedView) {
        setListings(favoriteListings.length > 0 ? favoriteListings : MOCK_FEATURED_LISTINGS.slice(0, 2));
        setIsLoading(false);
        return;
      }

      const res = await listingsApi.getListings(filters);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setListings(res.data);
      } else {
        // Apply client-side filtering on mock data for responsive feel
        let filtered = [...MOCK_FEATURED_LISTINGS];
        if (filters.maxRent) {
          filtered = filtered.filter((l) => l.rentAmount <= (filters.maxRent || 99999));
        }
        if (filters.bedrooms) {
          filtered = filtered.filter((l) => l.property?.totalBedrooms === filters.bedrooms);
        }
        if (filters.furnished !== undefined) {
          filtered = filtered.filter((l) => l.property?.isFurnished === filters.furnished);
        }
        setListings(filtered);
      }
    } catch {
      // Fallback gracefully to mock data
      setListings(MOCK_FEATURED_LISTINGS);
    } finally {
      setIsLoading(false);
    }
  }, [filters, isSavedView, favoriteListings]);

  // Handle Natural Language Prompt AI Extraction
  const handleNaturalPrompt = useCallback(
    async (prompt: string) => {
      setIsAiProcessing(true);
      info('AI is analyzing your search preferences...', 'AI Smart Filter');
      try {
        const res = await aiApi.extractRequirements({ text: prompt });
        if (res.data) {
          const criteria = res.data;
          setFilters((prev) => ({
            ...prev,
            maxRent: criteria.maxRent || prev.maxRent,
            minStudents: criteria.minStudents || prev.minStudents,
            maxWalkingMinutes: criteria.maxWalkingMinutes || prev.maxWalkingMinutes,
            bedrooms: criteria.bedrooms || prev.bedrooms,
            furnished: criteria.furnished !== undefined ? criteria.furnished : prev.furnished,
            amenities: criteria.amenities || prev.amenities,
          }));
        }
      } catch {
        // If AI gateway times out or fails, fallback to simple parsing
        if (prompt.includes('balcony')) {
          setFilters((prev) => ({ ...prev, amenities: [...(prev.amenities || []), 'Balcony'] }));
        }
        if (prompt.includes('5000') || prompt.includes('5k')) {
          setFilters((prev) => ({ ...prev, maxRent: 5000 }));
        }
      } finally {
        setIsAiProcessing(false);
      }
    },
    [info]
  );

  useEffect(() => {
    if (promptParam) {
      handleNaturalPrompt(promptParam);
    }
  }, [promptParam, handleNaturalPrompt]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleFilterChange = (newFilters: Partial<ListingFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      maxRent: 6000,
      maxWalkingMinutes: 15,
      minStudents: 3,
      sort: 'newest',
    });
    setSearchParams({});
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin py-6 flex flex-col gap-6 text-left animate-fade-in">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="font-label-sm text-secondary uppercase tracking-widest font-bold">
            {isSavedView ? 'Your Shortlist' : 'Cairo University & Greater Cairo'}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            {isSavedView ? 'Saved Student Flats' : 'Explore Verified Student Flats'}
          </h1>
        </div>
        <span className="font-body-md text-on-surface-variant">
          Showing <strong className="text-primary">{listings.length}</strong> available residences
        </span>
      </div>

      {/* AI Processing Status Indicator */}
      {isAiProcessing && (
        <div className="p-3 bg-secondary-fixed text-on-secondary-fixed rounded-xl flex items-center gap-3 animate-pulse">
          <span className="material-symbols-outlined text-secondary material-symbols-filled">
            psychology
          </span>
          <span className="font-label-md">
            AI is extracting constraints and finding best matching Cairo flats...
          </span>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenAdvanced={() => setIsAdvancedOpen(true)}
        onAskAI={handleNaturalPrompt}
      />

      {/* Results Grid */}
      <ListingGrid
        listings={listings}
        isLoading={isLoading}
        onResetFilters={handleResetFilters}
      />

      {/* Advanced Filter Modal Drawer */}
      <AdvancedFilterDrawer
        isOpen={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        filters={filters}
        onApply={handleFilterChange}
      />
    </div>
  );
};
