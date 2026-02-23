import { useState, useCallback } from 'react';
import type { AllSettings, SettingsSectionKey } from '../types';
import { INITIAL_SETTINGS, SETTINGS_API_ENDPOINTS } from '../data/settings';

type SavingState = Partial<Record<SettingsSectionKey, boolean>>;

interface UseSettingsReturn {
	settings: AllSettings;
	saving: SavingState;
	updateField: <K extends SettingsSectionKey>(
		section: K,
		field: keyof AllSettings[K],
		value: string
	) => void;
	saveSection: (
		section: SettingsSectionKey,
		onSuccess: () => void,
		onError: (msg: string) => void
	) => Promise<void>;
}

export const useSettings = (): UseSettingsReturn => {
	const [settings, setSettings] = useState<AllSettings>(INITIAL_SETTINGS);
	const [saving, setSaving] = useState<SavingState>({});

	const updateField = useCallback(<K extends SettingsSectionKey>(
		section: K,
		field: keyof AllSettings[K],
		value: string
	) => {
		setSettings(prev => ({
			...prev,
			[section]: { ...prev[section], [field]: value },
		}));
	}, []);

	const saveSection = useCallback(async (
		section: SettingsSectionKey,
		onSuccess: () => void,
		onError: (msg: string) => void
	) => {
		setSaving(prev => ({ ...prev, [section]: true }));
		try {
			const res = await fetch(SETTINGS_API_ENDPOINTS[section], {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					section,
					data: settings[section],
					updatedAt: new Date().toISOString(),
				}),
			});
			if (!res.ok) throw new Error(`Server responded with ${res.status}`);
			onSuccess();
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Unknown error';
			onError(msg);
		} finally {
			setSaving(prev => ({ ...prev, [section]: false }));
		}
	}, [settings]);

	return { settings, saving, updateField, saveSection };
};

