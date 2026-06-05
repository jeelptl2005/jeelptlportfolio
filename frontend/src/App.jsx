import React, { useState, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Resume from './sections/Resume';
import Contact from './sections/Contact';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleMobile = () => setMobileOpen(o => !o);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Overlay with animation */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Menu Toggle Button */}
      <button
        className={`mobile-menu-toggle ${mobileOpen ? 'active' : ''}`}
        onClick={toggleMobile}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        mobileOpen={mobileOpen}
        closeMobile={closeMobile}
      />

      <main className="main-content">
        <Home />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Jeel Patel. All rights reserved.</p>
      </footer>
    </>
  );
}