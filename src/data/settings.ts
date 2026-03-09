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
	contact:  'https://api.cruciallinkconsultantslt.com/api/contacts',
	social:   'https://api.cruciallinkconsultantslt.com/api/socials',
	security: 'https://api.cruciallinkconsultantslt.com/api/settings/security',
};

