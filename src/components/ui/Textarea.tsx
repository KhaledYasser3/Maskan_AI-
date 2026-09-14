import { TextareaHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-label-md font-label-md text-on-surface"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={twMerge(
            clsx(
              'w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-3.5 py-2.5 rounded-DEFAULT border transition-all duration-150 placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:ring-1 resize-y',
              error
                ? 'border-error focus:border-error focus:ring-error text-error'
                : 'border-outline-variant/60 focus:border-secondary focus:ring-secondary/20 hover:border-outline-variant',
              className
            )
          )}
          {...props}
        />
        {error ? (
          <span className="text-body-sm text-error font-body-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </span>
        ) : helperText ? (
          <span className="text-body-sm text-on-surface-variant/70 font-body-sm">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
