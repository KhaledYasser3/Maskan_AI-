import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Listing } from '../types/listings.types';

interface CompareContextType {
  compareList: Listing[];
  compareIds: string[];
  addToCompare: (listing: Listing) => boolean;
  removeFromCompare: (listingId: string) => void;
  toggleCompare: (listing: Listing) => void;
  isInCompare: (listingId: string) => boolean;
  clearCompare: () => void;
  maxSlots: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_SLOTS = 4;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('maskan_compare_flats');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('maskan_compare_flats', JSON.stringify(compareList));
  }, [compareList]);

  const compareIds = compareList.map((item) => item.id);

  const isInCompare = useCallback(
    (listingId: string) => compareList.some((item) => item.id === listingId),
    [compareList]
  );

  const addToCompare = useCallback(
    (listing: Listing): boolean => {
      if (compareList.length >= MAX_COMPARE_SLOTS) {
        return false;
      }
      if (!isInCompare(listing.id)) {
        setCompareList((prev) => [...prev, listing]);
        return true;
      }
      return true;
    },
    [compareList, isInCompare]
  );

  const removeFromCompare = useCallback((listingId: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== listingId));
  }, []);

  const toggleCompare = useCallback(
    (listing: Listing) => {
      if (isInCompare(listing.id)) {
        removeFromCompare(listing.id);
      } else {
        addToCompare(listing);
      }
    },
    [isInCompare, removeFromCompare, addToCompare]
  );

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        compareIds,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        maxSlots: MAX_COMPARE_SLOTS,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
