import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, leftIcon, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-label-md font-label-md text-on-surface"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-on-surface-variant/70 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <select
            id={selectId}
            ref={ref}
            className={twMerge(
              clsx(
                'w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-3.5 py-2.5 rounded-DEFAULT border transition-all duration-150 appearance-none pr-10 focus:outline-none focus:bg-white focus:ring-1 cursor-pointer',
                leftIcon ? 'pl-10' : 'pl-3.5',
                error
                  ? 'border-error focus:border-error focus:ring-error text-error'
                  : 'border-outline-variant/60 focus:border-secondary focus:ring-secondary/20 hover:border-outline-variant',
                className
              )
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 text-on-surface-variant/70 pointer-events-none flex items-center">
            <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </div>
        </div>
        {error && (
          <span className="text-body-sm text-error font-body-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
