import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import type { WorkPayload } from './types';
import styles from './RelatedWorks.module.scss';

interface Props {
  isSaving: boolean;
  onSave: (data: WorkPayload) => void;
  onCancel: () => void;
}

const blank: WorkPayload = { title: '', description: '', date: '' };

export default function AddForm({ isSaving, onSave, onCancel }: Props) {
  const [form, setForm] = useState<WorkPayload>(blank);

  const set = (field: keyof WorkPayload, val: string) =>
    setForm((p) => ({ ...p, [field]: val }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div className={`${styles.row} ${styles.rowOpen}`}>
      <div className={styles.rowBody}>
        <div className={styles.editForm}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Title</label>
            <input
              className={styles.fieldInput}
              placeholder="Enter title…"
              value={form.title}
              autoFocus
              onChange={(e) => set('title', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
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
          <div className={styles.editActions}>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={isSaving || !form.title.trim()}
            >
              {isSaving
                ? <ClipLoader size={13} color="#fff" />
                : <><Check size={14} /> Add</>
              }
            </button>
            <button className={styles.cancelBtn} onClick={onCancel}>
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
