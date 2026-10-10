import { EducationItem, Profile, Project, Skill } from '../types';

export const STUDENT = {
  fullName: 'Munyaneza Ngabo',
  registrationNumber: '25/27861',
  verificationCode: 'MOB-A2-7861',
  appName: 'MNPortfolio',
  version: '1.0.0',
};

export const DEFAULT_PROFILE: Profile = {
  fullName: 'Munyaneza Ngabo',
  headline: 'Junior Mobile & Web Developer',
  bio:
    'I am a Software Engineering student at INES-Ruhengeri with a strong interest in mobile application development. I enjoy turning real problems into simple, offline-first apps using React Native and TypeScript. I am currently looking for an internship where I can grow as a developer.',
  primarySkill: 'React Native',
  availability: 'Open to internship',
  imageUri: null,
};

export const SKILLS: Skill[] = [
  { id: 's1', name: 'React Native', level: 4 },
  { id: 's2', name: 'TypeScript', level: 4 },
  { id: 's3', name: 'JavaScript', level: 4 },
  { id: 's4', name: 'Git & GitHub', level: 3 },
  { id: 's5', name: 'UI/UX Design', level: 3 },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'e1',
    title: 'BSc Software Engineering',
    institution: 'INES-Ruhengeri',
    period: '2025 – Present',
  },
  {
    id: 'e2',
    title: 'Advanced Level (PCM)',
    institution: 'Secondary School',
    period: '2023 – 2025',
  },
  {
    id: 'e3',
    title: 'Responsive Web Design Certificate',
    institution: 'freeCodeCamp',
    period: '2024',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Student Task Manager',
    problem:
      'Students often forget assignment deadlines and lose track of what to submit next.',
    contribution:
      'I designed and built the full mobile UI in React Native and implemented local persistence with AsyncStorage so tasks survive app restarts.',
    tech: ['React Native', 'TypeScript', 'AsyncStorage'],
    summary:
      'A simple offline-first task manager that helps students track assignments, deadlines and priorities.',
  },
  {
    id: 'p2',
    title: 'Local Market Price App',
    problem:
      'Small-scale farmers lack quick access to current market prices and often sell at unfair rates.',
    contribution:
      'I designed the mobile screens and built an offline cache so users can browse the last known prices even without internet.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    summary:
      'A mobile app that shows daily market prices for common crops, with offline caching for low-connectivity areas.',
  },
];