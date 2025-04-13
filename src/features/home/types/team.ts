export interface TeamMember {
  /**
   * URL to team member's image
   */
  imageUrl: string;

  /**
   * Team member's full name
   */
  name: string;

  /**
   * URL to team member's website/portfolio
   */
  webUrl: string;

  /**
   * Optional role/title of the team member
   */
  role?: string;

  /**
   * Optional social media links
   */
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export interface TeamData {
  /**
   * Section title
   */
  title: string;

  /**
   * List of team members
   */
  members: TeamMember[];
}

/**
 * Default team members data
 */
export const defaultTeamMembers: TeamMember[] = [
  {
    imageUrl: 'ezrqn',
    name: 'Ezrqn Kemboi',
    webUrl: 'https://github.com/ezkemboi',
    role: 'Software Engineer',
    socials: {
      github: 'https://github.com/ezkemboi',
    },
  },
  {
    imageUrl: 'bon',
    name: 'BonVic Bundi',
    webUrl: 'https://bonvich.me/',
    role: 'Full Stack Developer',
    socials: {
      portfolio: 'https://bonvich.me/',
    },
  },
  {
    imageUrl: 'willy',
    name: 'Willy Sugira',
    webUrl: 'https://github.com/william000000',
    role: 'Software Developer',
    socials: {
      github: 'https://github.com/william000000',
    },
  },
  {
    imageUrl: 'victor',
    name: 'Victor Karangwa',
    webUrl: 'https://victorkarangwa.com',
    role: 'Software Engineer',
    socials: {
      portfolio: 'https://victorkarangwa.com',
    },
  },
  {
    imageUrl: 'bena',
    name: 'Benard Kitungu',
    webUrl: 'https://kitingu.com',
    role: 'Full Stack Developer',
    socials: {
      portfolio: 'https://kitingu.com',
    },
  },
  {
    imageUrl: 'ivy',
    name: 'Ivy Nzioka',
    webUrl: 'https://github.com/nziokaivy',
    role: 'Software Engineer',
    socials: {
      github: 'https://github.com/nziokaivy',
    },
  },
];

/**
 * Default section title
 */
export const defaultTitle = 'Our Team';