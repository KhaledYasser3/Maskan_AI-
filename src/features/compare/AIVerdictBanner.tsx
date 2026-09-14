import React from 'react';
import { Card } from '../../components/ui/Card';

export const AIVerdictBanner: React.FC = () => {
  return (
    <div className="flex flex-col gap-space-md text-left">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-space-xs">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            Collaborative Decision Room
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Property Comparison — 3-Student Cohort
          </h1>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Cairo University • Faculty of Engineering Fall Intake
        </span>
      </div>

      {/* AI Verdict & Recommendation Banner */}
      <Card
        elevation="level-1"
        className="p-space-lg relative overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-warm-sm"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="flex items-start gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px] material-symbols-filled">
                auto_awesome
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold">
                  AI Top Recommendation
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  Al-Dokki Academic Residence (Flat 3B)
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
                Saves <strong className="text-primary font-semibold">EGP 7,200/year</strong> across
                the group, cuts <strong className="text-primary font-semibold">3 minutes</strong>{' '}
                off the daily walk to Giza Metro & Faculty gates, and uniquely prevents morning
                congestion with{' '}
                <strong className="text-primary font-semibold">2 dedicated full bathrooms</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Best Value Score
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
