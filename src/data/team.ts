import type { TeamMember } from '../types';

export const DUMMY_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Jefferson Mwaisaka',
    title: 'PhD / Technical Lead',
    role: 'Admin (Full Access)',
    bio: 'Jefferson leads the core engineering team with over 10 years of experience in distributed systems and cloud infrastructure.',
    skills: ['TypeScript', 'System Design', 'Leadership'],
    image: null,
    isActive: true,
  },
  {
    id: '2',
    name: 'Collins Mudogo',
    title: 'PhD / Senior Engineer',
    role: 'Editor',
    bio: 'Collins specializes in backend architecture and has a deep background in database optimization and API design.',
    skills: ['Node.js', 'PostgreSQL', 'Redis'],
    image: null,
    isActive: false,
  },
  {
    id: '3',
    name: 'Benson Omor',
    title: 'PhD / Systems Architect',
    role: 'Editor',
    bio: 'Benson designs scalable system architectures and oversees cross-team technical alignment.',
    skills: ['Kubernetes', 'AWS', 'Terraform'],
    image: null,
    isActive: false,
  },
  {
    id: '4',
    name: 'Wango Ishmael',
    title: 'PhD / Frontend Developer',
    role: 'Viewer',
    bio: 'Wango crafts performant, accessible user interfaces with a focus on design systems and component libraries.',
    skills: ['React', 'SCSS', 'Figma'],
    image: null,
    isActive: false,
  },
  {
    id: '5',
    name: 'George Vihasi',
    title: 'PhD / Backend Developer',
    role: 'Viewer',
    bio: 'George builds robust server-side solutions and REST/GraphQL APIs powering the CLC platform.',
    skills: ['Go', 'GraphQL', 'Docker'],
    image: null,
    isActive: false,
  },
];

export const ROLE_OPTIONS = [
  'Admin (Full Access)',
  'Editor',
  'Viewer',
  'Contributor',
  'Support',
] as const;

export const AVATAR_COLORS = [
  '#e8d5b7', '#d4b8a0', '#c9a882',
  '#b8976a', '#a07850', '#8a6040',
];
export const INITIAL_TEAM = [];
