import React, { useState } from 'react';
import { VerificationQueue } from './VerificationQueue';
import { UserManagement } from './UserManagement';
import { ReportsModeration } from './ReportsModeration';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VERIFICATIONS' | 'USERS' | 'REPORTS'>(
    'VERIFICATIONS'
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin py-8 flex flex-col gap-8 text-left animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Supervisor & Admin Portal
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            Platform Moderation & Verification
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Review landlord deeds, manage platform users, and resolve student safety reports.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('VERIFICATIONS')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'VERIFICATIONS'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Verification Queue
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('USERS')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'USERS'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          User Management
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('REPORTS')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'REPORTS'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Reports & Safety
        </button>
      </div>

      {/* Content */}
      {activeTab === 'VERIFICATIONS' && <VerificationQueue />}
      {activeTab === 'USERS' && <UserManagement />}
      {activeTab === 'REPORTS' && <ReportsModeration />}
    </div>
  );
};
