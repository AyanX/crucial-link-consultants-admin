import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';
import { useToast } from '../../../context/ToastContext';
import './ComplianceSettings.scss';

const ComplianceSettings: React.FC = () => {
	const { compliance, complianceLoading, updateCompliance, submitCompliance, complianceSaving } = useDashboard();
	const { addToast } = useToast();

    console.log('Compliance Settings Rendered', { compliance, complianceLoading, complianceSaving });
	return (
		<div className="dashboard-card">
			<div className="dashboard-card__header">
				<div className="dashboard-card__icon-wrap">
					<ShieldCheck size={18} />
				</div>
				<h2 className="dashboard-card__title">Compliance Settings</h2>
			</div>

			<div className="dashboard-card__body">
				<div className="field-grid">
					<div className="dash-field">
						<label className="dash-field__label">Compliance Increase (%)</label>
						{complianceLoading ? (
							<div className="skeleton skeleton--input" />
						) : (
							<input
								className="dash-field__input"
								value={compliance?.compliance_increase}
								onChange={e => updateCompliance('compliance_increase', e.target.value)}
								placeholder="e.g. 42%"
							/>
						)}
					</div>

					<div className="dash-field">
						<label className="dash-field__label">Period (Months)</label>
						{complianceLoading ? (
							<div className="skeleton skeleton--input" />
						) : (
							<input
								className="dash-field__input"
								value={compliance?.compliance_time}
								onChange={e => updateCompliance('compliance_time', e.target.value)}
								placeholder="e.g. 12 Months"
							/>
						)}
					</div>
				</div>

				<div className="dashboard-card__footer">
					<button
						className={`btn btn--dark ${complianceSaving ? 'btn--loading' : ''}`}
						disabled={complianceSaving || complianceLoading}
						onClick={() =>
							submitCompliance(
								() => addToast('Compliance settings saved!', 'success'),
								(m) => addToast(`Error: ${m}`, 'error'),
							)
						}
					>
						{complianceSaving ? <><span className="spinner" /> Saving…</> : 'Submit Settings'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ComplianceSettings;

