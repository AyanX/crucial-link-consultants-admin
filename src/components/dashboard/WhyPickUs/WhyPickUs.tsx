import React, { useState } from 'react';
import { ThumbsUp, Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';
import { useToast } from '../../../context/ToastContext';
import './WhyPickUs.scss';

const WhyPickUs: React.FC = () => {
	const {
		whyPickUs, whyPickUsLoading,
		addReason, editReason, deleteReason,
		addingReason, deletingReasonId, editingReasonId,
	} = useDashboard();
	const { addToast } = useToast();

	const [showAddInput, setShowAddInput] = useState(false);
	const [newContent, setNewContent]     = useState('');
	const [editingId, setEditingId]       = useState<number | null>(null);
	const [editContent, setEditContent]   = useState('');

	const handleAdd = async () => {
		if (!newContent.trim()) return;
		await addReason(
			newContent.trim(),
			() => { addToast('Reason added!', 'success'); setNewContent(''); setShowAddInput(false); },
			(m) => addToast(`Error: ${m}`, 'error'),
		);
	};

	const handleEdit = async (id: number) => {
		if (!editContent.trim()) return;
		await editReason(
			id,
			editContent.trim(),
			() => { addToast('Reason updated!', 'success'); setEditingId(null); },
			(m) => addToast(`Error: ${m}`, 'error'),
		);
	};

	const handleDelete = (id: number) => {
		deleteReason(
			id,
			() => addToast('Reason deleted.', 'success'),
			(m) => addToast(`Error: ${m}`, 'error'),
		);
	};

	const startEdit = (id: number, content: string) => {
		setEditingId(id);
		setEditContent(content);
	};

	return (
		<div className="dashboard-card">
			<div className="dashboard-card__header">
				<div className="dashboard-card__header-left">
					<div className="dashboard-card__icon-wrap dashboard-card__icon-wrap--green">
						<ThumbsUp size={18} />
					</div>
					<h2 className="dashboard-card__title">Why Pick Us Management</h2>
				</div>
				<button
					className="btn-add-reason"
					onClick={() => setShowAddInput(v => !v)}
				>
					<Plus size={14} />
					Add Reason
				</button>
			</div>

			{/* Add input */}
			{showAddInput && (
				<div className="wpu-add-row">
					<input
						className="wpu-add-input"
						placeholder="Enter new reason…"
						value={newContent}
						onChange={e => setNewContent(e.target.value)}
						onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setShowAddInput(false); }}
						autoFocus
					/>
					<button
						className="wpu-icon-btn wpu-icon-btn--confirm"
						onClick={handleAdd}
						disabled={addingReason}
					>
						{addingReason ? <span className="spinner spinner--sm" /> : <Check size={14} />}
					</button>
					<button
						className="wpu-icon-btn wpu-icon-btn--cancel"
						onClick={() => { setShowAddInput(false); setNewContent(''); }}
					>
						<X size={14} />
					</button>
				</div>
			)}

			<div className="dashboard-card__body wpu-body">
				{whyPickUsLoading ? (
					// Skeleton loader
					<>
						{[1, 2, 3].map(i => (
							<div key={i} className="wpu-skeleton">
								<div className="skeleton skeleton--circle" />
								<div className="skeleton skeleton--wpu-text" />
								<div className="skeleton skeleton--wpu-actions" />
							</div>
						))}
					</>
				) : whyPickUs?.length === 0 ? (
					<div className="wpu-empty">No reasons yet. Add one above.</div>
				) : (
					whyPickUs?.map(item => {
						const isDeleting = deletingReasonId === item.id;
						const isSavingEdit = editingReasonId === item.id;
						const isEditing = editingId === item.id;

						return (
							<div
								key={item.id}
								className={`wpu-item ${isDeleting ? 'wpu-item--deleting' : ''}`}
							>
								{isEditing ? (
									<>
										<div className="wpu-item__check-icon">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
												stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
												<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
												<path d="m9 12 2 2 4-4" />
											</svg>
										</div>
										<input
											className="wpu-edit-input"
											value={editContent}
											onChange={e => setEditContent(e.target.value)}
											onKeyDown={e => {
												if (e.key === 'Enter') handleEdit(item.id);
												if (e.key === 'Escape') setEditingId(null);
											}}
											autoFocus
										/>
										<div className="wpu-item__actions">
											<button
												className="wpu-icon-btn wpu-icon-btn--confirm"
												onClick={() => handleEdit(item.id)}
												disabled={isSavingEdit}
											>
												{isSavingEdit
													? <span className="spinner spinner--sm" />
													: <Check size={13} />}
											</button>
											<button
												className="wpu-icon-btn wpu-icon-btn--cancel"
												onClick={() => setEditingId(null)}
											>
												<X size={13} />
											</button>
										</div>
									</>
								) : (
									<>
										<div className="wpu-item__check-icon">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
												stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
												<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
												<path d="m9 12 2 2 4-4" />
											</svg>
										</div>
										<span className="wpu-item__content">{item.content}</span>
										<div className="wpu-item__actions">
											<button
												className="wpu-icon-btn wpu-icon-btn--edit"
												onClick={() => startEdit(item.id, item.content)}
												disabled={isDeleting}
												title="Edit"
											>
												<Pencil size={13} />
											</button>
											<button
												className="wpu-icon-btn wpu-icon-btn--delete"
												onClick={() => handleDelete(item.id)}
												disabled={isDeleting}
												title="Delete"
											>
												{isDeleting
													? <span className="spinner spinner--sm spinner--dark" />
													: <Trash2 size={13} />}
											</button>
										</div>
									</>
								)}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default WhyPickUs;

