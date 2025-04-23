// Button Types
export interface CallToActionBtnProps {
  onClick: () => void;
  displayText: string;
  className: string;
}

// Landing Section Types
export interface LandingDivProps {
  resumeUrl?: string;
  className?: string;
}

// Shared Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

// State Types
export interface HomeState {
  projects: Project[];
  services: Service[];
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

// Action Types
export enum HomeActionTypes {
  FETCH_PROJECTS = 'FETCH_PROJECTS',
  FETCH_SERVICES = 'FETCH_SERVICES',
  FETCH_EXPERIENCES = 'FETCH_EXPERIENCES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}