import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  variant?: 'verified' | 'match' | 'warning' | 'error' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className,
}) => {
  const base =
    'inline-flex items-center gap-1 font-label-sm font-semibold rounded-full select-none';

  const variants = {
    verified: 'bg-tertiary-fixed text-on-tertiary-fixed',
    match: 'bg-secondary-fixed text-on-secondary-fixed',
    warning: 'bg-[#fef3c7] text-[#92400e]',
    error: 'bg-error-container text-on-error-container',
    neutral: 'bg-surface-container text-on-surface-variant',
    accent: 'bg-secondary-container text-on-secondary-container',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-label-sm px-2.5 py-1',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], sizes[size], className))}>
      {icon}
      <span>{children}</span>
    </span>
  );
};
