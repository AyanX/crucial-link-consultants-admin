import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Plus, Camera } from 'lucide-react';
import type { TeamMember, MemberFormData, ModalMode } from '../../../types';
import { ROLE_OPTIONS } from '../../../data/team';
import './MemberModal.scss';

interface MemberModalProps {
  mode: ModalMode;
  member?: TeamMember | null;
  isOpen: boolean;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (data: MemberFormData) => void;
}

const EMPTY_FORM: MemberFormData = {
  name: '',
  title: '',
  role: 'Admin (Full Access)',
  bio: '',
  skills: [],
  image: null,
};

const MemberModal: React.FC<MemberModalProps> = ({
  mode, member, isOpen, submitting, onClose, onSubmit,
}) => {
  const [form, setForm] = useState<MemberFormData>(EMPTY_FORM);
  const [skillInput, setSkillInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Populate form when editing
  useEffect(() => {
    if (mode === 'edit' && member) {
      setForm({
        name: member.name,
        title: member.title,
        role: member.role,
        bio: member.bio,
        skills: [...member.skills],
        image: member.image,
      });
      setImagePreview(member.image);
    } else {
      setForm(EMPTY_FORM);
      setImagePreview(null);
    }
    setSkillInput('');
  }, [mode, member, isOpen]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const setField = useCallback(<K extends keyof MemberFormData>(
    key: K, value: MemberFormData[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const addSkill = useCallback(() => {
    const trimmed = skillInput.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setField('skills', [...form.skills, trimmed]);
    }
    setSkillInput('');
  }, [skillInput, form.skills, setField]);

  const removeSkill = useCallback((skill: string) => {
    setField('skills', form.skills.filter(s => s !== skill));
  }, [form.skills, setField]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setField('image', file);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, [setField]);

  const handleSubmit = useCallback(() => {
    if (!form.name.trim() || !form.title.trim() || !form.role.trim()) return;
    onSubmit(form);
  }, [form, onSubmit]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const isEdit = mode === 'edit';

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="member-modal" role="dialog" aria-modal="true">

        {/* Header */}
        <div className="member-modal__header">
          <div>
            <h2 className="member-modal__title">
              {isEdit ? 'Edit Member' : 'Add New Member'}
            </h2>
            <p className="member-modal__subtitle">
              {isEdit
                ? 'Update the details of this team member below.'
                : 'Provide the details of the new team member below.'}
            </p>
          </div>
          <button className="member-modal__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="member-modal__body">

          {/* Name + Job Title */}
          <div className="modal-row">
            <div className="modal-field">
              <label className="modal-label">Name <span className="required">*</span></label>
              <input
                className="modal-input"
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={form.name}
                onChange={e => setField('name', e.target.value)}
              />
            </div>
            <div className="modal-field">
              <label className="modal-label">Job Title <span className="required">*</span></label>
              <input
                className="modal-input"
                type="text"
                placeholder="e.g. Lead Developer"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
              />
            </div>
          </div>

          {/* Role */}
          <div className="modal-field">
            <label className="modal-label">Role <span className="required">*</span></label>
            <div className="modal-select-wrap">
              <select
                className="modal-select"
                value={form.role}
                onChange={e => setField('role', e.target.value)}
              >
                {ROLE_OPTIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="modal-select-arrow">▾</span>
            </div>
          </div>

          {/* Biography */}
          <div className="modal-field">
            <label className="modal-label">Biography</label>
            <textarea
              className="modal-textarea"
              placeholder="Tell us about this team member..."
              value={form.bio}
              rows={4}
              onChange={e => setField('bio', e.target.value)}
            />
          </div>

          {/* Profile Picture */}
          <div className="modal-field">
            <label className="modal-label">Profile Picture</label>
            <div className="modal-upload">
              <div
                className="modal-upload__preview"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <Camera size={20} />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="modal-upload__btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </button>
              <span className="modal-upload__hint">Max size 2MB (JPG, PNG)</span>
            </div>
          </div>

          {/* Skills */}
          <div className="modal-field">
            <label className="modal-label">Skills</label>
            <div className="modal-skills-input">
              <input
                className="modal-input modal-input--skills"
                type="text"
                placeholder="Add a skill (e.g. React, UX Writing)"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              />
              <button
                type="button"
                className="modal-skills-add"
                onClick={addSkill}
              >
                <Plus size={16} />
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="modal-skills-tags">
                {form.skills.map(skill => (
                  <span key={skill} className="modal-skill-tag">
                    {skill}
                    <button
                      type="button"
                      className="modal-skill-tag__remove"
                      onClick={() => removeSkill(skill)}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="member-modal__footer">
          <button className="btn btn--secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button
            className={`btn btn--primary ${submitting ? 'btn--loading' : ''}`}
            onClick={handleSubmit}
            disabled={submitting || !form.name.trim() || !form.title.trim()}
          >
            {submitting
              ? <><span className="spinner" /> Saving…</>
              : isEdit ? 'Save Changes' : 'Submit Member'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
