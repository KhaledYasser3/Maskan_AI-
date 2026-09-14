import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  icon,
  onRemove,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-150 select-none cursor-pointer',
          selected
            ? 'bg-primary text-on-primary shadow-warm-sm hover:bg-primary-container'
            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface border border-outline-variant/20',
          className
        )
      )}
    >
      {icon}
      <span>{label}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-75 flex items-center ml-0.5"
        >
          <span className="material-symbols-outlined text-[14px]">close</span>
        </span>
      )}
    </button>
  );
};
