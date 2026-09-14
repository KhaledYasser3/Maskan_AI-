import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'level-0' | 'level-1' | 'level-2' | 'level-3';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'level-1',
  interactive = false,
  className,
  ...props
}) => {
  const base = 'rounded-xl transition-all duration-200 overflow-hidden';

  const elevations = {
    'level-0': 'bg-surface border border-outline-variant/20',
    'level-1': 'bg-surface-container-lowest border border-outline-variant/40 shadow-warm-sm',
    'level-2': 'bg-surface-container-lowest border border-outline-variant/60 shadow-warm-md',
    'level-3': 'bg-surface-container-lowest border border-outline-variant/80 shadow-warm-lg',
  };

  const interactiveStyles = interactive
    ? 'hover:-translate-y-0.5 hover:shadow-warm-md hover:border-outline-variant cursor-pointer'
    : '';

  return (
    <div
      className={twMerge(clsx(base, elevations[elevation], interactiveStyles, className))}
      {...props}
    >
      {children}
    </div>
  );
};
