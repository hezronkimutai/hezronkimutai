export interface WhyMeProps {
  className?: string;
  description?: string;
  imageUrl?: string;
  onHireClick?: () => void;
  resumeUrl?: string;
}

// Default content
export const DEFAULT_WHY_ME_CONTENT = {
  description: `Over the years, I have acquired relevant skills and experience, 
    which I shall bring to your organization. I have also worked tirelessly on my 
    communication abilities and teamwork skills, which I will put to use in my 
    future career, which would be in your organization if I am selected for the 
    position. I have given my 100% effort in my past companies, and this has 
    enabled me to recognize my capabilities and limitations. If I channelize them 
    further, they will bring fruitful results to me and also to your esteemed 
    organization.`,
  imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1720881850/HEEEEEEEEEEEEE_ljnqek.png',
  resumeUrl: 'https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing',
} as const;