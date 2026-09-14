import React, { useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { CampusNeighborhoods } from './CampusNeighborhoods';
import { FeaturedListings } from './FeaturedListings';
import { ValueProposition } from './ValueProposition';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <HeroSection />
      <CampusNeighborhoods />
      <FeaturedListings />
      <ValueProposition />
    </div>
  );
};
