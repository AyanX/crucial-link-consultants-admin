import { useState, useCallback } from 'react';
import type { MetricCard, DashboardPayload } from '../types';

interface UseMetricsReturn {
	editValues: Record<string, string>;
	editingId: string | null;
	isSaving: boolean;
	handleEditToggle: (id: string, cards: MetricCard[]) => void;
	handleValueChange: (id: string, val: string) => void;
	handleSave: (cards: MetricCard[], onSuccess: () => void, onError: (msg: string) => void) => Promise<void>;
	handleCancel: () => void;
}

export const useMetrics = (): UseMetricsReturn => {
	const [editValues, setEditValues] = useState<Record<string, string>>({});
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	const handleEditToggle = useCallback((id: string, cards: MetricCard[]) => {
		setEditingId(prev => {
			if (prev === id) return null;
			setEditValues(ev => {
				if (ev[id] !== undefined) return ev;
				const card = cards.find(c => c.id === id);
				return card ? { ...ev, [id]: card.value } : ev;
			});
			return id;
		});
	}, []);

	const handleValueChange = useCallback((id: string, val: string) => {
		setEditValues(prev => ({ ...prev, [id]: val }));
	}, []);

	const handleSave = useCallback(async (
		cards: MetricCard[],
		onSuccess: () => void,
		onError: (msg: string) => void
	) => {
		setIsSaving(true);
		setEditingId(null);

		const metricsPayload: Record<string, string> = {};
		cards.forEach(m => {
			metricsPayload[m.id] = editValues[m.id] ?? m.value;
		});

		const payload: DashboardPayload = {
			metrics: metricsPayload,
			updatedAt: new Date().toISOString(),
		};

		try {
			const res = await fetch('http://localhost:9000/api/dashboard', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error(`Server responded with ${res.status}`);
			onSuccess();
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Unknown error';
			onError(msg);
		} finally {
			setIsSaving(false);
		}
	}, [editValues]);

	const handleCancel = useCallback(() => {
		setEditValues({});
		setEditingId(null);
	}, []);

	return { editValues, editingId, isSaving, handleEditToggle, handleValueChange, handleSave, handleCancel };
};

