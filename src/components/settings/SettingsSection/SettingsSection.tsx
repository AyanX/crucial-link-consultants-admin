import React from 'react';
import './SettingsSection.scss';

interface SettingsSectionProps {
	icon: React.ComponentType<{ size?: number; className?: string }>;
	title: string;
	children: React.ReactNode;
	buttonLabel: string;
	onSave: () => void;
	isSaving: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
	icon: Icon,
	title,
	children,
	buttonLabel,
	onSave,
	isSaving,
}) => (
	<section className="settings-section">
		<div className="settings-section__header">
			<div className="settings-section__icon-wrap">
				<Icon size={18} />
			</div>
			<h2 className="settings-section__title">{title}</h2>
		</div>

		<div className="settings-section__body">
			{children}
		</div>

		<div className="settings-section__footer">
			<button
				className={`btn btn--primary ${isSaving ? 'btn--loading' : ''}`}
				onClick={onSave}
				disabled={isSaving}
			>
				{isSaving
					? <><span className="spinner" /> Saving…</>
					: buttonLabel
				}
			</button>
		</div>
	</section>
);

export default SettingsSection;

