import React from 'react';
import { ClauseFinding } from '../../types/ai.types';
import { Card } from '../../components/ui/Card';

export interface FindingsBreakdownProps {
  findings: ClauseFinding[];
}

export const FindingsBreakdown: React.FC<FindingsBreakdownProps> = ({ findings }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'HIGH':
        return {
          label: 'Critical Red Flag',
          bg: 'bg-error-container',
          color: 'text-error',
          icon: 'dangerous',
        };
      case 'MEDIUM':
        return {
          label: 'Caution / Unfair Term',
          bg: 'bg-[#fef3c7]',
          color: 'text-[#92400e]',
          icon: 'warning',
        };
      default:
        return {
          label: 'Fair Standard Term',
          bg: 'bg-tertiary-fixed',
          color: 'text-on-tertiary-fixed',
          icon: 'check_circle',
        };
    }
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-primary">
          Clause-by-Clause Findings ({findings.length})
        </h3>
        <span className="text-body-sm text-on-surface-variant">
          Click any clause to view student protection suggestions
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {findings.map((f, idx) => {
          const badge = getSeverityBadge(f.severity);

          return (
            <Card
              key={idx}
              elevation="level-1"
              className="p-5 bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-3 hover:border-outline-variant transition-colors"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.color}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {badge.icon}
                    </span>
                    {badge.label}
                  </span>
                  <h4 className="font-label-lg text-primary text-base font-bold">
                    {f.title}
                  </h4>
                </div>
                <span className="text-xs text-on-surface-variant/70 font-mono">
                  {f.type}
                </span>
              </div>

              {/* Original Clause Text */}
              <div className="p-3 bg-surface-container-low/60 rounded-lg border-l-2 border-l-outline text-body-sm text-on-surface-variant font-mono">
                “{f.text}”
              </div>

              {/* Explanation & Action Recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary mb-0.5">
                    What this means for you:
                  </span>
                  <p className="text-body-sm text-on-surface-variant">{f.explanation}</p>
                </div>

                <div className="flex flex-col p-3 rounded-lg bg-secondary-fixed/30 border border-secondary-fixed">
                  <span className="text-xs font-bold text-secondary flex items-center gap-1 mb-0.5">
                    <span className="material-symbols-outlined text-[14px]">
                      lightbulb
                    </span>
                    Recommended Amendment:
                  </span>
                  <p className="text-body-sm text-on-surface font-medium">
                    {f.recommendation}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
