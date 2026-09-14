import React, { useState } from 'react';
import { AdminReportItem } from '../../types/dashboard.types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const ReportsModeration: React.FC = () => {
  const { success } = useToast();
  const [reports, setReports] = useState<AdminReportItem[]>([
    {
      id: 'rep1',
      reporterId: 'u1',
      targetType: 'LISTING',
      targetId: 'list1',
      reason: 'Inaccurate Walk Distance',
      details: 'Listing claims 5 mins walk to Gate 4, but real pedestrian route is over 20 mins.',
      status: 'PENDING',
      createdAt: '2026-09-12',
    },
    {
      id: 'rep2',
      reporterId: 'u2',
      targetType: 'USER',
      targetId: 'u5',
      reason: 'Suspicious advance deposit request',
      details: 'User asked for advance transfer before viewing apartment.',
      status: 'PENDING',
      createdAt: '2026-09-13',
    },
  ]);

  const handleResolve = (id: string, action: 'RESOLVED' | 'DISMISSED') => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    success(`Report marked as ${action}.`, 'Moderation Resolved');
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div>
        <h2 className="font-headline-md text-primary font-bold">
          Student Safety & Content Reports ({reports.filter((r) => r.status === 'PENDING').length})
        </h2>
        <p className="text-body-sm text-on-surface-variant">
          Moderation queue for reported student flats and suspicious messages.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {reports.map((r) => {
          const isPending = r.status === 'PENDING';

          return (
            <Card
              key={r.id}
              elevation="level-1"
              className="p-5 bg-surface-container-lowest border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isPending
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-tertiary-fixed text-on-tertiary-fixed'
                    }`}
                  >
                    {r.status}
                  </span>
                  <span className="text-xs text-secondary font-bold">
                    Target: {r.targetType}
                  </span>
                </div>

                <h4 className="font-headline-sm text-primary text-base font-bold">
                  {r.reason}
                </h4>

                <p className="text-body-sm text-on-surface-variant max-w-2xl">
                  {r.details}
                </p>

                <span className="text-xs text-on-surface-variant/70">
                  Reported on: {r.createdAt}
                </span>
              </div>

              {isPending && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolve(r.id, 'DISMISSED')}
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleResolve(r.id, 'RESOLVED')}
                  >
                    Take Action
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
