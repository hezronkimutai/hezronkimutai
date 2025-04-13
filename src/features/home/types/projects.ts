export interface Project {
  /**
   * Name of the project
   */
  name: string;

  /**
   * URL to project's image/thumbnail
   */
  imageUrl: string;

  /**
   * URL to live project or repository
   */
  link: string;

  /**
   * Project description
   */
  description: string;
}

export interface ProjectsData {
  /**
   * Default number of items to show per page
   */
  readonly ITEMS_PER_PAGE: number;

  /**
   * List of all projects
   */
  projects: Project[];
}

/**
 * Default number of items to display per page
 */
export const ITEMS_PER_PAGE = 3;

/**
 * Default projects data
 */
export const defaultProjects: Project[] = [
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
  {
    name: 'The Nyongi Group',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://thenyongigroup.vercel.app/',
    description: 'The Nyongi Group focuses on impactful community initiatives and business development.',
  },
  {
    name: 'LIF Community',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://lifcommunity.vercel.app/',
    description: 'LIF Community is a platform fostering connections and collaborations within local communities.',
  },
  {
    name: 'The HK Group',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://thehkgroup.vercel.app/',
    description: 'The HK Group provides comprehensive services for business and organizational growth.',
  },
  {
    name: 'Merigo Round Angular',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://merigoroundangular.vercel.app/home',
    description: 'Merigo Round Angular is the Angular version of the Merigo Round project, aimed at automating group funding.',
  },
  {
    name: 'POS FN ReactJS',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://pos-fn-reactjs.vercel.app/',
    description: 'POS FN ReactJS is a refined POS project built using ReactJS, promoting open-source collaboration.',
  },
  {
    name: 'Havalive',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://havalive.netlify.app/',
    description: 'Havalive provides live updates on sports events, including scores, analysis, and lineups.',
  },
  {
    name: 'Merigo Round',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'https://nyongiot-frontend.vercel.app',
    description: 'Merigo Round is aimed at automating group funding, facilitating ROSCAs with transparency and efficiency.',
  },
  {
    name: 'POS',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1720883600/POSSS-removebg-preview_iunknt.png',
    link: 'https://pos-fn-reactjs.vercel.app/',
    description: 'POS (Paid Open Source) increases open source project frequency by attaching participatory price tags.',
  },
  {
    name: 'TIC TAC TOE',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1720883292/tic-tac-toe_zdpv5z.png',
    link: 'https://tic-tac-toe-2-zeta.vercel.app/',
    description: 'Tic Tac Toe is a classic game where the player competes against the computer with challenging AI.',
  },
  {
    name: 'Havascore',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905050/goal_lgqofp.png',
    link: 'https://havascore.netlify.app/',
    description: 'Havascore provides real-time sports updates, analysis, statistics, and comprehensive coverage.',
  },
  {
    name: 'Speech Dictionary',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'https://dictaspeak-bj5qb18ee-hezronkimutais-projects.vercel.app/',
    description: 'Speech Dictionary helps users learn words through speech recognition and pronunciation guides.',
  },
  {
    name: 'AI Image Generator',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1721660120/Featured-image-AI-image-generators-by-Midjourney_ifbtsy.webp',
    link: 'https://cordata-test.vercel.app/',
    description: 'AI-powered image generation tool for creating unique and customized visuals.',
  },
  {
    name: 'Cloud Fanatics',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'https://cloudfanatics.vercel.app/',
    description: 'Cloud Fanatics - A platform for cloud computing enthusiasts and professionals.',
  },
];