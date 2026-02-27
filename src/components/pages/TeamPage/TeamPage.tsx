import React, { useState, useCallback } from 'react';
import { UserPlus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import type { TeamMember, MemberFormData, ModalMode } from '../../../types';
import MemberCard from '../../team/MemberCard/MemberCard';
import AddMemberCard from '../../team/AddMemberCard/AddMemberCard';
import MemberModal from '../../team/MemberModal/MemberModal';
import './TeamPage.scss';
import { useDashboard } from '../../../context/DashboardContext';

const TeamPage: React.FC = () => {
  const { addToast } = useToast();
  const { members, loading, submitting, addMember, editMember, deleteMember } = useDashboard()

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const openAdd = useCallback(() => {
    setModalMode('add');
    setSelectedMember(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((member: TeamMember) => {
    setModalMode('edit');
    setSelectedMember(member);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    deleteMember(
      id,
      () => addToast('Member removed successfully.', 'success'),
      (msg) => addToast(`Delete failed: ${msg}`, 'error'),
    );
  }, [deleteMember, addToast]);

  const handleSubmit = useCallback((data: MemberFormData) => {
    if (modalMode === 'edit' && selectedMember) {
      editMember(
        selectedMember.id,
        data,
        () => { addToast('Member updated successfully!', 'success'); setModalOpen(false); },
        (msg) => { addToast(`Update failed: ${msg}`, 'error'); setModalOpen(false); },
      );
    } else {
      addMember(
        data,
        () => { addToast('New member added!', 'success'); setModalOpen(false); },
        (msg) => { addToast(`Could not reach server: ${msg}`, 'error'); setModalOpen(false); },
      );
    }
  }, [modalMode, selectedMember, editMember, addMember, addToast]);

  return (
    <div className="page-content team-page">

      {/* Page header */}
      <div className="team-page__header">
        <div className="team-page__title-block">
          <h2 className="team-page__title">Technical Team</h2>
          <p className="team-page__subtitle">
            Managing {members.length} specialized member{members.length !== 1 ? 's' : ''} of the core engineering group
          </p>
        </div>

        <div className="team-page__controls">
          <div className="view-toggle">
            <button
              className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={16} />
            </button>
            <button
              className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <button className="btn-add-member" onClick={openAdd}>
            <UserPlus size={16} />
            Add New Member
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="team-page__loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className={`team-grid ${viewMode === 'list' ? 'team-grid--list' : ''}`}>
          {members.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
          <AddMemberCard onClick={openAdd} />
        </div>
      )}

      {/* Modal */}
      <MemberModal
        mode={modalMode}
        member={selectedMember}
        isOpen={modalOpen}
        submitting={submitting}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TeamPage;