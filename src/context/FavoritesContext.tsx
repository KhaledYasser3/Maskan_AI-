import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { interactionsApi } from '../api/interactions.api';
import { Listing } from '../types/listings.types';

interface FavoritesContextType {
  favorites: string[]; // Listing IDs
  favoriteListings: Listing[];
  isFavorite: (listingId: string) => boolean;
  toggleFavorite: (listing: Listing) => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('maskan_saved_flats');
    return saved ? JSON.parse(saved) : [];
  });
  const [favoriteListings, setFavoriteListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync with API when logged in
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      interactionsApi
        .getFavorites()
        .then((res) => {
          if (res.data) {
            const ids = res.data.map((f) => f.listingId);
            setFavorites(ids);
            const listings = res.data.map((f) => f.listing).filter(Boolean) as Listing[];
            setFavoriteListings(listings);
          }
        })
        .catch(() => {
          // fallback to localStorage
        })
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('maskan_saved_flats', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (listingId: string) => favorites.includes(listingId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (listing: Listing) => {
      const exists = favorites.includes(listing.id);
      if (exists) {
        setFavorites((prev) => prev.filter((id) => id !== listing.id));
        setFavoriteListings((prev) => prev.filter((l) => l.id !== listing.id));
        if (isAuthenticated) {
          try {
            await interactionsApi.removeFavorite(listing.id);
          } catch {
            // silent catch
          }
        }
      } else {
        setFavorites((prev) => [...prev, listing.id]);
        setFavoriteListings((prev) => [...prev, listing]);
        if (isAuthenticated) {
          try {
            await interactionsApi.addFavorite(listing.id);
          } catch {
            // silent catch
          }
        }
      }
    },
    [favorites, isAuthenticated]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteListings,
        isFavorite,
        toggleFavorite,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
