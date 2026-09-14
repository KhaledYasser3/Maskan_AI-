import React, { useState } from 'react';
import { Conversation, MessageItem } from '../../types/interactions.types';
import { Button } from '../../components/ui/Button';
import { formatRelativeTime } from '../../utils/formatters';

export interface ChatThreadProps {
  conversation: Conversation;
  messages: MessageItem[];
  onSendMessage: (text: string) => void;
  onScheduleTour: () => void;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  conversation,
  messages,
  onSendMessage,
  onScheduleTour,
}) => {
  const [inputText, setInputText] = useState('');

  const quickChips = [
    'Is the apartment furnished as in pictures?',
    'Can we schedule a viewing on Saturday?',
    'Are bills included in the monthly rent?',
    'What is the minimum contract length?',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden text-left h-[640px]">
      {/* Header */}
      <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm shadow-sm">
            {conversation.owner?.fullName ? conversation.owner.fullName[0] : 'L'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-label-lg text-primary font-bold">
                {conversation.owner?.fullName || 'Hajj Mahmoud'}
              </h4>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                Verified Owner
              </span>
            </div>
            <p className="text-xs text-secondary font-medium truncate max-w-xs">
              {conversation.listing?.title || 'Al-Dokki Academic Residence, Apt 4'}
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onScheduleTour}
          leftIcon={<span className="material-symbols-outlined text-[16px]">calendar_month</span>}
        >
          Book Tour
        </Button>
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-surface-container-lowest/50">
        {messages.map((m) => {
          const isMe = m.senderId === 'me' || m.senderId === 'student1';

          return (
            <div
              key={m.id}
              className={`flex flex-col max-w-[80%] ${
                isMe ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-body-md ${
                  isMe
                    ? 'bg-primary text-on-primary rounded-br-none shadow-sm'
                    : 'bg-surface-container-low text-on-surface rounded-bl-none border border-outline-variant/30'
                }`}
              >
                {m.content}
              </div>
              <span className="text-[10px] text-on-surface-variant/60 mt-1 px-1">
                {formatRelativeTime(m.createdAt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Reply Chips */}
      <div className="px-4 py-2 bg-surface-container-low/30 border-t border-outline-variant/15 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-secondary shrink-0">Quick Ask:</span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSendMessage(chip)}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium whitespace-nowrap transition-colors border border-outline-variant/20"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-outline-variant/20 bg-surface-container-low/40 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write your message to the landlord..."
          className="flex-1 bg-surface-container-lowest text-body-md text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-secondary"
        />
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={!inputText.trim()}
          rightIcon={<span className="material-symbols-outlined text-[18px]">send</span>}
        >
          Send
        </Button>
      </form>
    </div>
  );
};
