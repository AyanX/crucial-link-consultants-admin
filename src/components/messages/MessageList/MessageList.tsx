import React from 'react';
import { useMessages } from '../../../context/MessagesContext';
import { timeAgo } from '../../../hooks/useTimeAgo';
import './MessageList.scss';

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const MessageList: React.FC = () => {
  const { messages, loading, selectedId, selectMessage } = useMessages();

  return (
    <aside className="message-list">
      <div className="message-list__header">
        <span className="message-list__label">Recent Messages</span>
      </div>

      {loading ? (
        <div className="message-list__loading">
          {[1, 2, 3].map(i => (
            <div key={i} className="message-list__skeleton">
              <div className="skeleton skeleton--avatar" />
              <div className="skeleton-lines">
                <div className="skeleton skeleton--title" />
                <div className="skeleton skeleton--sub" />
              </div>
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="message-list__empty">No messages found.</div>
      ) : (
        <ul className="message-list__items">
          {messages.map(msg => (
            <li
              key={msg.id}
              className={[
                'message-item',
                msg.isRead    ? 'message-item--read'     : 'message-item--unread',
                selectedId === msg.id ? 'message-item--active' : '',
              ].join(' ')}
              onClick={() => selectMessage(msg.id)}
            >
              <div className={`message-item__avatar message-item__avatar--${getAvatarColor(msg.name)}`}>
                {getInitials(msg.name)}
              </div>
              <div className="message-item__body">
                <div className="message-item__top">
                  <span className="message-item__name">{msg.name}</span>
                  {!msg.isRead && <span className="message-item__unread-dot" />}
                </div>
                <p className="message-item__subject">{msg.subject}</p>
                <span className="message-item__time">{timeAgo(msg.created_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

// Deterministic color from name
const AVATAR_COLORS = ['teal', 'indigo', 'amber', 'rose', 'violet', 'sky'];
const getAvatarColor = (name: string): string => {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
};

export default MessageList;
