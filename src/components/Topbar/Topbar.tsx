import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import './Topbar.scss';

interface TopbarProps {
	onMenuToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => (
	<header className="topbar">
		<button className="topbar__hamburger icon-btn" onClick={onMenuToggle}>
			<Menu size={20} />
		</button>

		<div className="topbar__left">
			<div className="topbar__breadcrumb">
				<span className="breadcrumb-link">Admin</span>
				<span className="breadcrumb-sep">›</span>
				<span className="breadcrumb-current">Site Content Management</span>
			</div>
			<h1 className="topbar__title">Website Statistics</h1>
		</div>

		<div className="topbar__search">
			<Search size={14} />
			<input type="text" placeholder="Search data points…" />
		</div>

		<div className="topbar__actions">
			<div className="icon-btn notification-btn">
				<Bell size={18} />
				<span className="notification-dot" />
			</div>
			<div className="avatar">JK</div>
		</div>
	</header>
);

export default Topbar;

