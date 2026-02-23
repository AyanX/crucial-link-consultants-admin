import React from 'react';
import './SettingsField.scss';

interface SettingsFieldProps {
	label: string;
	value: string;
	placeholder?: string;
	type?: string;
	icon?: React.ComponentType<{ size?: number; className?: string }>;
	onChange: (val: string) => void;
}

const SettingsField: React.FC<SettingsFieldProps> = ({
	label,
	value,
	placeholder,
	type = 'text',
	icon: Icon,
	onChange,
}) => (
	<div className="settings-field">
		<label className="settings-field__label">{label}</label>
		<div className="settings-field__input-wrap">
			{Icon && (
				<span className="settings-field__icon">
					<Icon size={14} />
				</span>
			)}
			<input
				className={`settings-field__input ${Icon ? 'settings-field__input--icon' : ''}`}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	</div>
);

export default SettingsField;

