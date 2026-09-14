import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-10 text-center bg-surface-container-low/50 rounded-2xl border border-dashed border-outline-variant/60 my-6 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-4 shadow-warm-sm">
        <span className="material-symbols-outlined text-3xl text-secondary">{icon}</span>
      </div>

      <h4 className="font-headline-sm text-primary tracking-tight">{title}</h4>
      <p className="text-body-md text-on-surface-variant max-w-sm mt-1.5 mb-6">
        {description}
      </p>

      {actionText && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
