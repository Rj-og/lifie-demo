'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <a href="https://lifie.ai" target="_blank" rel="noopener noreferrer" className="navbar-brand">
        <div className="navbar-logo">L</div>
        <div className="navbar-name">
          Lifie <span>AI</span>
        </div>
      </a>

      <ul className="navbar-links">
        <li>
          <a href="https://lifie.ai" target="_blank" rel="noopener noreferrer" className="navbar-link">
            Platform
          </a>
        </li>
        <li>
          <a href="https://reach.lifie.ai" target="_blank" rel="noopener noreferrer" className="navbar-link">
            Lifie Reach
          </a>
        </li>
        <li>
          <a href="#features" className="navbar-link">
            Features
          </a>
        </li>
        <li>
          <a href="#demo-form" className="navbar-cta">
            Get a Demo
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
