'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const linkColumn1 = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Project Overview', href: '#project-overview' },
    { label: 'Organic Farm Estate', href: '#organic-farm' },
    { label: 'Luxury Private Residences', href: '#residences' },
    { label: 'Wellness Resort', href: '#wellness-resort' },
  ];

  const linkColumn2 = [
    { label: 'Voices of Ananda', href: '#voices' },
    { label: 'Events at Ananda', href: '#events' },
    { label: 'Thoughts by Ananda', href: '#thoughts' },
    { label: 'Contact us', href: '#contact' },
  ];

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Main Grid */}
      <div className="footer-grid">
        {/* Column 1 — Logo & Contact */}
        <div>
          <div className="footer-logo">
            <img
              src="https://cdn.prod.website-files.com/68c29b083f23c6749d73589a/68c29b083f23c6749d73596d_logo-full.png"
              alt="Akshara Ananda"
            />
          </div>

          <a href="tel:+919555800400" className="footer-contact-item">
            +91 9555 800 400
          </a>
          <a href="mailto:info@aksharaprojects.com" className="footer-contact-item">
            info@aksharaprojects.com
          </a>
        </div>

        {/* Column 2 — Navigation Links */}
        <div>
          <h4 className="footer-column-title">Explore</h4>
          {linkColumn1.map((link) => (
            <a key={link.label} href={link.href} className="footer-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Column 3 — More Links */}
        <div>
          <h4 className="footer-column-title">Community</h4>
          {linkColumn2.map((link) => (
            <a key={link.label} href={link.href} className="footer-link">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          &copy; 2026 Akshara Ananda
        </span>

        <div className="footer-bottom-links">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
    </motion.footer>
  );
}
