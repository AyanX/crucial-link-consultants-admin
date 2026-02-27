import type { Message } from '../types';

export const FALLBACK_MESSAGES: Message[] = [
  {
    id: 'msg-001',
    name: 'Sarah Jenkins',
    email: 's.jenkins@example.com',
    subject: 'Dummy Data for Testing',
    isRead: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    organization: 'Global Health Initiative',
    message:
      '"Hello CLC Team, we are interested in your specialized training for our upcoming maternal health project in East Africa. Could you provide more details on the multi-day ODK and data visualization workshop formats?"',
  },
  {
    id: 'msg-002',
    name: 'Michael Chen',
    email: 'm.chen@datastrategy.io',
    subject: 'Dummy Data for Testing',
    isRead: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(), // yesterday
    organization: 'DataStrategy IO',
    message:
      'Hi, we are looking to engage CLC Consultants for a comprehensive data strategy review ahead of our Q1 2026 planning cycle. Could we schedule a discovery call this week?',
  },
  {
    id: 'msg-003',
    name: 'Amina Okoro',
    email: 'a.okoro@westafricapartners.org',
    subject: 'Dummy Data for Testing',
    isRead: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    organization: 'West Africa Partners NGO',
    message:
      'Dear CLC Team, our organization is exploring partnerships with specialized M&E firms to support field operations across Nigeria, Ghana, and Senegal. We would love to learn more about your regional capabilities and previous engagements.',
  },
];
