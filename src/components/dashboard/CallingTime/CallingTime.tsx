import React from 'react';
import { Clock } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';
import { useToast } from '../../../context/ToastContext';
import { DAYS_OF_WEEK } from '../../../data/dashboard';
import './CallingTime.scss';

const CallingTime: React.FC = () => {
	const {
		callingTime, callingTimeLoading,
		updateCallingTime, submitCallingTime, callingTimeSaving,
	} = useDashboard();
	const { addToast } = useToast();

	return (
		<div className="dashboard-card">
			<div className="dashboard-card__header">
				<div className="dashboard-card__icon-wrap">
					<Clock size={18} />
				</div>
				<h2 className="dashboard-card__title">Calling Time Configuration</h2>
			</div>

			<div className="dashboard-card__body">
				<div className="field-grid">
					{/* From Day */}
					<div className="dash-field">
						<label className="dash-field__label">From Day</label>
						{callingTimeLoading ? (
							<div className="skeleton skeleton--input" />
						) : (
							<div className="select-wrap">
								<select
									className="dash-field__select"
									value={callingTime?.from_day}
									onChange={e => updateCallingTime('from_day', e.target.value)}
								>
									{DAYS_OF_WEEK.map(d => <option key={d}>{d}</option>)}
								</select>
								<span className="select-chevron">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
										stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="m6 9 6 6 6-6" />
									</svg>
								</span>
							</div>
						)}
					</div>

					{/* To Day */}
					<div className="dash-field">
						<label className="dash-field__label">To Day</label>
						{callingTimeLoading ? (
							<div className="skeleton skeleton--input" />
						) : (
							<div className="select-wrap">
								<select
									className="dash-field__select"
									value={callingTime?.to_day}
									onChange={e => updateCallingTime('to_day', e.target.value)}
								>
									{DAYS_OF_WEEK.map(d => <option key={d}>{d}</option>)}
								</select>
								<span className="select-chevron">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
										stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="m6 9 6 6 6-6" />
									</svg>
								</span>
							</div>
						)}
					</div>

					{/* Start Time */}
					<div className="dash-field">
						<label className="dash-field__label">Start Time (AM)</label>
						{callingTimeLoading ? (
							<div className="skeleton skeleton--input" />
						) : (
							<input
								className="dash-field__input dash-field__input--time"
								type="time"
								value={callingTime?.start_time}
								onChange={e => updateCallingTime('start_time', e.target.value)}
							/>
						)}
					</div>

					{/* End Time */}
					<div className="dash-field">
						<label className="dash-field__label">End Time (PM)</label>
						{callingTimeLoading ? (
							<div className="skeleton skeleton--input" />
						) : (
							<input
								className="dash-field__input dash-field__input--time"
								type="time"
								value={callingTime?.end_time}
								onChange={e => updateCallingTime('end_time', e.target.value)}
							/>
						)}
					</div>
				</div>

				<div className="dashboard-card__footer">
					<button
						className={`btn btn--dark ${callingTimeSaving ? 'btn--loading' : ''}`}
						disabled={callingTimeSaving || callingTimeLoading}
						onClick={() =>
							submitCallingTime(
								() => addToast('Calling time saved!', 'success'),
								(m) => addToast(`Error: ${m}`, 'error'),
							)
						}
					>
						{callingTimeSaving ? <><span className="spinner" /> Saving…</> : 'Submit Settings'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CallingTime;

