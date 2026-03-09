import { useEffect, useState } from 'react';
import { ThumbsUp, Plus } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import{ api }from './api';
import type { Work, WorkPayload } from './types';
import WorkItem from './WorkItem';
import AddForm from './AddForm';
import styles from './RelatedWorks.module.scss';

export default function RelatedWorks() {
  const [works,      setWorks]      = useState<Work[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [adding,     setAdding]     = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // One open accordion at a time — null = all closed
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  // Fetch once
  useEffect(() => {
    api.works.get()
      .then((data: Work[]) => setWorks(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (payload: WorkPayload) => {
    setSaving(true);
    try {
      const created: Work = await api.works.post(payload);
      setWorks((prev) => [created, ...prev]);
      setAdding(false);
      setOpenId(created.id);   // open the new item straight away
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleEdit = async (id: number, payload: WorkPayload) => {
    setSaving(true);
    try {
      const updated: Work = await api.works.put({ id, ...payload });
      setWorks((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await api.works.delete(id);
      setWorks((prev) => prev.filter((w) => w.id !== id));
      if (openId === id) setOpenId(null);
    } catch (err) { console.error(err); }
    finally { setDeletingId(null); }
  };

  return (
    <div className={styles.card}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}><ThumbsUp size={18} /></span>
          <h2 className={styles.title}>Related Works Management</h2>
        </div>
        {!adding && (
          <button className={styles.addBtn} onClick={() => { setAdding(true); setOpenId(null); }}>
            <Plus size={14} /> Add Reason
          </button>
        )}
      </div>

      <div className={styles.list}>

        {/* Full-page loader */}
        {loading && (
          <div className={styles.center}>
            <ClipLoader size={26} color="var(--green)" />
          </div>
        )}

        {adding && (
          <AddForm
            isSaving={saving}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
          />
        )}

        {!loading && works.map((work) => (
          <WorkItem
            key={work.id}
            work={work}
            isOpen={openId === work.id}
            isDeleting={deletingId === work.id}
            isSaving={saving && openId === work.id}
            onToggle={() => toggle(work.id)}
            onSave={(payload) => handleEdit(work.id, payload)}
            onDelete={() => handleDelete(work.id)}
          />
        ))}

        {/* Empty state */}
        {!loading && works.length === 0 && !adding && (
          <p className={styles.empty}>No related works yet. Click "+ Add Reason" to begin.</p>
        )}
      </div>
    </div>
  );
}
