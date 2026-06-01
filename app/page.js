'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DemoForm from '@/components/DemoForm';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const contactWidgets = [
  {
    title: 'Call Us',
    lines: [
      { text: '+91 9555800400', href: 'tel:+919555800400' },
    ],
  },
  {
    title: 'Email',
    lines: [
      { text: 'info@aksharaprojects.com', href: 'mailto:info@aksharaprojects.com' },
    ],
  },
  {
    title: 'Corporate Address',
    lines: [
      {
        text: 'Akshara Projects Pvt. Ltd., Plot No. 1, Survey No. 83, Raidurgam, Hyderabad, Telangana 500032',
      },
    ],
  },
  {
    title: 'Project Address',
    lines: [
      {
        text: 'Akshara Ananda, Yelgoi Village, Sangareddy District, Telangana 502295',
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero-section">
        {/* Background image */}
        <div className="hero-bg">
          <img
            src="https://cdn.prod.website-files.com/68c29b083f23c6749d73589a/68c3843f18d2dbe31fe83f88_13%20Pond%20Area.webp"
            alt="Akshara Ananda — Pond Area"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="hero-overlay" />

        {/* Contact widgets */}
        <div className="hero-content">
          <div className="contact-widgets">
            {contactWidgets.map((widget, idx) => (
              <motion.div
                className="contact-widget"
                key={widget.title}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={idx}
              >
                <h3 className="contact-widget-title">{widget.title}</h3>
                <div className="line" />
                <div className="contact-widget-text">
                  {widget.lines.map((line, i) =>
                    line.href ? (
                      <a key={i} href={line.href}>
                        {line.text}
                      </a>
                    ) : (
                      <p key={i}>{line.text}</p>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content Section — Request a Demo ─────────────────── */}
      <section className="content-section">
        <div className="content-grid">
          {/* Left column */}
          <motion.div
            className="content-left"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="content-heading">
              Request a <span className="fancy">Demo</span>
            </h2>
            <p className="content-description">
              Interested in experiencing Akshara Ananda firsthand? Fill in your
              details and our team will get back to you to arrange a
              personalised site visit and walkthrough of the project.
            </p>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
          >
            <DemoForm />
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <Features />

      {/* ── Footer ───────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
