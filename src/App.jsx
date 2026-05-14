import { useState, useCallback, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Apply theme to <html> element whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Loading screen */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Main content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease 0.2s',
        }}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main>
          <Hero />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
