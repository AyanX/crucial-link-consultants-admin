import React from 'react';
import { Pencil, Check } from 'lucide-react';
import  { DynamicIcon } from '../icons/Icons';
 import type {IconName } from '../icons/Icons';
import type { MetricCard as MetricCardType } from '../../types';
import './MetricCard.scss';

interface MetricCardProps {
  card: MetricCardType;
  editValues: Record<string, string>;
  editingId: string | null;
  onEditToggle: (id: string) => void;
  onValueChange: (id: string, val: string) => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  card, editValues, editingId, onEditToggle, onValueChange,
}) => {
  const isEditing = editingId === card.id;
  const displayValue = editValues[card.id] ?? card.value;

  return (
    <div className={`metric-card ${isEditing ? 'metric-card--editing' : ''}`}>
      <div className="metric-card__header">
        <div className="metric-icon-wrap">
          <DynamicIcon name={card.icon as IconName} size={18} />
        </div>
        <div className="metric-status">
          <span className="active-dot" />
          <span className="active-label">Active Metric</span>
        </div>
        <button
          className={`edit-btn ${isEditing ? 'edit-btn--active' : ''}`}
          onClick={() => onEditToggle(card.id)}
          title={isEditing ? 'Confirm' : 'Edit value'}
        >
          {isEditing ? <Check size={13} /> : <Pencil size={13} />}
        </button>
      </div>

      <p className="metric-card__label">{card.label}</p>

      {isEditing ? (
        <input
          className="metric-card__input"
          value={displayValue}
          onChange={e => onValueChange(card.id, e.target.value)}
          autoFocus
          onKeyDown={e => { if (e.key === 'Enter') onEditToggle(card.id); }}
        />
      ) : (
        <div className="metric-card__value">{displayValue}</div>
      )}

      <p className="metric-card__desc">{card.description}</p>
    </div>
  );
};

export default MetricCard;
