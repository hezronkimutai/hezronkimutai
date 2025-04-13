export interface TeamMember {
  imageUrl: string;
  name: string;
  webUrl: string;
  role?: string;
  description?: string;
}

export interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export interface TeamProps {
  className?: string;
  members?: TeamMember[];
}

// Sample data with corrected spelling
export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    imageUrl: 'ezrqn',
    name: 'Ezrqn Kemboi',
    webUrl: 'https://github.com/ezkemboi',
    role: 'Software Engineer',
  },
  {
    imageUrl: 'bon',
    name: 'BonVic Bundi',
    webUrl: 'https://bonvich.me/',
    role: 'Full Stack Developer',
  },
  {
    imageUrl: 'willy',
    name: 'Willy Sugira',
    webUrl: 'https://github.com/william000000',
    role: 'Software Developer',
  },
  {
    imageUrl: 'victor',
    name: 'Victor Karangwa',
    webUrl: 'https://victorkarangwa.com',
    role: 'Software Engineer',
  },
  {
    imageUrl: 'bena',
    name: 'Benard Kitungu',
    webUrl: 'https://kitingu.com',
    role: 'Full Stack Developer',
  },
  {
    imageUrl: 'ivy',
    name: 'Ivy Nzioka',
    webUrl: 'https://github.com/nziokaivy',
    role: 'Software Developer',
  },
] as const;