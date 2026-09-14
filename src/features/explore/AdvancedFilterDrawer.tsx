import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { ListingFilterParams } from '../../types/listings.types';

export interface AdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ListingFilterParams;
  onApply: (filters: Partial<ListingFilterParams>) => void;
}

export const AdvancedFilterDrawer: React.FC<AdvancedFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState<ListingFilterParams>(filters);

  const amenitiesList = [
    'Fiber Wi-Fi',
    'Air Conditioning',
    'Study Desks',
    'Balcony',
    'Elevator',
    'Natural Gas',
    'Washing Machine',
    'Full Kitchen',
    'Quiet Street',
  ];

  const toggleAmenity = (amenity: string) => {
    const current = localFilters.amenities || [];
    const exists = current.includes(amenity);
    const updated = exists
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    setLocalFilters({ ...localFilters, amenities: updated });
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const empty: ListingFilterParams = {
      maxRent: 6000,
      maxWalkingMinutes: 15,
      minStudents: 3,
      bedrooms: undefined,
      furnished: undefined,
      amenities: [],
    };
    setLocalFilters(empty);
    onApply(empty);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Student Flats"
      description="Refine by budget, proximity to campus gates, and study requirements."
      maxWidth="lg"
    >
      <div className="flex flex-col gap-6 text-left py-2">
        {/* Maximum Rent Per Month */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-label-md text-primary">Maximum Rent (Total/mo)</label>
            <span className="font-headline-sm text-secondary font-bold">
              EGP {localFilters.maxRent ? localFilters.maxRent.toLocaleString() : '6,000'}
            </span>
          </div>
          <input
            type="range"
            min={2000}
            max={15000}
            step={500}
            value={localFilters.maxRent || 6000}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, maxRent: Number(e.target.value) })
            }
            className="w-full accent-secondary cursor-pointer"
          />
          <div className="flex justify-between text-body-sm text-on-surface-variant/70 mt-1">
            <span>EGP 2,000</span>
            <span>EGP 15,000</span>
          </div>
        </div>

        {/* Max Walk Time to Campus */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-label-md text-primary">Max Pedestrian Walk Time</label>
            <span className="font-headline-sm text-secondary font-bold">
              {localFilters.maxWalkingMinutes || 15} mins
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={localFilters.maxWalkingMinutes || 15}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                maxWalkingMinutes: Number(e.target.value),
              })
            }
            className="w-full accent-secondary cursor-pointer"
          />
          <div className="flex justify-between text-body-sm text-on-surface-variant/70 mt-1">
            <span>5 mins (Gate adjacent)</span>
            <span>30 mins</span>
          </div>
        </div>

        {/* Bedrooms & Occupants */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-label-md text-primary block mb-2">Bedrooms</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      bedrooms: localFilters.bedrooms === num ? undefined : num,
                    })
                  }
                  className={`flex-1 py-2 rounded-lg font-label-md text-label-md border transition-all ${
                    localFilters.bedrooms === num
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-label-md text-primary block mb-2">Furnishing</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setLocalFilters({
                    ...localFilters,
                    furnished: localFilters.furnished === true ? undefined : true,
                  })
                }
                className={`flex-1 py-2 rounded-lg font-label-md text-label-md border transition-all ${
                  localFilters.furnished === true
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                Furnished
              </button>
              <button
                type="button"
                onClick={() =>
                  setLocalFilters({
                    ...localFilters,
                    furnished: localFilters.furnished === false ? undefined : false,
                  })
                }
                className={`flex-1 py-2 rounded-lg font-label-md text-label-md border transition-all ${
                  localFilters.furnished === false
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                Any
              </button>
            </div>
          </div>
        </div>

        {/* Required Amenities */}
        <div>
          <label className="font-label-md text-primary block mb-2">
            Essential Student Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => {
              const active = (localFilters.amenities || []).includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-all border ${
                    active
                      ? 'bg-secondary text-on-secondary border-secondary'
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 gap-3">
          <Button variant="ghost" onClick={handleReset}>
            Reset All
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
