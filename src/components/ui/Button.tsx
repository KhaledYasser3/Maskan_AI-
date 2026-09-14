import React, { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'tertiary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-label-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-primary text-on-primary hover:bg-primary-container shadow-warm-sm hover:shadow-warm-md border border-transparent',
    secondary:
      'bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30',
    accent:
      'bg-secondary text-on-secondary hover:bg-on-secondary-container shadow-warm-sm hover:shadow-warm-md border border-transparent',
    tertiary:
      'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim border border-transparent',
    outline:
      'bg-transparent text-primary border border-outline-variant hover:bg-surface-container-low',
    ghost:
      'bg-transparent text-on-surface hover:bg-surface-container-low hover:text-primary',
  };

  const sizes = {
    sm: 'text-label-sm px-3 py-1.5 rounded-DEFAULT gap-1.5',
    md: 'text-label-md px-4 py-2.5 rounded-lg gap-2',
    lg: 'text-label-lg px-6 py-3 rounded-lg gap-2.5',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
