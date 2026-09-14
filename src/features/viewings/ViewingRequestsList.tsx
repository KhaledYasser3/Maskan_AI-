import React from 'react';
import { ViewingRequest } from '../../types/interactions.types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils/formatters';

export interface ViewingRequestsListProps {
  viewings: ViewingRequest[];
  onCancel: (id: string) => void;
  onLeaveFeedback: (id: string) => void;
}

export const ViewingRequestsList: React.FC<ViewingRequestsListProps> = ({
  viewings,
  onCancel,
  onLeaveFeedback,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return {
          label: 'Tour Confirmed',
          bg: 'bg-tertiary-fixed',
          color: 'text-on-tertiary-fixed',
          icon: 'event_available',
        };
      case 'PENDING':
        return {
          label: 'Awaiting Owner Confirmation',
          bg: 'bg-secondary-fixed',
          color: 'text-on-secondary-fixed',
          icon: 'schedule',
        };
      case 'COMPLETED':
        return {
          label: 'Tour Completed',
          bg: 'bg-surface-container-high',
          color: 'text-on-surface-variant',
          icon: 'task_alt',
        };
      default:
        return {
          label: 'Cancelled',
          bg: 'bg-error-container',
          color: 'text-error',
          icon: 'event_busy',
        };
    }
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      {viewings.map((v) => {
        const badge = getStatusBadge(v.status);
        const image =
          v.listing?.property?.images?.[0]?.url ||
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80';

        return (
          <Card
            key={v.id}
            elevation="level-1"
            className="p-5 bg-surface-container-lowest border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-outline-variant transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0">
                <img
                  src={image}
                  alt={v.listing?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.color}`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {badge.icon}
                    </span>
                    {badge.label}
                  </span>
                </div>

                <h4 className="font-headline-sm text-primary text-base font-bold">
                  {v.listing?.title || 'Al-Dokki Academic Residence'}
                </h4>

                <p className="text-body-sm text-on-surface-variant flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    location_on
                  </span>
                  <span>
                    {v.listing?.property?.address || '34 El-Messaha Square, Dokki'}
                  </span>
                </p>

                {v.scheduledAt && (
                  <p className="text-xs font-semibold text-primary mt-1">
                    Scheduled Time: {formatDate(v.scheduledAt)}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              {v.status === 'PENDING' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancel(v.id)}
                  className="text-error border-error/40 hover:bg-error-container/30"
                >
                  Cancel Request
                </Button>
              )}

              {v.status === 'ACCEPTED' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancel(v.id)}
                    className="text-error border-error/40 hover:bg-error-container/30"
                  >
                    Cancel Tour
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => onLeaveFeedback(v.id)}
                  >
                    Confirm Attendance
                  </Button>
                </>
              )}

              {v.status === 'COMPLETED' && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onLeaveFeedback(v.id)}
                  leftIcon={
                    <span className="material-symbols-outlined text-[16px]">rate_review</span>
                  }
                >
                  Leave Tour Feedback
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
