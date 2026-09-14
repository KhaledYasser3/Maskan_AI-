import React, { useState } from 'react';
import { Conversation, MessageItem } from '../../types/interactions.types';
import { ConversationsSidebar } from './ConversationsSidebar';
import { ChatThread } from './ChatThread';
import { ScheduleViewingModal } from '../details/ScheduleViewingModal';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';

export const MessagesPage: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: 'conv1',
      listingId: MOCK_FEATURED_LISTINGS[0].id,
      listing: MOCK_FEATURED_LISTINGS[0],
      studentId: 'student1',
      ownerId: 'owner1',
      owner: {
        id: 'owner1',
        email: 'mahmoud@gmail.com',
        fullName: 'Hajj Mahmoud El-Messaha',
        role: 'OWNER',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      unreadCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'conv2',
      listingId: MOCK_FEATURED_LISTINGS[1].id,
      listing: MOCK_FEATURED_LISTINGS[1],
      studentId: 'student1',
      ownerId: 'owner2',
      owner: {
        id: 'owner2',
        email: 'ahmed@gmail.com',
        fullName: 'Eng. Ahmed Sarayat',
        role: 'OWNER',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      unreadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv1');
  const [messagesMap, setMessagesMap] = useState<Record<string, MessageItem[]>>({
    conv1: [
      {
        id: 'm1',
        conversationId: 'conv1',
        senderId: 'owner1',
        content:
          'Salam! Welcome to Al-Dokki Academic Residence. The flat is prepared for 3 students with separate desks and fiber internet.',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        isRead: true,
      },
      {
        id: 'm2',
        conversationId: 'conv1',
        senderId: 'me',
        content:
          'Hello Hajj Mahmoud! We are 3 Cairo University engineering students. Can we come for an in-person tour on Saturday around 4 PM?',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        isRead: true,
      },
      {
        id: 'm3',
        conversationId: 'conv1',
        senderId: 'owner1',
        content:
          'Saturday at 4:00 PM is great! I will meet you at 34 El-Messaha Square. Looking forward to meeting you.',
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
        isRead: false,
      },
    ],
    conv2: [
      {
        id: 'm4',
        conversationId: 'conv2',
        senderId: 'me',
        content: 'Hi Eng. Ahmed, is the deposit refundable at the end of the year?',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
      },
      {
        id: 'm5',
        conversationId: 'conv2',
        senderId: 'owner2',
        content: 'Yes, 100% refundable upon handover if no damages.',
        createdAt: new Date(Date.now() - 72000000).toISOString(),
        isRead: true,
      },
    ],
  });

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const activeConv =
    conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeMessages = messagesMap[activeConvId] || [];

  const handleSendMessage = (text: string) => {
    const newMessage: MessageItem = {
      id: Math.random().toString(36).substring(2, 9),
      conversationId: activeConvId,
      senderId: 'me',
      content: text,
      createdAt: new Date().toISOString(),
      isRead: true,
    };
    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMessage],
    }));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin py-8 flex flex-col gap-6 text-left animate-fade-in">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          Direct Messages & Inquiries
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Chat directly with verified property landlords and confirm viewing appointments.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ConversationsSidebar
          conversations={conversations}
          activeId={activeConvId}
          onSelect={setActiveConvId}
        />

        <ChatThread
          conversation={activeConv}
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          onScheduleTour={() => setIsScheduleOpen(true)}
        />
      </div>

      {activeConv.listing && (
        <ScheduleViewingModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          listing={activeConv.listing}
        />
      )}
    </div>
  );
};
