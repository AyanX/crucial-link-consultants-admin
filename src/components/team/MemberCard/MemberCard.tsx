import React from 'react';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import type { TeamMember } from '../../../types';
import { AVATAR_COLORS } from '../../../data/team';
import './MemberCard.scss';

interface MemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const getAvatarColor = (id: string) =>
  AVATAR_COLORS[parseInt(id, 10) % AVATAR_COLORS.length];

const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit, onDelete }) => (
  <div className="member-card">
    <div className="member-card__avatar-wrap">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="member-card__avatar-img"
        />
      ) : (
        <div
          className="member-card__avatar-placeholder"
          style={{ background: getAvatarColor(member.id) }}
        >
          {getInitials(member.name)}
        </div>
      )}
      {member.isActive && (
        <span className="member-card__active-badge">
          <CheckCircle size={16} />
        </span>
      )}
    </div>

    <h3 className="member-card__name">{member.name}</h3>
    <p className="member-card__title">{member.title}</p>

    {member.skills.length > 0 && (
      <div className="member-card__skills">
        {member.skills?.slice(0, 3).map(skill => (
          <span key={skill} className="skill-pill">{skill}</span>
        ))}
      </div>
    )}

    <div className="member-card__actions">
      <button
        className="member-card__action-btn member-card__action-btn--edit"
        onClick={() => onEdit(member)}
        title="Edit member"
      >
        <Pencil size={15} />
      </button>
      <button
        className="member-card__action-btn member-card__action-btn--delete"
        onClick={() => onDelete(member.id)}
        title="Delete member"
      >
        <Trash2 size={15} />
      </button>
    </div>
  </div>
);

export default MemberCard;
