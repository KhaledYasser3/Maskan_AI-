import React, { useState } from 'react';
import { VerificationSubmission } from '../../types/dashboard.types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ReviewDecisionModal } from './ReviewDecisionModal';
import { formatDate } from '../../utils/formatters';

export const VerificationQueue: React.FC = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<VerificationSubmission | null>(null);

  const [queue, setQueue] = useState<VerificationSubmission[]>([
    {
      id: 'sub1',
      propertyId: 'p1',
      property: {
        id: 'p1',
        ownerId: 'ow1',
        title: 'Al-Dokki Academic Residence, Apt 4',
        description: '3-bedroom flat in Dokki',
        propertyType: 'APARTMENT',
        city: 'Giza',
        neighborhood: 'Dokki',
        universityArea: 'Cairo University',
        address: '34 El-Messaha Square, Dokki',
        totalBedrooms: 3,
        totalBathrooms: 2,
        isFurnished: true,
        verificationStatus: 'PENDING',
        amenities: ['Fiber Wi-Fi', 'AC'],
        walkingDistances: [{ destination: 'CU Gate 4', minutes: 11 }],
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ownerId: 'ow1',
      owner: {
        id: 'ow1',
        email: 'mahmoud@gmail.com',
        fullName: 'Hajj Mahmoud El-Messaha',
        role: 'OWNER',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      documentType: 'OWNERSHIP_CONTRACT',
      documentStorageKey: 'ownership_doc_cu_dokki_9921.pdf',
      status: 'PENDING',
      submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'sub2',
      propertyId: 'p2',
      property: {
        id: 'p2',
        ownerId: 'ow2',
        title: 'Bein El-Sarayat Student Flat B2',
        description: 'Flat near Science Faculty',
        propertyType: 'APARTMENT',
        city: 'Giza',
        neighborhood: 'Bein El-Sarayat',
        universityArea: 'Cairo University',
        address: '12 Bein El-Sarayat St, Giza',
        totalBedrooms: 3,
        totalBathrooms: 1,
        isFurnished: true,
        verificationStatus: 'PENDING',
        amenities: ['Wi-Fi'],
        walkingDistances: [{ destination: 'CU Gate 4', minutes: 5 }],
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ownerId: 'ow2',
      owner: {
        id: 'ow2',
        email: 'ahmed@gmail.com',
        fullName: 'Eng. Ahmed Sarayat',
        role: 'OWNER',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      documentType: 'TEMPORARY_PROOF',
      documentStorageKey: 'primary_contract_receipt_331.jpg',
      status: 'PENDING',
      submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    },
  ]);

  const handleDecision = (decision: string) => {
    if (!selectedSubmission) return;
    setQueue((prev) =>
      prev.map((item) =>
        item.id === selectedSubmission.id ? { ...item, status: decision as any } : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-primary font-bold">
            Pending Verification Queue ({queue.filter((q) => q.status === 'PENDING').length})
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Review ownership deeds and title contracts submitted by landlords.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {queue.map((sub) => {
          const isPending = sub.status === 'PENDING';

          return (
            <Card
              key={sub.id}
              elevation="level-1"
              className="p-5 bg-surface-container-lowest border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isPending
                        ? 'bg-[#fef3c7] text-[#92400e]'
                        : sub.status === 'APPROVED'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-error-container text-on-error-container'
                    }`}
                  >
                    {sub.status}
                  </span>
                  <span className="text-xs text-secondary font-semibold">
                    {sub.documentType}
                  </span>
                </div>

                <h3 className="font-headline-sm text-primary text-base font-bold">
                  {sub.property?.title}
                </h3>

                <p className="text-body-sm text-on-surface-variant flex items-center gap-2">
                  <span>Owner: <strong className="text-primary">{sub.owner?.fullName}</strong> ({sub.owner?.email})</span>
                  <span>•</span>
                  <span>Submitted: {formatDate(sub.submittedAt)}</span>
                </p>
              </div>

              {isPending && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedSubmission(sub)}
                  leftIcon={
                    <span className="material-symbols-outlined text-[16px]">
                      rate_review
                    </span>
                  }
                >
                  Review Document
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {selectedSubmission && (
        <ReviewDecisionModal
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          submission={selectedSubmission}
          onDecisionSubmitted={handleDecision}
        />
      )}
    </div>
  );
};
