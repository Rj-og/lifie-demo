'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SuccessState from './SuccessState';

/** Initial form state */
const INITIAL_FORM = {
  fullName: '',
  workEmail: '',
  phoneNumber: '',
};



/** Email validation regex */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PERSONAL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];

export default function DemoForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  /** Update a form field */
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [errors]);

  /** Mark field as touched (for showing errors on blur) */
  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  }, [formData]);

  /** Validate a single field */
  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case 'fullName':
        if (!value?.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Name is too short';
        break;

      case 'workEmail':
        if (!value?.trim()) error = 'Work email is required';
        else if (!EMAIL_REGEX.test(value)) error = 'Enter a valid email';
        else {
          const domain = value.split('@')[1]?.toLowerCase();
          if (PERSONAL_DOMAINS.includes(domain)) error = 'Please use your work email';
        }
        break;
      case 'phoneNumber':
        if (!value) error = 'Phone number is required';
        else if (!isValidPhoneNumber(value)) error = 'Enter a valid phone number';
        break;
      default:
        break;
    }

    setErrors((prev) => {
      if (error) return { ...prev, [field]: error };
      const next = { ...prev };
      delete next[field];
      return next;
    });

    return error;
  };

  /** Validate all required fields */
  const validateAll = () => {
    const fields = ['fullName', 'workEmail', 'phoneNumber'];
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Mark all as touched
    setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  /** Submit the form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateAll()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server validation errors
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        throw new Error(data.message || 'Something went wrong');
      }

      setIsSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Reset form to initial state */
  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setApiError(null);
  };

  // ── Animation Variants ──────────────────────────────────
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.08, duration: 0.3 },
    }),
  };

  // ── Render ──────────────────────────────────────────────
  return (
    <motion.div
      className="form-card"
      id="demo-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessState
            key="success"
            formData={formData}
            onReset={handleReset}
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Form Header */}
            <div className="form-header">
              <h2 className="form-title">Schedule a Visit</h2>
              <p className="form-description">
                Experience Akshara Ananda — book your private estate tour today.
              </p>
            </div>

            {/* Error Toast */}
            <AnimatePresence>
              {apiError && (
                <motion.div
                  className="error-toast"
                  style={{ position: 'relative', top: 0, right: 0, marginBottom: '1rem' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {apiError}
                  <button
                    className="error-toast-close"
                    onClick={() => setApiError(null)}
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <motion.div
                className="form-group"
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  disabled={isSubmitting}
                  autoComplete="name"
                />
                {touched.fullName && errors.fullName && (
                  <p className="form-error">{errors.fullName}</p>
                )}
              </motion.div>

              {/* Email Address */}
              <motion.div
                className="form-group"
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <label className="form-label" htmlFor="workEmail">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="workEmail"
                  type="email"
                  className={`form-input ${touched.workEmail && errors.workEmail ? 'has-error' : ''}`}
                  placeholder="you@company.com"
                  value={formData.workEmail}
                  onChange={(e) => handleChange('workEmail', e.target.value)}
                  onBlur={() => handleBlur('workEmail')}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                {touched.workEmail && errors.workEmail && (
                  <p className="form-error">{errors.workEmail}</p>
                )}
              </motion.div>

              {/* Phone Number */}
              <motion.div
                className="form-group"
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number <span className="required">*</span>
                </label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  countryCallingCodeEditable={false}
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(value) => handleChange('phoneNumber', value || '')}
                  onBlur={() => handleBlur('phoneNumber')}
                  disabled={isSubmitting}
                  className={touched.phoneNumber && errors.phoneNumber ? 'has-error' : ''}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="form-error">{errors.phoneNumber}</p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Scheduling your visit...
                  </>
                ) : (
                  <>
                    Book Your Private Tour
                    <span style={{ fontSize: '18px' }}>→</span>
                  </>
                )}
              </motion.button>

              {/* Footer */}
              <div className="form-footer">
                Your information is secure and never shared.
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
