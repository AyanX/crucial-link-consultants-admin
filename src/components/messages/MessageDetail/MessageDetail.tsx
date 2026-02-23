import React from 'react';
import { Trash2 } from 'lucide-react';
import { useMessages } from '../../../context/MessagesContext';
import { formatDateTime } from '../../../hooks/useTimeAgo';
import './MessageDetail.scss';

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_COLORS: Record<string, string> = {
  teal: '#14b8a6', indigo: '#6366f1', amber: '#f59e0b',
  rose: '#f43f5e', violet: '#8b5cf6', sky: '#0ea5e9',
};
const COLORS = Object.values(AVATAR_COLORS);
const getAvatarBg = (name: string) => COLORS[name.charCodeAt(0) % COLORS.length];

const MessageDetail: React.FC = () => {
  const { messages, selectedId, deleteMessage, deletingId } = useMessages();

  const message = messages.find(m => m.id === selectedId) ?? null;

  if (!message) {
    return (
      <div className="message-detail message-detail--empty">
        <div className="message-detail__empty-icon">✉️</div>
        <p className="message-detail__empty-text">Select a message to read it</p>
      </div>
    );
  }

  const isDeleting = deletingId === message.id;

  return (
    <div className="message-detail">
      {/* Detail Header */}
      <div className="message-detail__header">
        <h2 className="message-detail__subject">{message.subject}</h2>
        <button
          className={`btn-delete ${isDeleting ? 'btn-delete--loading' : ''}`}
          onClick={() => deleteMessage(message.id)}
          disabled={isDeleting}
        >
          {isDeleting
            ? <span className="spinner spinner--dark" />
            : <Trash2 size={14} />
          }
          {isDeleting ? 'Deleting…' : 'Delete Message'}
        </button>
      </div>

      {/* Sender Row */}
      <div className="message-detail__sender">
        <div
          className="message-detail__avatar"
          style={{ background: getAvatarBg(message.name) }}
        >
          {getInitials(message.name)}
        </div>
        <div className="message-detail__sender-info">
          <span className="message-detail__sender-name">{message.name}</span>
          <span className="message-detail__sender-email">{message.email}</span>
        </div>
      </div>

      {/* Meta Row */}
      <div className="message-detail__meta">
        <div className="message-detail__meta-item">
          <span className="message-detail__meta-label">Organization</span>
          <span className="message-detail__meta-value">{message.organization}</span>
        </div>
        <div className="message-detail__meta-item">
          <span className="message-detail__meta-label">Date Received</span>
          <span className="message-detail__meta-value">{formatDateTime(message.created_at)}</span>
        </div>
      </div>

      {/* Message Body */}
      <div className="message-detail__body-section">
        <span className="message-detail__body-label">Message Content</span>
        <div className="message-detail__body-content">
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
