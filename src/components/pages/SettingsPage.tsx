import React, { useCallback } from 'react';
import { Contact, Share2, ShieldCheck } from 'lucide-react';
import { Globe, AtSign, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../hooks/useSettings';
import SettingsSection from '../settings/SettingsSection/SettingsSection';
import SettingsField from '../settings/SettingsField/SettingsField';
import PasswordField from '../settings/PasswordField/PasswordField';
import './SettingsPage.scss';

const SettingsPage: React.FC = () => {
	const { addToast } = useToast();
	const { settings, saving, updateField, saveSection } = useSettings();

	const handleSave = useCallback(
		(section: 'contact' | 'social' | 'security') => {
			saveSection(
				section,
				() => addToast(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved!`, 'success'),
				(msg) => addToast(`Failed to save: ${msg}`, 'error'),
			);
		},
		[saveSection, addToast]
	);

	return (
		<div className="page-content settings-page">

			{/* Page header */}
			<div className="settings-page__header">
				<h1 className="settings-page__title">Admin Settings</h1>
				<p className="settings-page__subtitle">
					Manage your organization's contact details, social presence, and security preferences.
				</p>
			</div>

			{/* ── Contact Settings ── */}
			<SettingsSection
				icon={Contact}
				title="Contact Settings"
				buttonLabel="Update Contacts"
				onSave={() => handleSave('contact')}
				isSaving={!!saving.contact}
			>
				<SettingsField
					label="Email Address"
					value={settings.contact.email}
					placeholder="admin@clc-consultants.com"
					type="email"
					onChange={v => updateField('contact', 'email', v)}
				/>
				<SettingsField
					label="Phone Number"
					value={settings.contact.phone}
					placeholder="+1 (555) 000-0000"
					type="tel"
					onChange={v => updateField('contact', 'phone', v)}
				/>
				<SettingsField
					label="Location"
					value={settings.contact.location}
					placeholder="123 Corporate Way, Suite 500"
					onChange={v => updateField('contact', 'location', v)}
				/>
				<SettingsField
					label="City"
					value={settings.contact.city}
					placeholder="New York, NY"
					onChange={v => updateField('contact', 'city', v)}
				/>
			</SettingsSection>

			{/* ── Social Media Settings ── */}
			<SettingsSection
				icon={Share2}
				title="Social Media Settings"
				buttonLabel="Update Socials"
				onSave={() => handleSave('social')}
				isSaving={!!saving.social}
			>
				<SettingsField
					label="Facebook URL"
					value={settings.social.facebook}
					placeholder="facebook.com/your-page"
					icon={Globe}
					onChange={v => updateField('social', 'facebook', v)}
				/>
				<SettingsField
					label="Twitter URL"
					value={settings.social.twitter}
					placeholder="twitter.com/your-handle"
					icon={Twitter}
					onChange={v => updateField('social', 'twitter', v)}
				/>
				<SettingsField
					label="LinkedIn URL"
					value={settings.social.linkedin}
					placeholder="linkedin.com/company/your-company"
					icon={Linkedin}
					onChange={v => updateField('social', 'linkedin', v)}
				/>
				<SettingsField
					label="Social Support Email"
					value={settings.social.supportEmail}
					placeholder="social@clc.com"
					type="email"
					icon={AtSign}
					onChange={v => updateField('social', 'supportEmail', v)}
				/>
			</SettingsSection>

			{/* ── Security Settings ── */}
			<SettingsSection
				icon={ShieldCheck}
				title="Security Settings"
				buttonLabel="Update Security"
				onSave={() => handleSave('security')}
				isSaving={!!saving.security}
			>
				<SettingsField
					label="Admin Email"
					value={settings.security.adminEmail}
					placeholder="master-admin@clc.com"
					type="email"
					onChange={v => updateField('security', 'adminEmail', v)}
				/>
				<SettingsField
					label="Username"
					value={settings.security.username}
					placeholder="clc_admin_2024"
					onChange={v => updateField('security', 'username', v)}
				/>
				<PasswordField
					label="Current Password"
					value={settings.security.currentPassword}
					showToggle
					onChange={v => updateField('security', 'currentPassword', v)}
				/>
				<PasswordField
					label="New Password"
					value={settings.security.newPassword}
					placeholder="Min. 12 characters"
					showRefresh
					onChange={v => updateField('security', 'newPassword', v)}
				/>
			</SettingsSection>

		</div>
	);
};

export default SettingsPage;

