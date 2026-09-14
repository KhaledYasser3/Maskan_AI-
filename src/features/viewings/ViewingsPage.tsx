import React, { useState } from 'react';
import { ViewingRequest } from '../../types/interactions.types';
import { ViewingRequestsList } from './ViewingRequestsList';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';

export const ViewingsPage: React.FC = () => {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PENDING' | 'PAST'>('UPCOMING');
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);

  const [viewings, setViewings] = useState<ViewingRequest[]>([
    {
      id: 'v1',
      listingId: MOCK_FEATURED_LISTINGS[0].id,
      listing: MOCK_FEATURED_LISTINGS[0],
      studentId: 'student1',
      ownerId: 'owner1',
      status: 'ACCEPTED',
      scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'v2',
      listingId: MOCK_FEATURED_LISTINGS[1].id,
      listing: MOCK_FEATURED_LISTINGS[1],
      studentId: 'student1',
      ownerId: 'owner2',
      status: 'PENDING',
      scheduledAt: new Date(Date.now() + 86400000 * 4).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'v3',
      listingId: MOCK_FEATURED_LISTINGS[2].id,
      listing: MOCK_FEATURED_LISTINGS[2],
      studentId: 'student1',
      ownerId: 'owner3',
      status: 'COMPLETED',
      scheduledAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleCancel = (id: string) => {
    setViewings((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'CANCELLED' } : v))
    );
    success('Viewing request cancelled.', 'Viewing Update');
  };

  const filteredViewings = viewings.filter((v) => {
    if (activeTab === 'UPCOMING') return v.status === 'ACCEPTED';
    if (activeTab === 'PENDING') return v.status === 'PENDING';
    return v.status === 'COMPLETED' || v.status === 'CANCELLED';
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin py-8 flex flex-col gap-8 text-left animate-fade-in">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          My Apartment Viewing Schedule
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Track confirmed tour appointments and landlord responses for your shortlisted student flats.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('UPCOMING')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'UPCOMING'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Upcoming Confirmed Tours
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('PENDING')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'PENDING'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Pending Landlord Action
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('PAST')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
            activeTab === 'PAST'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Past & Completed
        </button>
      </div>

      {/* List */}
      <ViewingRequestsList
        viewings={filteredViewings}
        onCancel={handleCancel}
        onLeaveFeedback={() => setFeedbackModalOpen(true)}
      />

      {/* Tour Feedback Modal */}
      <Modal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        title="Viewing Experience Feedback"
        description="Help fellow students by rating the accuracy of the flat description and landlord hospitality."
        maxWidth="md"
      >
        <div className="flex flex-col gap-4 text-left py-2">
          <div>
            <label className="text-label-md font-semibold text-primary block mb-2">
              Overall Tour Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedRating(star)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
                    selectedRating >= star
                      ? 'bg-secondary text-on-secondary scale-105'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <Textarea
            label="Comments / Notes"
            rows={4}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Was the flat true to pictures? Was walking distance accurate to campus?"
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
            <Button
              variant="secondary"
              onClick={() => setFeedbackModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                setFeedbackModalOpen(false);
                success('Thank you! Your feedback helps keep student housing safe.', 'Feedback Submitted');
              }}
            >
              Submit Rating
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
