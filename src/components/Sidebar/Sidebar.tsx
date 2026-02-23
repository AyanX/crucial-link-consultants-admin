import React from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { DynamicIcon } from '../icons/Icons';
import { NAV_ITEMS } from '../../data/metrics';
import './Sidebar.scss';

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => (
	<>
		<div
			className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--open' : ''}`}
			onClick={onClose}
		/>
		<aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
			<div className="sidebar__logo">
				<div className="logo-icon">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
						stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
						<path d="M3 3h7v7H3z" /><path d="M14 3h7v7h-7z" />
						<path d="M3 14h7v7H3z" /><path d="M14 14h7v7h-7z" />
					</svg>
				</div>
				<div className="logo-text">
					<span className="logo-name">CLC Admin</span>
					<span className="logo-sub">Consultants</span>
				</div>
			</div>

			<nav className="sidebar__nav">
				{NAV_ITEMS.map(item => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
						onClick={onClose}
					>
						<DynamicIcon name={item.icon as any} size={16} />
						{item.label}
					</NavLink>
				))}
			</nav>

			<div className="sidebar__footer">
				<button className="btn-live-site">
					<ExternalLink size={14} />
					View Live Site
				</button>
			</div>
		</aside>
	</>
);

export default Sidebar;
