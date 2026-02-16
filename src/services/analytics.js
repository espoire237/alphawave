/**
 * Analytics Service
 * Google Analytics and event tracking
 */

import { env } from '../config/env';

/**
 * Initialize Google Analytics
 */
export const initializeAnalytics = () => {
  if (!env.ANALYTICS_ID) {
    console.warn('Google Analytics ID not configured');
    return;
  }

  // Load GA script or use gtag
  if (window.gtag) {
    window.gtag('config', env.ANALYTICS_ID);
  }
};

/**
 * Track page view
 * @param {string} page - Page path
 * @param {string} title - Page title
 */
export const trackPageView = (page, title) => {
  if (!window.gtag) return;

  window.gtag('config', env.ANALYTICS_ID, {
    page_path: page,
    page_title: title,
  });
};

/**
 * Track custom event
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} label - Event label
 * @param {number} value - Event value
 */
export const trackEvent = (category, action, label, value) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Track CTA click
 * @param {string} ctaText - CTA button text
 * @param {string} page - Page where CTA was clicked
 */
export const trackCTAClick = (ctaText, page) => {
  trackEvent('Engagement', 'CTA Click', ctaText, null);
  console.log(`CTA clicked: ${ctaText} on ${page}`);
};

/**
 * Track form submission
 * @param {string} formName - Form name
 */
export const trackFormSubmission = (formName) => {
  trackEvent('Conversion', 'Form Submission', formName, null);
};

/**
 * Track service inquiry
 * @param {string} serviceName - Service name
 */
export const trackServiceInquiry = (serviceName) => {
  trackEvent('Inquiry', 'Service Interest', serviceName, null);
};

/**
 * Track portfolio view
 * @param {string} projectName - Project name
 */
export const trackPortfolioView = (projectName) => {
  trackEvent('Portfolio', 'Project View', projectName, null);
};

/**
 * Track time on page
 * @param {string} page - Page path
 * @param {number} timeSeconds - Time spent in seconds
 */
export const trackTimeOnPage = (page, timeSeconds) => {
  trackEvent('Engagement', 'Time on Page', page, Math.round(timeSeconds));
};

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackCTAClick,
  trackFormSubmission,
  trackServiceInquiry,
  trackPortfolioView,
  trackTimeOnPage,
};
