/**
 * ContactForm Component
 * Contact form with validation and submission
 * @component
 */

import { useState } from 'react';
import { Button, Loader } from '../common';

/**
 * @typedef {Object} ContactFormProps
 * @property {Function} [onSubmit] - Form submission handler
 * @property {string} [className] - Additional CSS classes
 */

/**
 * ContactForm Component
 * @param {ContactFormProps} props - Component props
 * @returns {JSX.Element}
 */
const ContactForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Digital Strategy',
    'Consulting',
    'Other',
  ];

  const budgets = [
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  const timelines = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6+ months',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call custom onSubmit or use default behavior
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default: log to console (replace with API call)
        console.log('Form submitted:', formData);
      }

      setSubmitted(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          timeline: '',
          message: '',
        });
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to submit form' });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-6 md:p-8 bg-green-50 border border-green-200 rounded-lg text-center ${className}`}>
        <div className="flex justify-center mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Thank you!
        </h3>
        <p className="text-gray-700">
          We've received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Submit Error */}
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {errors.submit}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`
            w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
            ${errors.name ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="Your name"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`
            w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
            ${errors.email ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="your@email.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+1 (555) 000-0000"
          disabled={isLoading}
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Company name"
          disabled={isLoading}
        />
      </div>

      {/* Service */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Service Interested In *
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`
            w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
            ${errors.service ? 'border-red-500' : 'border-gray-300'}
          `}
          disabled={isLoading}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Budget Range
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        >
          <option value="">Select budget</option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Timeline
        </label>
        <select
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        >
          <option value="">Select timeline</option>
          {timelines.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className={`
            w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none
            ${errors.message ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="Tell us about your project..."
          disabled={isLoading}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : 'Send Message'}
      </Button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. We won't share your information with anyone.
      </p>
    </form>
  );
};

export default ContactForm;
