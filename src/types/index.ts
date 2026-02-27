export interface MetricCard {
	id: string;
	label: string;
	value: string;
	description: string;
	icon: string;
}

export interface LogEntry {
	id: string;
	message: string;
	author: string;
	time: string;
	isRecent: boolean;
}

export interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error';
}

export interface NavItem {
	label: string;
	icon: string;
	path: string;
}

export interface DashboardPayload {
	metrics: Record<string, string>;
	updatedAt: string;
}

// ── Settings ──────────────────────────────────────────
export interface ContactSettings {
	email: string;
	phone: string;
	location: string;
	city: string;
}

export interface SocialSettings {
	facebook: string;
	twitter: string;
	linkedin: string;
	supportEmail: string;
}

export interface SecuritySettings {
	adminEmail: string;
	username: string;
	currentPassword: string;
	newPassword: string;
}

export interface AllSettings {
	contact: ContactSettings;
	social: SocialSettings;
	security: SecuritySettings;
}

export type SettingsSectionKey = keyof AllSettings;


// ── Team ──────────────────────────────────────────────
export interface TeamMember {
	id: string;
	name: string;
	title: string;
	role: string;
	bio: string;
	skills: string[];
	image: string | null;
	isActive?: boolean;
}

export interface MemberFormData {
 	name: string;
 	title: string;
 	role: string;
 	bio: string;
 	skills: string[];
 	image: File | string | null;
}

export type ModalMode = 'add' | 'edit';


// ── Messages ──────────────────────────────────────────
// ── Messages ──────────────────────────────────────────
export interface Message {
	id: string;
	name: string;
	email: string;
	subject: string;
	isRead: boolean;
	created_at: string; // ISO string
	organization: string;
	message: string;
}

export interface MessagesContextValue {
	messages: Message[];
	loading: boolean;
	error: string | null;
	selectedId: string | null;
	selectMessage: (id: string) => void;
	deleteMessage: (id: string) => void;
	deletingId: string | null;
}

export interface WhyPickUsItem {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CallingTime {
  id?: number;
  from_day: string;
  to_day: string;
  start_time: string;
  end_time: string;
}

export interface WebsiteInfo {
  compliance_increase: string;
  compliance_time: string;
  client_retention: string;
  regions_served: string;
  data_points: string;
  years_of_experience:string;
  total_projects:string;
  [key: string]: unknown;
}

export interface DashboardContextValue {
	//settings
	settings:AllSettings
	saving:Partial<Record<SettingsSectionKey, boolean>>;
	updateField:<K extends keyof AllSettings>(section: K, field: keyof AllSettings[K], value: string) => void;
	saveSection:(section: keyof AllSettings, onSuccess: () => void, onError: (msg: string) => void) => Promise<void>;

	// team members
	members:TeamMember[];
	loading:boolean;
	submitting:boolean;
	addMember:(data: MemberFormData, onSuccess: () => void, onError: (msg: string) => void) => Promise<void>;
	editMember:(id: string, data: MemberFormData, onSuccess: () => void, onError: (msg: string) => void) => Promise<void>;
	deleteMember:(id: string, onSuccess: () => void, onError: (msg: string) => void) => Promise<void>;

  // Compliance
  compliance: WebsiteInfo;
  complianceLoading: boolean;
  updateCompliance: (field: keyof WebsiteInfo, val: string) => void;
  submitCompliance: (onSuccess: () => void, onError: (m: string) => void) => Promise<void>;
  complianceSaving: boolean;

  // Calling time
  callingTime: CallingTime;
  callingTimeLoading: boolean;
  updateCallingTime: (field: keyof CallingTime, val: string) => void;
  submitCallingTime: (onSuccess: () => void, onError: (m: string) => void) => Promise<void>;
  callingTimeSaving: boolean;

  // Why pick us
  whyPickUs: WhyPickUsItem[];
  whyPickUsLoading: boolean;
  addReason: (content: string, onSuccess: () => void, onError: (m: string) => void) => Promise<void>;
  editReason: (id: number, content: string, onSuccess: () => void, onError: (m: string) => void) => Promise<void>;
  deleteReason: (id: number, onSuccess: () => void, onError: (m: string) => void) => Promise<void>;
  addingReason: boolean;
  deletingReasonId: number | null;
  editingReasonId: number | null;

  // Website info (for metrics)
  webInfo: WebsiteInfo | null;

  // Unread messages count (for notification bar)
  unreadCount: number;
}



// ── Auth
export interface LoginPayload {
  email: string;
  password: string;
  rememberDevice: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  initials:string,
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    payload: LoginPayload,
    onError: (msg: string) => void
  ) => Promise<void>;
  logout: () => void;
}