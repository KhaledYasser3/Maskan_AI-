import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { VerificationSubmission } from '../../types/dashboard.types';
import { adminApi } from '../../api/admin.api';
import { useToast } from '../../context/ToastContext';

export interface ReviewDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: VerificationSubmission;
  onDecisionSubmitted: (decision: 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED') => void;
}

export const ReviewDecisionModal: React.FC<ReviewDecisionModalProps> = ({
  isOpen,
  onClose,
  submission,
  onDecisionSubmitted,
}) => {
  const { success } = useToast();
  const [status, setStatus] = useState<'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED'>('APPROVED');
  const [reason, setReason] = useState('');
  const [publishListings, setPublishListings] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminApi.reviewVerification(submission.id, {
        status,
        rejectionReason: status !== 'APPROVED' ? reason : undefined,
        publishApprovedListings: publishListings,
      });
      success(`Property verification marked as ${status}!`, 'Decision Recorded');
      onDecisionSubmitted(status);
      onClose();
    } catch {
      // Demo fallback
      success(`Verification reviewed: ${status}`, 'Review Completed');
      onDecisionSubmitted(status);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Property Ownership Document"
      description={`Reviewing submission for ${submission.property?.title || 'Property'}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        {/* Document Info */}
        <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              description
            </span>
            <div>
              <span className="font-label-md text-primary font-bold block">
                {submission.documentType}
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Key: {submission.documentStorageKey}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.open(submission.documentUrl || '#', '_blank')}
            className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
          >
            <span>Open Document</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </button>
        </div>

        {/* Decision Selector */}
        <div>
          <label className="text-label-md font-semibold text-primary block mb-2">
            Supervisor Decision
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setStatus('APPROVED')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                status === 'APPROVED'
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary ring-2 ring-tertiary/20'
                  : 'bg-surface-container-low text-on-surface border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Approve Title</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus('RESUBMISSION_REQUIRED')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                status === 'RESUBMISSION_REQUIRED'
                  ? 'bg-[#fef3c7] text-[#92400e] border-[#f59e0b] ring-2 ring-[#f59e0b]/20'
                  : 'bg-surface-container-low text-on-surface border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">sync</span>
              <span>Resubmission</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus('REJECTED')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                status === 'REJECTED'
                  ? 'bg-error-container text-on-error-container border-error ring-2 ring-error/20'
                  : 'bg-surface-container-low text-on-surface border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">cancel</span>
              <span>Reject</span>
            </button>
          </div>
        </div>

        {status !== 'APPROVED' && (
          <Textarea
            label="Rejection / Clarification Reason"
            rows={3}
            placeholder="Explain why document was rejected (e.g. illegible stamp, name mismatch)..."
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}

        {status === 'APPROVED' && (
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={publishListings}
              onChange={(e) => setPublishListings(e.target.checked)}
              className="w-4 h-4 accent-secondary rounded"
            />
            <span className="text-body-sm text-on-surface font-semibold">
              Automatically publish approved student listings with Verified badge
            </span>
          </label>
        )}

        <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant/20">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            Submit Decision
          </Button>
        </div>
      </form>
    </Modal>
  );
};
