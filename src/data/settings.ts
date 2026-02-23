import type { AllSettings } from '../types';

export const INITIAL_SETTINGS: AllSettings = {
	contact: {
		email: 'admin@clc-consultants.com',
		phone: '+1 (555) 000-0000',
		location: '123 Corporate Way, Suite 500',
		city: 'New York, NY',
	},
	social: {
		facebook: 'facebook.com/clc-official',
		twitter: 'twitter.com/clc_consultants',
		linkedin: 'linkedin.com/company/clc',
		supportEmail: 'social@clc.com',
	},
	security: {
		adminEmail: 'master-admin@clc.com',
		username: 'clc_admin_2024',
		currentPassword: '••••••••',
		newPassword: '',
	},
};

export const SETTINGS_API_ENDPOINTS: Record<string, string> = {
	contact:  'http://localhost:9000/api/settings/contact',
	social:   'http://localhost:9000/api/settings/social',
	security: 'http://localhost:9000/api/settings/security',
};

