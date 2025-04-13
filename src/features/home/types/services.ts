export interface ServiceLink {
  /**
   * URL for the technology/service link
   */
  url: string;

  /**
   * Image source URL/path for the technology icon
   */
  img: string;

  /**
   * Alt text for the technology icon
   */
  alt?: string;
}

export interface Service {
  /**
   * Name of the service offered
   */
  name: string;

  /**
   * Detailed description of the service
   */
  description: string;

  /**
   * List of technology links related to this service
   */
  links: ServiceLink[];
}

export interface ServicesData {
  /**
   * Title for the services section
   */
  title: string;

  /**
   * List of services offered
   */
  services: Service[];
}

/**
 * Default services data
 */
export const defaultServices: Service[] = [
  {
    name: 'Frontend Development',
    description: 'Proficient in the latest frontend technologies with strong design skills. Expertise in building tailored solutions.',
    links: [
      { url: '', img: 'react', alt: 'React' },
      { url: '', img: 'html', alt: 'HTML' },
      { url: '', img: 'css3', alt: 'CSS3' }
    ],
  },
  {
    name: 'Backend Development',
    description: 'Experienced in backend web development, staying updated with new technologies and trends to deliver robust solutions.',
    links: [
      { url: '', img: 'python', alt: 'Python' },
      { url: '', img: 'nodeJs', alt: 'Node.js' }
    ],
  },
];