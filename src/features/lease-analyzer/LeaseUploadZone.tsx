import React, { useState } from 'react';
import { FileUpload } from '../../components/ui/FileUpload';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';

export interface LeaseUploadZoneProps {
  onAnalyzeText: (text: string) => void;
  onAnalyzeFile: (file: File) => void;
  isLoading: boolean;
}

export const LeaseUploadZone: React.FC<LeaseUploadZoneProps> = ({
  onAnalyzeText,
  onAnalyzeFile,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [rawText, setRawText] = useState('');

  const sampleLeaseText = `STANDARD STUDENT LEASE AGREEMENT (DRAFT)
Clause 1: Monthly rent is EGP 5,800 payable strictly by the 1st of each calendar month.
Clause 2: A security deposit of EGP 5,800 is held by the lessor and shall be returned within 60 business days following checkout, subject to discretionary deduction for standard building repainting.
Clause 3: Lessor reserves the right to terminate the tenancy with 7 days written notice in case of building structural inspections.
Clause 4: Tenants shall bear 100% of all plumbing, electrical, and structural repairs irrespective of prior fixture age.
Clause 5: High-speed fiber internet and water utility included in the rental sum.`;

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-warm-sm flex flex-col gap-6 text-left">
      {/* Mode Switch Tabs */}
      <div className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'upload'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Upload Document</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'paste'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Paste Contract Text</span>
          </span>
        </button>
      </div>

      {activeTab === 'upload' ? (
        <div className="flex flex-col gap-4">
          <FileUpload
            label="Upload Lease Draft Document"
            helperText="Supports PDF, JPEG, PNG, WEBP, or TXT (Max 10MB)"
            allowedExtensions={['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.txt']}
            maxSizeMb={10}
            onFileSelect={onAnalyzeFile}
            isLoading={isLoading}
          />
          <div className="flex items-center justify-between text-xs text-on-surface-variant/75 pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
              Confidential & Encrypted AI Processing
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveTab('paste');
                setRawText(sampleLeaseText);
              }}
              className="text-secondary hover:underline font-semibold"
            >
              Or load sample Egyptian lease draft
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Textarea
            label="Paste Tenancy Agreement Clauses"
            rows={7}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste clauses from your lease draft to detect predatory terms..."
            helperText="You can paste full contracts or specific clauses in Arabic or English."
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setRawText(sampleLeaseText)}
              className="text-xs text-secondary hover:underline font-semibold"
            >
              Insert Sample Contract Draft
            </button>
            <Button
              variant="accent"
              disabled={!rawText.trim() || isLoading}
              isLoading={isLoading}
              onClick={() => onAnalyzeText(rawText)}
              leftIcon={
                <span className="material-symbols-outlined text-[18px]">
                  auto_awesome
                </span>
              }
            >
              Analyze Clauses with AI
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
