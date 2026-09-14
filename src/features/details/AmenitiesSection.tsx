import React from 'react';
import { Card } from '../../components/ui/Card';

export const AmenitiesSection: React.FC<{ amenities?: string[] }> = ({
  amenities = [
    'High-Speed Fiber Wi-Fi (100 Mbps)',
    'Air Conditioning (Split Inverter)',
    '3 Dedicated Study Desks with Ergonomic Chairs',
    'Private Balcony overlooking quiet courtyard',
    'Modern Elevator (24/7 Service)',
    'Natural Gas & Instant Water Heater',
    'Automatic Washing Machine',
    'Full Kitchen with Refrigerator & Microwave',
  ],
}) => {
  return (
    <Card elevation="level-1" className="p-6 bg-surface-container-lowest text-left flex flex-col gap-4">
      <h3 className="font-headline-sm text-primary">Student Amenities & Study Amenities</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-body-md text-on-surface">
            <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[14px] material-symbols-filled">
                check
              </span>
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
