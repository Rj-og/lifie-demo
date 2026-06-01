'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🌿',
    title: 'Organic Farm Estates',
    text: '25-year-old mango orchards with managed organic farming and weekly fresh produce delivery',
  },
  {
    icon: '🏡',
    title: 'Luxury Private Residences',
    text: 'Exclusive private homes set amidst verdant greenery, designed for modern comfort and serene escapes',
  },
  {
    icon: '🧘',
    title: 'Wellness Resort',
    text: 'Holistic wellness retreat offering treatments, meditation spaces, and rejuvenation programs',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Features() {
  return (
    <section className="features-section" id="features">
      <motion.div
        className="features-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="features-heading"
          dangerouslySetInnerHTML={{
            __html: 'Discover <span class="fancy">Ananda</span>',
          }}
        />
        <p className="features-subtext">
          A nature-first ecosystem where organic living, luxury residences, and holistic wellness
          converge to create an unparalleled lifestyle experience.
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
            key={feature.title}
            className="feature-card"
            variants={cardVariants}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-text">{feature.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
