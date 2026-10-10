export type Availability =
  | 'Open to internship'
  | 'Open to freelance'
  | 'Open to full-time'
  | 'Not available';

export interface Profile {
  fullName: string;
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  imageUri: string | null;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  contribution: string;
  tech: string[];
  summary: string;
}

export type RootStackParamList = {
  Tabs: undefined;
  ProjectDetails: { projectId: string };
};

export type TabParamList = {
  Home: undefined;
  Skills: undefined;
  Projects: undefined;
  Editor: undefined;
  About: undefined;
};