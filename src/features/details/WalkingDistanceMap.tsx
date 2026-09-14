import React from 'react';
import { Property } from '../../types/listings.types';
import { Card } from '../../components/ui/Card';

export const WalkingDistanceMap: React.FC<{ property?: Property }> = ({ property }) => {
  const distances = property?.walkingDistances || [
    { destination: 'Cairo University Gate 4 (Main Campus)', minutes: 11 },
    { destination: 'Faculty of Engineering (Dokki Campus)', minutes: 9 },
    { destination: 'Dokki Metro Station (Line 2)', minutes: 6 },
    { destination: 'El-Buhouth Metro Station', minutes: 14 },
  ];

  return (
    <Card elevation="level-1" className="p-6 bg-surface-container-lowest text-left flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-primary">Pedestrian Route & Gate Proximity</h3>
        <span className="text-label-sm font-semibold text-secondary bg-secondary-fixed/50 px-2.5 py-1 rounded-full">
          Verified Footpaths
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {distances.map((d, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">directions_walk</span>
              </div>
              <span className="font-label-md text-primary">{d.destination}</span>
            </div>
            <div className="font-headline-sm text-[16px] font-bold text-secondary">
              {d.minutes} mins
            </div>
          </div>
        ))}
      </div>

      <p className="text-body-sm text-on-surface-variant/75 pt-2">
        <span className="font-semibold text-primary">Student Tip:</span> Dokki Metro is within 6 minutes, allowing quick 10-min transit to Downtown Cairo and Ain Shams faculties.
      </p>
    </Card>
  );
};
