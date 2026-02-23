import type { MetricCard, LogEntry, NavItem } from '../types';

export const INITIAL_METRICS: MetricCard[] = [
	{
		id: 'total_projects',
		label: 'Total Projects',
		value: '1,240+',
		description: "Displayed in the 'Impact' section of the homepage.",
		icon: 'LayoutDashboard',
	},
	{
		id: 'regions_served',
		label: 'Regions Served',
		value: '48 Countries',
		description: 'Used for the global coverage map visualization.',
		icon: 'Globe',
	},
	{
		id: 'client_retention',
		label: 'Client Retention Rate',
		value: '98.5%',
		description: 'Highlight of the annual shareholder report module.',
		icon: 'UserCheck',
	},
	{
		id: 'data_points',
		label: 'Data Points Analyzed',
		value: '12.4 Billion',
		description: "Showcases the scale of CLC's proprietary algorithms.",
		icon: 'Database',
	},
	{
		id: 'compliance',
		label: 'Compliance Increase',
		value: '42% Avg.',
		description: 'Key benefit metric displayed for new corporate clients.',
		icon: 'Shield',
	},
	{
		id: 'experience',
		label: 'Years of Experience',
		value: '25 Years',
		description: 'Historical trust metric for the "About Us" page.',
		icon: 'Award',
	},
];

export const LOG_ENTRIES: LogEntry[] = [
	{
		id: '1',
		message: 'Compliance Increase updated from 38% to 42%',
		author: 'Admin Sarah M.',
		time: '2 HOURS AGO',
		isRecent: true,
	},
	{
		id: '2',
		message: 'Regions Served incremented to 48 countries',
		author: 'System Auto-Update',
		time: 'Yesterday',
		isRecent: false,
	},
	{
		id: '3',
		message: 'Total Projects threshold reached: 1,200+',
		author: 'Admin James K.',
		time: '3 DAYS AGO',
		isRecent: false,
	},
];

export const NAV_ITEMS: NavItem[] = [
	{ label: 'Dashboard',    icon: 'LayoutDashboard', path: '/dashboard' },
	{ label: 'Site Content', icon: 'FileText',        path: '/site-content' },
	{ label: 'Messages',     icon: 'FolderOpen',      path: '/messages' },
	{ label: 'Team',         icon: 'Users',           path: '/team' },
	{ label: 'Settings',     icon: 'Settings',        path: '/settings' },
];

