export interface Project {
  name: string;
  imageUrl: string;
  link: string;
  description: string;
}

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export interface ProjectsProps {
  className?: string;
  itemsPerPage?: number;
  projects?: Project[];
}

// Constants
export const ITEMS_PER_PAGE = 3;

// Sample data
export const SAMPLE_PROJECTS: Project[] = [
  {
    name: 'Tikiti',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://tikiti-theta.vercel.app/',
    description: 'Tikiti is a ticketing platform designed to streamline event management and ticket sales.',
  },
  {
    name: 'The Saniak Group',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://thesaniakgroup.vercel.app/',
    description: 'The Saniak Group is an innovative business solutions provider for small and medium-sized enterprises.',
  },
  // ... other projects
] as const;