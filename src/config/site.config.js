/**
 * Site Configuration
 * Global site settings and metadata
 */

import env from './env';

export const siteConfig = {
  // Brand Information
  name: 'AlphaWaves',
  tagline: 'African Tech Solutions for Global Impact',
  description:
    'AlphaWaves delivers custom software solutions, AI integration, and digital transformation for African and global businesses.',

  // URLs
  siteUrl: env.SITE_URL,
  apiUrl: env.DIRECTUS_URL,

  // Branding
  logo: {
    light: '/logos/alphawaves-light.svg',
    dark: '/logos/alphawaves-dark.svg',
    favicon: '/favicon.ico',
  },

  // Contact
  contact: {
    email: 'contact@alphawaves.tech',
    phone: '+237 XXX XXX XXX',
    whatsapp: '+237 XXX XXX XXX',
    address: 'Douala, Cameroon',
    responseTime: '24 hours',
  },

  // Social Media
  socialLinks: {
    linkedin: 'https://linkedin.com/company/alphawaves',
    github: 'https://github.com/alphawaves',
    twitter: 'https://twitter.com/alphawaves',
    facebook: 'https://facebook.com/alphawaves',
    instagram: 'https://instagram.com/alphawaves',
  },

  // Design System
  colors: {
    primary: '#4A90E2',
    secondary: '#2c3e50',
    accent: '#1a1a1a',
    success: '#27ae60',
    warning: '#f39c12',
    danger: '#e74c3c',
    background: '#f8f9fa',
  },

  // Typography
  fonts: {
    heading: 'Poppins',
    body: 'Inter',
  },

  // Company Info
  company: {
    name: 'AlphaWaves Tech Solutions',
    yearsInBusiness: 5,
    teamSize: '25+ professionals',
    clientsServed: '50+',
    projectsCompleted: '100+',
    countries: '15+',
  },

  // Features Flags
  features: {
    blog: false,
    testimonials: true,
    portfolio: true,
    contactForm: true,
    faq: true,
    newsletter: false,
    analytics: true,
    searchFunctionality: true,
  },

  // Metadata
  author: 'AlphaWaves Team',
  keywords: [
    'software development',
    'AI solutions',
    'digital marketing',
    'cloud infrastructure',
    'mobile apps',
    'payment integration',
    'Cameroon tech',
    'African technology',
  ],
  ogImage: '/og-image.png',
};

export default siteConfig;
