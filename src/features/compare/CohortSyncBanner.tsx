import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export interface CohortSyncBannerProps {
  savedCount?: number;
}

export const CohortSyncBanner: React.FC<CohortSyncBannerProps> = ({ savedCount = 4 }) => {
  const { success } = useToast();

  const handleInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Roommate cohort comparison link copied!', 'Invite Roommates');
  };

  return (
    <section className="w-full bg-surface-container-low px-margin py-space-sm border-b border-outline-variant/30 text-left">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-space-sm text-body-sm text-on-surface-variant font-body-sm">
        <div className="flex items-center gap-space-xs">
          <Link
            to="/explore?saved=true"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Shortlist ({savedCount} saved)</span>
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-on-surface font-label-md font-semibold">Live Cohort Matrix</span>
        </div>

        <div className="flex items-center gap-space-md">
          <div className="flex items-center -space-x-2">
            <div
              className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-[10px] font-bold shadow-sm"
              title="You (Karim)"
            >
              K
            </div>
            <div
              className="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-label-sm text-[10px] font-bold shadow-sm"
              title="Omar"
            >
              O
            </div>
            <div
              className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-[10px] font-bold shadow-sm"
              title="Youssef"
            >
              Y
            </div>
          </div>
          <span className="font-label-md text-label-md text-on-surface hidden sm:inline">
            3 Roommates Syncing
          </span>
          <button
            type="button"
            onClick={handleInvite}
            className="inline-flex items-center gap-1 text-secondary hover:text-on-secondary-container font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>Invite 4th Roommate</span>
          </button>
        </div>
      </div>
    </section>
  );
};
