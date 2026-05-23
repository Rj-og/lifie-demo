'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🤖',
    name: 'AI Voice Agents',
    description:
      'Autonomous AI agents that handle outbound calls with natural, human-like conversations at scale.',
  },
  {
    icon: '⚡',
    name: 'Instant Engagement',
    description:
      'Connect with prospects within seconds of form submission. No waiting, no manual dialing.',
  },
  {
    icon: '🎯',
    name: 'Smart Qualification',
    description:
      'AI-powered lead qualification that identifies high-intent prospects and prioritizes follow-ups.',
  },
  {
    icon: '📊',
    name: 'Real-Time Analytics',
    description:
      'Track call outcomes, engagement rates, and pipeline impact with comprehensive dashboards.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="features-label">✨ Why Lifie AI</div>
          <h2 className="features-title">
            The future of sales outreach is{' '}
            <span className="hero-title-gradient">autonomous</span>
          </h2>
          <p className="features-subtitle">
            Lifie AI&apos;s voice agents handle the entire outbound process — from initial contact
            to qualification — so your team can focus on closing deals.
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              className="feature-card"
              variants={cardVariants}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-name">{feature.name}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
