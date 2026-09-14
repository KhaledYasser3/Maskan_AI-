import React from 'react';
import { ListingFilterParams } from '../../types/listings.types';

export interface FilterBarProps {
  filters: ListingFilterParams;
  onFilterChange: (newFilters: Partial<ListingFilterParams>) => void;
  onOpenAdvanced: () => void;
  onAskAI: (prompt: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onOpenAdvanced,
  onAskAI,
}) => {
  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl shadow-sm border border-outline-variant/30 text-left">
      {/* Active Context Bar & Ask AI Prompt Chip */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex flex-wrap items-center gap-space-xs">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1.5 rounded-full shadow-sm text-on-surface text-label-md font-label-md border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              verified_user
            </span>
            <span>
              Matches for:{' '}
              <strong className="text-primary font-headline-sm text-label-md">
                {filters.minStudents || 3} Students
              </strong>{' '}
              •{' '}
              <strong className="text-primary font-headline-sm text-label-md">
                ≤ EGP {filters.maxRent ? filters.maxRent.toLocaleString() : '6,000'}/mo
              </strong>{' '}
              •{' '}
              <strong className="text-primary font-headline-sm text-label-md">
                ≤ {filters.maxWalkingMinutes || 15} min walk
              </strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenAdvanced}
            className="text-secondary hover:text-on-secondary-container text-label-sm font-label-sm transition-colors flex items-center gap-0.5 ml-1"
          >
            <span>Edit Criteria</span>
            <span className="material-symbols-outlined text-[14px]">edit</span>
          </button>
        </div>

        {/* Conversational Prompt Chip */}
        <div className="relative flex items-center bg-surface-container-lowest rounded-full px-space-md py-1.5 shadow-sm text-on-surface-variant text-label-md font-label-md border border-outline-variant/20">
          <span className="material-symbols-outlined text-secondary text-[18px] mr-1.5 material-symbols-filled">
            auto_awesome
          </span>
          <span className="text-on-surface font-semibold">Ask AI:</span>
          <div className="flex items-center gap-1.5 ml-2">
            <button
              type="button"
              onClick={() => onAskAI('Show flats with balcony and elevator')}
              className="bg-surface-container px-2.5 py-0.5 rounded-full hover:bg-surface-container-high transition-colors text-on-surface text-label-sm font-label-sm"
            >
              “Show flats with balcony”
            </button>
            <button
              type="button"
              onClick={() => onAskAI('Under 5000 EGP near CU Gate 4')}
              className="bg-surface-container px-2.5 py-0.5 rounded-full hover:bg-surface-container-high transition-colors text-on-surface text-label-sm font-label-sm hidden sm:inline-block"
            >
              “Under 5k”
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-outline-variant/20">
        <div className="flex flex-wrap items-center gap-space-xs">
          {/* Price Range Dropdown Trigger */}
          <button
            type="button"
            onClick={onOpenAdvanced}
            className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-2 rounded-lg text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors border border-outline-variant/30"
          >
            <span className="text-on-surface-variant font-body-sm text-body-sm">Price:</span>
            <span>≤ EGP {filters.maxRent ? filters.maxRent.toLocaleString() : '6,000'}</span>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              expand_more
            </span>
          </button>

          {/* Walk Distance Dropdown Trigger */}
          <button
            type="button"
            onClick={onOpenAdvanced}
            className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-2 rounded-lg text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors border border-outline-variant/30"
          >
            <span className="text-on-surface-variant font-body-sm text-body-sm">Walk:</span>
            <span>≤ {filters.maxWalkingMinutes || 15} mins</span>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              expand_more
            </span>
          </button>

          {/* Bedrooms Quick Chip */}
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                bedrooms: filters.bedrooms === 3 ? undefined : 3,
              })
            }
            className={`inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg font-label-md text-label-md shadow-sm transition-all ${
              filters.bedrooms === 3
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-outline-variant/30'
            }`}
          >
            <span>3 Bedrooms</span>
            {filters.bedrooms === 3 && (
              <span className="material-symbols-outlined text-[16px]">check</span>
            )}
          </button>

          {/* Furnished Quick Chip */}
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                furnished: filters.furnished ? undefined : true,
              })
            }
            className={`inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg font-label-md text-label-md shadow-sm transition-all ${
              filters.furnished
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-outline-variant/30'
            }`}
          >
            <span>Furnished</span>
            <span className="material-symbols-outlined text-secondary text-[16px]">chair</span>
          </button>

          {/* All Filters Button */}
          <button
            type="button"
            onClick={onOpenAdvanced}
            className="inline-flex items-center gap-1 bg-surface-container-high text-primary px-space-md py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>All Filters</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-body-sm text-on-surface-variant">Sort by:</span>
          <select
            value={filters.sort || 'newest'}
            onChange={(e) => onFilterChange({ sort: e.target.value as any })}
            className="bg-surface-container-lowest text-on-surface font-label-md text-label-md px-3 py-1.5 rounded-lg border border-outline-variant/30 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest Listed</option>
            <option value="rent_asc">Rent: Low to High</option>
            <option value="rent_desc">Rent: High to Low</option>
            <option value="walking_asc">Walking: Shortest Walk</option>
          </select>
        </div>
      </div>
    </div>
  );
};
