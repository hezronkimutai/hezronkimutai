import React from 'react';
import images from '../../../../components/images';
import styles from './TopBar.module.scss';

interface TopBarProps {
  mode: 'light' | 'dark';
  onToggleMode: () => void;
  className?: string;
}

const socialLinks = [
  {
    link: 'https://github.com/hezronkimutai/portfolio',
    imgUrl: 'github',
    title: 'View Source on GitHub',
  },
];

export const TopBar: React.FC<TopBarProps> = ({ 
  mode, 
  onToggleMode,
  className = '' 
}) => {
  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <div className={styles.socialLinks}>
        {socialLinks.map((lnk) => (
          <a
            key={lnk.link}
            href={lnk.link}
            target="_blank"
            rel="noopener noreferrer"
            title={lnk.title}
            className={styles.socialLink}
          >
            <img
              alt={lnk.title}
              className={styles.socialIcon}
              src={images[lnk.imgUrl as keyof typeof images]}
              loading="lazy"
            />
          </a>
        ))}
      </div>
      
      <div className={styles.themeToggle}>
        <button
          onClick={onToggleMode}
          className={`${styles.toggleButton} ${styles[mode]}`}
          type="button"
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          <div className={styles.toggleIndicator} />
        </button>
      </div>
    </div>
  );
};

TopBar.displayName = 'TopBar';

export default TopBar;