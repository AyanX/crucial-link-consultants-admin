
import type { WhyPickUsItem, CallingTime, WebsiteInfo } from '../types';

export const FALLBACK_WHY_PICK_US: WhyPickUsItem[] = [
	{
		id: 1,
		content: 'Certified Expertise',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: 2,
		content: 'Efficiency Driven',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: 3,
		content: 'Evidence-based methodologies leveraging local market intelligence.',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

export const FALLBACK_CALLING_TIME: CallingTime = {
	from_day: 'Monday',
	to_day: 'Friday',
	start_time: '09:00',
	end_time: '18:00',
};

export const FALLBACK_COMPLIANCE: WebsiteInfo = {
	compliance_increase: '42%',
	compliance_time: '12 Months',
};

export const DAYS_OF_WEEK = [
	'Monday', 'Tuesday', 'Wednesday',
	'Thursday', 'Friday', 'Saturday', 'Sunday',
];

export const BASE_URL = 'http://localhost:9000/api';

