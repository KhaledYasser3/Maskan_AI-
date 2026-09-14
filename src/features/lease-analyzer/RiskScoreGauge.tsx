import React from 'react';
import { Card } from '../../components/ui/Card';

export interface RiskScoreGaugeProps {
  score: number; // 0 to 100
  riskLevel?: string;
  summary: string;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  summary,
}) => {
  const getTheme = () => {
    if (score <= 30) {
      return {
        label: 'Low Risk — Fair Agreement',
        color: 'text-tertiary',
        bg: 'bg-tertiary-fixed',
        border: 'border-tertiary',
        badge: 'Safe to Sign',
        barColor: 'bg-tertiary',
      };
    }
    if (score <= 65) {
      return {
        label: 'Moderate Risk — Negotiate Clauses',
        color: 'text-[#b45309]',
        bg: 'bg-[#fef3c7]',
        border: 'border-[#f59e0b]',
        badge: 'Amendments Advised',
        barColor: 'bg-[#f59e0b]',
      };
    }
    return {
      label: 'High Risk — Predatory Clauses Detected',
      color: 'text-error',
      bg: 'bg-error-container',
      border: 'border-error',
      badge: 'Do Not Sign Without Edits',
      barColor: 'bg-error',
    };
  };

  const theme = getTheme();

  return (
    <Card
      elevation="level-2"
      className="p-6 bg-surface-container-lowest text-left flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-secondary"
    >
      {/* Visual Score Ring / Dial */}
      <div className="flex items-center gap-5 shrink-0">
        <div
          className={`w-20 h-20 rounded-2xl ${theme.bg} ${theme.border} border-2 flex flex-col items-center justify-center shadow-warm-sm`}
        >
          <span className={`font-display-lg text-3xl font-bold ${theme.color} leading-none`}>
            {score}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/80 mt-1">
            Risk Index
          </span>
        </div>

        <div className="flex flex-col">
          <span
            className={`inline-block w-fit text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.bg} ${theme.color} mb-1`}
          >
            {theme.badge}
          </span>
          <h3 className="font-headline-sm text-primary font-bold">{theme.label}</h3>
          <span className="text-body-sm text-on-surface-variant">
            Evaluated by Maskan Legal AI Engine v2.4
          </span>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="flex-1 max-w-xl pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0">
        <h4 className="text-label-md font-semibold text-primary mb-1">
          Executive Legal Assessment:
        </h4>
        <p className="text-body-md text-on-surface-variant leading-relaxed">{summary}</p>
      </div>
    </Card>
  );
};
