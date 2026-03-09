import React from 'react';
import {
	LayoutDashboard, FileText, FolderOpen, Users, Settings,
	ExternalLink, Search, Bell, Pencil, Check, Save, X,
	Info, History, TrendingUp, Globe, UserCheck, Database,
	Shield, Award, Menu, ArrowRight, CheckCircle, XCircle,Handshake ,
	Briefcase,
} from 'lucide-react';

export const iconMap = {
	LayoutDashboard,
	FileText,
	FolderOpen,
	Briefcase,
	Users,
	Settings,
	ExternalLink,
	Search,
	Bell,
	Pencil,
	Handshake ,
	Check,
	Save,
	X,
	Info,
	History,
	TrendingUp,
	Globe,
	UserCheck,
	Database,
	Shield,
	Award,
	Menu,
	ArrowRight,
	CheckCircle,
	XCircle,
} as const;

export type IconName = keyof typeof iconMap;

interface DynamicIconProps {
	name: IconName;
	size?: number;
	className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size = 16, className }) => {
	const Comp = iconMap[name];
	return Comp ? <Comp size={size} className={className} /> : null;
};

