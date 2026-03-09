import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import type { Work, WorkPayload } from './types';
import styles from './RelatedWorks.module.scss';

interface Props {
  initial: Work | null;   // null = new entry, Work = editing existing
  isSaving: boolean;
  onSave: (data: WorkPayload) => void;
  onCancel: () => void;
}

const blank: WorkPayload = { title: '', description: '', date: '' };

export default function WorkForm({ initial, isSaving, onSave, onCancel }: Props) {
  const [form, setForm] = useState<WorkPayload>(blank);

  useEffect(() => {
    setForm(
      initial
        ? { title: initial.title, description: initial.description, date: initial.date }
        : blank
    );
  }, [initial]);

  const set = (field: keyof WorkPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(form);
  };

  const isEditing = initial !== null;

  return (
    <div className={`${styles.item} ${styles.formItem}`}>
      {/* Title row — always visible */}
      <div className={styles.formTitleRow}>
        <input
          className={styles.titleInput}
          placeholder="Enter title…"
          value={form.title}
          autoFocus
          onChange={(e) => set('title', e.target.value)}
          onKeyDown={(e) => !isEditing && e.key === 'Enter' && handleSave()}
        />
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={isSaving || !form.title.trim()}
          title="Save"
        >
          {isSaving ? <ClipLoader size={14} color="#fff" /> : <Check size={15} />}
        </button>
        <button className={styles.cancelBtn} onClick={onCancel} title="Cancel">
          <X size={15} />
        </button>
      </div>

      {/* Extra fields — only when editing */}
      {isEditing && (
        <div className={styles.extraFields}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Description</label>
            <textarea
              className={styles.textarea}
              placeholder="Enter description…"
              value={form.description}
              rows={3}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Date / Year</label>
            <input
              className={styles.fieldInput}
              placeholder="e.g. 2024"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
