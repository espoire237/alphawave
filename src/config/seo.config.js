/**
 * SEO Configuration
 * Default SEO metadata for pages
 */

import siteConfig from './site.config';

export const defaultSEO = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  ogImage: siteConfig.ogImage,
  ogType: 'website',
  twitterHandle: '@alphawaves',
};

export const pagesSEO = {
  home: {
    title: `${siteConfig.name} - Digital Solutions for Africa`,
    description:
      'Custom software, AI integration, and digital transformation solutions tailored for African and global businesses.',
    keywords: 'software development, AI solutions, digital transformation, Cameroon tech',
  },

  about: {
    title: `About ${siteConfig.name} - African Tech Leaders`,
    description:
      'Learn about AlphaWaves, our mission to transform Africa through technology, and our team of expert developers.',
    keywords: 'about us, team, mission, African tech company, software developers',
  },

  services: {
    title: `${siteConfig.name} Services - Tech Solutions for Your Business`,
    description:
      'Explore our comprehensive tech services: custom software, AI, digital marketing, cloud infrastructure, mobile apps, and payment solutions.',
    keywords:
      'services, software development, AI, DevOps, digital marketing, mobile development, payment integration',
  },

  portfolio: {
    title: `${siteConfig.name} Portfolio - Real Projects, Real Results`,
    description:
      'View our portfolio of successful projects delivering impact across industries in Africa and beyond.',
    keywords: 'portfolio, projects, case studies, success stories, client work, results',
  },

  contact: {
    title: `Contact ${siteConfig.name} - Start Your Project Today`,
    description:
      'Get in touch with our team for a free consultation. We respond within 24 hours.',
    keywords: 'contact us, inquiry, consultation, project quote, free consultation',
  },

  faq: {
    title: `${siteConfig.name} FAQ - Common Questions Answered`,
    description:
      'Find answers to frequently asked questions about our services, pricing, process, and support.',
    keywords: 'FAQ, questions, answers, help, support, pricing information',
  },

  privacy: {
    title: `Privacy Policy - ${siteConfig.name}`,
    description: 'Read our privacy policy to understand how we protect your data.',
    keywords: 'privacy, data protection, policy, GDPR',
  },

  terms: {
    title: `Terms & Conditions - ${siteConfig.name}`,
    description: 'Review our terms and conditions for using our services.',
    keywords: 'terms, conditions, legal, agreement',
  },
};

/**
 * Generate SEO metadata for a page
 * @param {Object} config - Page-specific config
 * @returns {Object} Complete SEO metadata
 */
export const generateSEO = (config = {}) => {
  return {
    ...defaultSEO,
    ...config,
    og: {
      title: config.title || defaultSEO.title,
      description: config.description || defaultSEO.description,
      image: config.ogImage || defaultSEO.ogImage,
      type: config.ogType || defaultSEO.ogType,
      url: config.url || siteConfig.siteUrl,
    },
    twitter: {
      handle: defaultSEO.twitterHandle,
      card: 'summary_large_image',
      title: config.title || defaultSEO.title,
      description: config.description || defaultSEO.description,
      image: config.ogImage || defaultSEO.ogImage,
    },
  };
};

export default {
  defaultSEO,
  pagesSEO,
  generateSEO,
};
