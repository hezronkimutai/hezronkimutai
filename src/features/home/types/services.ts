export interface ServiceLink {
  url: string;
  img: string;
  altText?: string;
}

export interface Service {
  name: string;
  description: string;
  links: ServiceLink[];
}

export interface ServiceCardProps {
  service: Service;
  className?: string;
}

export interface ServicesProps {
  className?: string;
  services?: Service[];
}

// Sample data
export const DEFAULT_SERVICES: Service[] = [
  {
    name: 'Frontend Development',
    description: 'Proficient in the latest frontend technologies with strong design skills. Expertise in building tailored solutions.',
    links: [
      { url: '', img: 'react', altText: 'React' },
      { url: '', img: 'html', altText: 'HTML' },
      { url: '', img: 'css3', altText: 'CSS3' }
    ],
  },
  {
    name: 'Backend Development',
    description: 'Experienced in backend web development, staying updated with new technologies and trends to deliver robust solutions.',
    links: [
      { url: '', img: 'python', altText: 'Python' },
      { url: '', img: 'nodejs', altText: 'Node.js' }
    ],
  },
] as const;