import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { Listing } from '../../types/listings.types';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  isOpen,
  onClose,
  listing,
}) => {
  const { isAuthenticated } = useAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    'Hi! Is this flat still available for October move-in for 3 students?'
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showError('Please sign in to message the landlord.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      success('Message sent! Opening chat thread...', 'Conversation Started');
      onClose();
      navigate('/messages');
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Direct Message Landlord"
      description={`Inquire directly about ${listing.title}`}
      maxWidth="md"
    >
      <form onSubmit={handleSend} className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
            {listing.property?.ownerId ? 'L' : 'O'}
          </div>
          <div>
            <span className="font-label-md text-primary font-bold block">Verified Landlord</span>
            <span className="text-xs text-on-surface-variant">Typically replies within 1 hour</span>
          </div>
        </div>

        <Textarea
          label="Your Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about bills, contract length, or quiet study hours..."
          required
        />

        <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            Send Message
          </Button>
        </div>
      </form>
    </Modal>
  );
};
