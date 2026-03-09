import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronDown, Pencil, Trash2, Check, X } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import type { Work, WorkPayload } from './types';
import styles from './RelatedWorks.module.scss';

interface Props {
  work: Work;
  isOpen: boolean;          // controlled by parent — accordion
  isDeleting: boolean;
  isSaving: boolean;
  onToggle: () => void;
  onSave: (payload: WorkPayload) => void;
  onDelete: () => void;
}

export default function WorkItem({
  work, isOpen, isDeleting, isSaving, onToggle, onSave, onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState<WorkPayload>({ title: work.title, description: work.description, date: work.date });

  // Reset form + editing state when accordion closes
  useEffect(() => {
    if (!isOpen) {
      setEditing(false);
      setForm({ title: work.title, description: work.description, date: work.date });
    }
  }, [isOpen, work]);

  const set = (field: keyof WorkPayload, val: string) =>
    setForm((p) => ({ ...p, [field]: val }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(form);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setForm({ title: work.title, description: work.description, date: work.date });
    setEditing(false);
  };

  return (
    <div className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}>

      {/* ── Title bar — always visible, click to toggle ── */}
      <button className={styles.rowHeader} onClick={onToggle}>
        <CheckCircle2 size={18} className={styles.checkIcon} />
        <span className={styles.rowTitle}>{work.title}</span>
        {isDeleting
          ? <ClipLoader size={15} color="var(--green)" />
          : <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
        }
      </button>

      {/* ── Accordion body ── */}
      {isOpen && (
        <div className={styles.rowBody}>
          {editing ? (
            // ── Edit mode ──
            <div className={styles.editForm}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Title</label>
                <input
                  className={styles.fieldInput}
                  value={form.title}
                  autoFocus
                  onChange={(e) => set('title', e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Description</label>
                <textarea
                  className={styles.textarea}
                  value={form.description}
                  rows={3}
                  onChange={(e) => set('description', e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Date / Year</label>
                <input
                  className={styles.fieldInput}
                  value={form.date}
                  placeholder="e.g. 2024"
                  onChange={(e) => set('date', e.target.value)}
                />
              </div>
              <div className={styles.editActions}>
                <button
                  className={styles.saveBtn}
                  onClick={handleSave}
                  disabled={isSaving || !form.title.trim()}
                >
                  {isSaving
                    ? <ClipLoader size={13} color="#fff" />
                    : <><Check size={14} /> Save</>
                  }
                </button>
                <button className={styles.cancelBtn} onClick={handleCancelEdit}>
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            // ── View mode ──
            <div className={styles.viewBody}>
              {work.description && (
                <p className={styles.viewDescription}>{work.description}</p>
              )}
              {work.date && (
                <span className={styles.viewDate}>{work.date}</span>
              )}
              <div className={styles.viewActions}>
                <button className={styles.editBtn} onClick={() => setEditing(true)}>
                  <Pencil size={13} /> Edit
                </button>
                <button className={styles.deleteBtn} onClick={onDelete} disabled={isDeleting}>
                  {isDeleting
                    ? <ClipLoader size={13} color="var(--red)" />
                    : <><Trash2 size={13} /> Delete</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
