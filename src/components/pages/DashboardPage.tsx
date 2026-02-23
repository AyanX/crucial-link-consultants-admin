import React from 'react';
import NotificationBar from '../dashboard/NotificationBar/NotificationBar';
import ComplianceSettings from '../dashboard/ComplianceSettings/ComplianceSettings';
import CallingTime from '../dashboard/CallingTime/CallingTime';
import WhyPickUs from '../dashboard/WhyPickUs/WhyPickUs';
import './DashboardPage.scss';

const DashboardPage: React.FC = () => (
	<div className="dashboard-page">
		<NotificationBar />

		<div className="dashboard-page__content">
			<ComplianceSettings />
			<CallingTime />
			<WhyPickUs />
		</div>
	</div>
);

export default DashboardPage;

