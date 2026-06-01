'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          <img
            src="https://cdn.prod.website-files.com/68c29b083f23c6749d73589a/68c29b083f23c6749d73596d_logo-full.png"
            alt="Akshara Ananda"
          />
        </a>

        <div className="navbar-links">
          <a href="#our-story">Our Story</a>
          <a href="#project-details">Project Details</a>
          <a href="#ananda-circle">Ananda Circle</a>
        </div>

        <a href="#contact" className="navbar-cta">
          Contact Us
        </a>
      </div>
    </motion.nav>
  );
}
