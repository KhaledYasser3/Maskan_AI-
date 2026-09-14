import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../../types/listings.types';
import { formatCurrency } from '../../utils/formatters';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export interface DetailsHeaderProps {
  listing: Listing;
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({ listing }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { success } = useToast();
  const saved = isFavorite(listing.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Property link copied to clipboard!', 'Share');
  };

  const sharePrice =
    listing.studentSharePrice ||
    Math.round(listing.rentAmount / (listing.minStudents || 3));

  return (
    <div className="flex flex-col gap-space-sm text-left">
      {/* Top Breadcrumb & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <nav className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md overflow-x-auto py-1">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <Link to="/explore" className="hover:text-primary transition-colors">
            {listing.property?.universityArea || 'Cairo University'}
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <Link
            to={`/explore?neighborhood=${listing.property?.neighborhood}`}
            className="hover:text-primary transition-colors"
          >
            {listing.property?.neighborhood || 'Dokki'}
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
            {listing.title}
          </span>
        </nav>

        <div className="flex items-center gap-space-sm self-start md:self-auto">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Share</span>
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(listing)}
            className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md border border-outline-variant/30 group"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-transform group-hover:scale-110 ${
                saved ? 'text-secondary material-symbols-filled' : 'text-secondary'
              }`}
            >
              favorite
            </span>
            <span>{saved ? 'Saved' : 'Save Flat'}</span>
          </button>
        </div>
      </div>

      {/* Title & Verification Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-space-sm pt-2">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center flex-wrap gap-space-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[14px] material-symbols-filled">
                verified
              </span>
              Student Verified Residence
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[14px] text-secondary">bolt</span>
              {listing.matchScore || 98}% AI Match Score
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            {listing.title}
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary">distance</span>
            <span>
              {listing.property?.address || '34 El-Messaha Square, Dokki, Giza'} •{' '}
              {listing.property?.walkingDistances?.[0]?.minutes || 11} min pedestrian walk to CU Gate 4
            </span>
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end bg-surface-container-low sm:bg-transparent p-3 sm:p-0 rounded-xl border border-outline-variant/30 sm:border-0">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Per Student Share
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-lg text-headline-lg text-secondary font-bold">
              {formatCurrency(sharePrice)}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/ month</span>
          </div>
          <span className="text-body-sm text-on-surface-variant/70 text-xs">
            Total rent: {formatCurrency(listing.rentAmount)} (split by {listing.minStudents || 3})
          </span>
        </div>
      </div>
    </div>
  );
};
