import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../../types/listings.types';
import { formatCurrency } from '../../utils/formatters';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';
import { Card } from '../../components/ui/Card';

export interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare } = useCompare();

  const saved = isFavorite(listing.id);
  const compared = isInCompare(listing.id);

  const primaryImage =
    listing.property?.images?.find((img) => img.isPrimary)?.url ||
    listing.property?.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

  const walkInfo = listing.property?.walkingDistances?.[0] || {
    destination: 'Cairo University Gate 4',
    minutes: 11,
  };

  const sharePrice =
    listing.studentSharePrice ||
    Math.round(listing.rentAmount / (listing.minStudents || 3));

  return (
    <Card
      elevation="level-1"
      className="group flex flex-col bg-surface-container-lowest border border-outline-variant/40 rounded-xl overflow-hidden hover:shadow-warm-md hover:border-outline-variant transition-all text-left"
    >
      {/* 16:10 Photo Wrapper */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
        <Link to={`/properties/${listing.id}`}>
          <img
            src={primaryImage}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {listing.property?.verificationStatus === 'APPROVED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed/90 backdrop-blur-md text-on-tertiary-fixed font-label-sm text-[11px] font-bold shadow-sm">
              <span className="material-symbols-outlined text-[13px] material-symbols-filled">
                verified
              </span>
              Verified Residence
            </span>
          )}

          {listing.matchScore && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed/90 backdrop-blur-md text-on-secondary-fixed font-label-sm text-[11px] font-bold shadow-sm">
              <span className="material-symbols-outlined text-[13px] text-secondary">bolt</span>
              {listing.matchScore}% Match
            </span>
          )}
        </div>

        {/* Top Right Save Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(listing);
          }}
          aria-label="Save to favorites"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-white shadow-sm transition-all active:scale-90"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              saved ? 'text-secondary material-symbols-filled' : ''
            }`}
          >
            favorite
          </span>
        </button>

        {/* Per-Student Share Price Overlay Tag */}
        <div className="absolute bottom-3 left-3 bg-primary/85 backdrop-blur-md text-on-primary px-3 py-1.5 rounded-lg text-left shadow-sm">
          <span className="text-[10px] uppercase font-bold text-on-primary-container tracking-wider block leading-none">
            Per Student Share
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-headline-sm text-[17px] font-bold text-white">
              {formatCurrency(sharePrice)}
            </span>
            <span className="text-[11px] text-on-primary-container">/ mo</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Distance & Campus Destination */}
          <div className="flex items-center gap-1.5 text-secondary font-label-sm text-body-sm mb-1.5">
            <span className="material-symbols-outlined text-[16px]">directions_walk</span>
            <span className="font-semibold">
              {walkInfo.minutes} min walk to {walkInfo.destination}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${listing.id}`}>
            <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </Link>

          {/* Specs line */}
          <div className="flex items-center gap-3 text-body-sm text-on-surface-variant mt-2 pb-3 border-b border-outline-variant/20">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-outline">bed</span>
              {listing.property?.totalBedrooms || 3} Beds
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-outline">bathtub</span>
              {listing.property?.totalBathrooms || 1} Bath
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-outline">group</span>
              {listing.minStudents || 3} Students
            </span>
          </div>
        </div>

        {/* Footer info & Compare toggle */}
        <div className="pt-3 flex items-center justify-between">
          <div className="text-body-sm text-on-surface-variant/80">
            Total: <span className="font-semibold text-primary">{formatCurrency(listing.rentAmount)}</span>/mo
          </div>

          <button
            type="button"
            onClick={() => toggleCompare(listing)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-label-sm font-semibold transition-all ${
              compared
                ? 'bg-secondary text-on-secondary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {compared ? 'check' : 'compare_arrows'}
            </span>
            <span>{compared ? 'In Compare' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
