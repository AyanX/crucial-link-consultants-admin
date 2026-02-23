import React from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../../context/DashboardContext';
import './NotificationBar.scss';

const NotificationBar: React.FC = () => {
	const { unreadCount } = useDashboard();
	const navigate = useNavigate();

	if (unreadCount === 0) return null;

	return (
		<div className="notification-bar">
			<div className="notification-bar__left">
				<Mail size={18} />
				<span className="notification-bar__text">
					<strong>{unreadCount}</strong> Unread Message{unreadCount !== 1 ? 's' : ''}
				</span>
			</div>
			<button
				className="notification-bar__btn"
				onClick={() => navigate('/messages')}
			>
				View Messages
			</button>
		</div>
	);
};

export default NotificationBar;

