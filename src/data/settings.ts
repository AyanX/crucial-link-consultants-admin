import type { AllSettings } from '../types';

export const INITIAL_SETTINGS: AllSettings = {
	contact: {
		email: '',
		phone: '+254 ',
		location: '',
		city: '',
	},
	social: {
		facebook: '',
		twitter: '',
		linkedin: '',
		supportEmail: '',
	},
	security: {
		adminEmail: '',
		username: '',
		currentPassword: '',
		newPassword: '',
	},
};

export const SETTINGS_API_ENDPOINTS: Record<string, string> = {
	contact:  'http://localhost:9000/api/contacts',
	social:   'http://localhost:9000/api/socials',
	security: 'http://localhost:9000/api/settings/security',
};

