import React, { useState } from 'react';
import { 
  Footer,
  TopBar,
} from '../../components';
import styles from './Home.module.scss';

export type ThemeMode = 'light' | 'dark';

export const Home: React.FC = () => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleScrollCapture = (e: React.UIEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.container} ${styles[mode]}`}
      data-testid="home-container"
      onScroll={handleScrollCapture}
      onScrollCapture={handleScrollCapture}
    >
      <TopBar 
        mode={mode}
        onToggleMode={toggleMode}
        className={styles.topBar}
      />
      
      <main className={styles.main}>
        {/* These components will be uncommented as they are migrated */}
        {/* <LandingDiv /> */}
        {/* <WhyMe /> */}
        {/* <Services /> */}
        {/* <Projects /> */}
        {/* <Team /> */}
      </main>
      
      <Footer />
    </div>
  );
};

Home.displayName = 'Home';

export default Home;