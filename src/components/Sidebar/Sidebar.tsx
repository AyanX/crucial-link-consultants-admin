import React from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { DynamicIcon } from '../icons/Icons';
import { NAV_ITEMS } from '../../data/metrics';
import './Sidebar.scss';
import logo from "../../assets/logo.webp"
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
				  <img src={logo} alt="CLC Logo" />
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
				<a href='https://cruciallinkconsultantslt.com' target='_blank' rel='noopener noreferrer'>
					<button className="btn-live-site">
						<ExternalLink size={14} />
						View Live Site
					</button>
				</a>
			</div>
		</aside>
	</>
);

export default Sidebar;
