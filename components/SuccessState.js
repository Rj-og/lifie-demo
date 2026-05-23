'use client';

import { motion } from 'framer-motion';

export default function SuccessState({ formData, onReset }) {
  return (
    <motion.div
      className="success-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Animated checkmark */}
      <motion.div
        className="success-icon-wrapper"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      >
        ✓
      </motion.div>

      <motion.h3
        className="success-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Demo Call Incoming!
      </motion.h3>

      <motion.p
        className="success-message"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Our AI agent is calling you right now. Pick up the phone to experience
        Lifie AI in action.
      </motion.p>

      {/* Phone number display with ring animation */}
      <motion.div
        className="success-phone"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <span className="success-phone-icon">📞</span>
        Calling {formData?.phoneNumber || 'your number'}...
      </motion.div>

      <motion.div
        className="success-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <p>Thank you, {formData?.fullName?.split(' ')[0] || 'there'}!</p>
        <p>We&apos;ll also send a follow-up to {formData?.workEmail}</p>
      </motion.div>

      <motion.button
        className="success-retry"
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        Didn&apos;t receive a call? Submit again
      </motion.button>
    </motion.div>
  );
}
