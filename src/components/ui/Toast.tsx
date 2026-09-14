import React from 'react';
import { useToast, ToastMessage } from '../../context/ToastContext';

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const icons = {
    success: { name: 'check_circle', color: 'text-tertiary', bg: 'bg-tertiary-fixed' },
    error: { name: 'error', color: 'text-error', bg: 'bg-error-container' },
    info: { name: 'info', color: 'text-secondary', bg: 'bg-secondary-fixed' },
    warning: { name: 'warning', color: 'text-[#b45309]', bg: 'bg-[#fef3c7]' },
  };

  const style = icons[toast.type];

  return (
    <div
      role="alert"
      className="flex items-start gap-3 p-4 bg-surface-container-lowest rounded-xl shadow-warm-lg border border-outline-variant/40 min-w-[300px] max-w-md animate-slide-in pointer-events-auto"
    >
      <div
        className={`w-8 h-8 rounded-lg ${style.bg} ${style.color} flex items-center justify-center shrink-0`}
      >
        <span className="material-symbols-outlined text-[20px]">{style.name}</span>
      </div>

      <div className="flex-1 flex flex-col text-left">
        {toast.title && (
          <h5 className="font-label-lg text-primary text-label-md">{toast.title}</h5>
        )}
        <p className="text-body-sm text-on-surface-variant mt-0.5">{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="text-on-surface-variant/60 hover:text-on-surface p-1"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
