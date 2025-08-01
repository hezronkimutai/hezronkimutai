import { ReactNode } from 'react';

// Common interfaces and types
export interface Route {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}

// Component Props
export interface BlogProps {
  title?: string;
  posts?: Array<BlogPost>;
  loading?: boolean;
  error?: string;
}

export interface ProjectProps {
  name: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface LandingDivProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export interface FooterProps {
  socialLinks?: Array<SocialLink>;
  copyright?: string;
}

// API Response Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author?: string;
  tags?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  location?: string;
  achievements?: string[];
}

// Utility Types
export type ImageType = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
  label?: string;
};