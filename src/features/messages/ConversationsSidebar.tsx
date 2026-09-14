import React from 'react';
import { Conversation } from '../../types/interactions.types';
import { formatRelativeTime } from '../../utils/formatters';

export interface ConversationsSidebarProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export const ConversationsSidebar: React.FC<ConversationsSidebarProps> = ({
  conversations,
  activeId,
  onSelect,
}) => {
  return (
    <div className="w-full md:w-80 flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden text-left h-[640px]">
      {/* Search / Header */}
      <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/40">
        <h3 className="font-headline-sm text-primary text-base font-bold mb-3">
          Conversations ({conversations.length})
        </h3>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            placeholder="Search landlord or flat..."
            className="w-full bg-surface-container-lowest text-body-sm text-on-surface pl-9 pr-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/15">
        {conversations.map((conv) => {
          const isSelected = conv.id === activeId;
          const otherUser = conv.owner || { fullName: 'Hajj Mahmoud (Landlord)' };
          const flatTitle = conv.listing?.title || 'Al-Dokki Academic Residence';

          return (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-secondary-fixed/20 border-l-4 border-l-secondary'
                  : 'hover:bg-surface-container-low/60'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                {otherUser.fullName ? otherUser.fullName[0] : 'L'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <h4 className="font-label-md text-primary truncate font-bold">
                    {otherUser.fullName}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant/70 shrink-0">
                    {conv.lastMessage?.createdAt
                      ? formatRelativeTime(conv.lastMessage.createdAt)
                      : '2h ago'}
                  </span>
                </div>

                <p className="text-xs text-secondary font-medium truncate mt-0.5">
                  {flatTitle}
                </p>

                <p className="text-body-sm text-on-surface-variant/80 truncate text-xs mt-1">
                  {conv.lastMessage?.content || 'Yes, the flat is available for viewing on Saturday!'}
                </p>
              </div>

              {conv.unreadCount && conv.unreadCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center shrink-0">
                  {conv.unreadCount}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
