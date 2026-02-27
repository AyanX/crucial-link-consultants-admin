import React, { useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import './PasswordField.scss';

interface PasswordFieldProps {
	label: string;
	value: string;
	placeholder?: string;
	showToggle?: boolean;
	showRefresh?: boolean;
	onChange: (val: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
	label,
	value,
	placeholder,
	showRefresh = false,
	onChange,
}) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className="password-field">
			<label className="password-field__label">{label}</label>
			<div className="password-field__input-wrap">
				<input
					className="password-field__input"
					type={visible ? 'text' : 'password'}
					value={value}
					placeholder={placeholder}
					onChange={e => onChange(e.target.value)}
				/>
				<button
					type="button"
					className="password-field__toggle"
					onClick={() => setVisible(v => !v)}
					tabIndex={-1}
				>
					{showRefresh
						? <RefreshCw size={15} />
						: visible
							? <EyeOff size={15} />
							: <Eye size={15} />
					}
				</button>
			</div>
		</div>
	);
};

export default PasswordField;

