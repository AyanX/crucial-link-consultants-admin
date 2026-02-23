import React from 'react';
import { Plus } from 'lucide-react';
import './AddMemberCard.scss';

interface AddMemberCardProps {
  onClick: () => void;
}

const AddMemberCard: React.FC<AddMemberCardProps> = ({ onClick }) => (
  <button className="add-member-card" onClick={onClick}>
    <div className="add-member-card__icon">
      <Plus size={24} />
    </div>
    <span className="add-member-card__label">Add Team Member</span>
  </button>
);

export default AddMemberCard;
