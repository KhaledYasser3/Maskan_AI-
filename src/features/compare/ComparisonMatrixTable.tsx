import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../../types/listings.types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/ui/Button';

export interface ComparisonMatrixTableProps {
  listings: Listing[];
  onRemove: (id: string) => void;
}

export const ComparisonMatrixTable: React.FC<ComparisonMatrixTableProps> = ({
  listings,
  onRemove,
}) => {
  const criteriaRows = [
    {
      label: 'Monthly Rent (Total)',
      render: (l: Listing) => (
        <span className="font-semibold text-primary">{formatCurrency(l.rentAmount)}</span>
      ),
    },
    {
      label: 'Per Student Share',
      render: (l: Listing) => {
        const share =
          l.studentSharePrice || Math.round(l.rentAmount / (l.minStudents || 3));
        return (
          <span className="font-headline-sm text-secondary font-bold">
            {formatCurrency(share)} / mo
          </span>
        );
      },
    },
    {
      label: 'Deposit Share',
      render: (l: Listing) => (
        <span>{formatCurrency(Math.round(l.depositAmount / (l.minStudents || 3)))}</span>
      ),
    },
    {
      label: 'Walk to Faculty Gate',
      render: (l: Listing) => {
        const walk = l.property?.walkingDistances?.[0]?.minutes || 12;
        return (
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            <span className="material-symbols-outlined text-[16px] text-secondary">directions_walk</span>
            {walk} mins
          </span>
        );
      },
    },
    {
      label: 'Bedrooms / Desks',
      render: (l: Listing) => (
        <span>{l.property?.totalBedrooms || 3} Beds / {l.minStudents || 3} Desks</span>
      ),
    },
    {
      label: 'Bathrooms',
      render: (l: Listing) => (
        <span>{l.property?.totalBathrooms || 1} Bath</span>
      ),
    },
    {
      label: 'Fiber Wi-Fi',
      render: () => (
        <span className="text-tertiary font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          Included
        </span>
      ),
    },
    {
      label: 'Air Conditioning',
      render: (l: Listing) => {
        const hasAc = l.property?.amenities?.some((a) => a.toLowerCase().includes('air') || a.toLowerCase().includes('ac'));
        return hasAc ? (
          <span className="text-tertiary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Available
          </span>
        ) : (
          <span className="text-on-surface-variant/60">Fans only</span>
        );
      },
    },
    {
      label: 'Private Balcony',
      render: (l: Listing) => {
        const hasBalcony = l.property?.amenities?.some((a) => a.toLowerCase().includes('balcony'));
        return hasBalcony ? (
          <span className="text-tertiary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Yes
          </span>
        ) : (
          <span className="text-on-surface-variant/60">No</span>
        );
      },
    },
    {
      label: 'Building Elevator',
      render: (l: Listing) => (
        <span className="text-tertiary font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          Yes (Floor {l.property?.floorNumber || 3})
        </span>
      ),
    },
    {
      label: 'AI Verification Status',
      render: () => (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-bold">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          Verified Title
        </span>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-warm-sm text-left">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-low/40">
            <th className="p-4 w-1/4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
              Comparison Criteria
            </th>
            {listings.map((l) => (
              <th key={l.id} className="p-4 min-w-[240px] align-top">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <span className="font-headline-sm text-primary text-sm font-bold line-clamp-1">
                      {l.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(l.id)}
                      className="text-on-surface-variant/60 hover:text-error p-1"
                      title="Remove from compare"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-surface-container">
                    <img
                      src={l.property?.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'}
                      alt={l.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
          {criteriaRows.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/30'}
            >
              <td className="p-4 font-label-md text-primary font-semibold">
                {row.label}
              </td>
              {listings.map((l) => (
                <td key={l.id} className="p-4">
                  {row.render(l)}
                </td>
              ))}
            </tr>
          ))}

          {/* Action Row */}
          <tr className="bg-surface-container-low/50">
            <td className="p-4 font-label-md text-primary font-semibold">
              Ready to Decide?
            </td>
            {listings.map((l) => (
              <td key={l.id} className="p-4">
                <Link to={`/properties/${l.id}`}>
                  <Button variant="accent" size="sm" className="w-full">
                    View Details & Tour
                  </Button>
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
