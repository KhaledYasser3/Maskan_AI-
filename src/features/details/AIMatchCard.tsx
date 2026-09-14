import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export interface AIMatchCardProps {
  score?: number;
  explanation?: string;
  onScheduleTour: () => void;
  onMessageOwner: () => void;
}

export const AIMatchCard: React.FC<AIMatchCardProps> = ({
  score = 98,
  explanation = 'Saves EGP 7,200/year across the group, cuts 3 minutes off the daily walk to Giza Metro & Faculty gates, and uniquely prevents morning congestion with 2 dedicated full bathrooms.',
  onScheduleTour,
  onMessageOwner,
}) => {
  return (
    <Card
      elevation="level-2"
      className="p-6 bg-surface-container-lowest relative overflow-hidden border-l-4 border-l-secondary text-left flex flex-col gap-5 shadow-warm-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[28px] material-symbols-filled">
              auto_awesome
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
              AI Recommendation Match
            </span>
            <h3 className="font-headline-sm text-primary font-bold">
              {score}% Academic Fit Score
            </h3>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-label-sm font-bold shadow-sm">
          Top Cohort Fit
        </span>
      </div>

      <p className="text-body-md text-on-surface-variant leading-relaxed">
        {explanation}
      </p>

      {/* Cohort fit metrics */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-outline-variant/20 text-center">
        <div>
          <span className="text-[11px] text-on-surface-variant font-medium block">Budget Match</span>
          <span className="font-headline-sm text-primary font-bold text-sm">100% Fit</span>
        </div>
        <div>
          <span className="text-[11px] text-on-surface-variant font-medium block">Campus Proximity</span>
          <span className="font-headline-sm text-primary font-bold text-sm">11 min Walk</span>
        </div>
        <div>
          <span className="text-[11px] text-on-surface-variant font-medium block">Study Space</span>
          <span className="font-headline-sm text-primary font-bold text-sm">3 Desks</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button
          variant="accent"
          size="lg"
          className="flex-1"
          leftIcon={<span className="material-symbols-outlined text-[20px]">calendar_month</span>}
          onClick={onScheduleTour}
        >
          Schedule Tour
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="flex-1"
          leftIcon={<span className="material-symbols-outlined text-[20px]">chat</span>}
          onClick={onMessageOwner}
        >
          Message Owner
        </Button>
      </div>
    </Card>
  );
};
