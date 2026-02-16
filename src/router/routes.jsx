/**
 * Router Configuration
 * Centralized routing configuration for React Router
 */

import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// Layout
import Layout from '../components/layout/Layout';

// Middleware
import ErrorBoundary from '../components/middleware/ErrorBoundary';
import LoadingFallback from '../components/middleware/LoadingFallback';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const Contact = lazy(() => import('../pages/Contact'));
const FAQ = lazy(() => import('../pages/FAQ'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * Route configuration object
 * Follows React Router v6 format
 */
export const routeConfig = [
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Home
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },

      // About
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
        meta: {
          title: 'About Us',
          description: 'Learn about AlphaWaves and our mission',
        },
      },

      // Contact
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        ),
        meta: {
          title: 'Contact Us',
          description: 'Get in touch with our team',
        },
      },

      // FAQ
      {
        path: 'faq',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FAQ />
          </Suspense>
        ),
        meta: {
          title: 'FAQ',
          description: 'Frequently asked questions',
        },
      },

      // Services
      {
        path: 'services',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Services />
              </Suspense>
            ),
            meta: {
              title: 'Services',
              description: 'Our comprehensive tech services',
            },
          },
          {
            path: ':slug',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ServiceDetail />
              </Suspense>
            ),
            meta: {
              title: 'Service Details',
              isDynamic: true,
            },
          },
        ],
      },

      // Portfolio
      {
        path: 'portfolio',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Portfolio />
              </Suspense>
            ),
            meta: {
              title: 'Portfolio',
              description: 'View our successful projects',
            },
          },
          {
            path: ':slug',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ProjectDetail />
              </Suspense>
            ),
            meta: {
              title: 'Project Details',
              isDynamic: true,
            },
          },
        ],
      },

      // Legal pages
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy />
          </Suspense>
        ),
        meta: {
          title: 'Privacy Policy',
        },
      },

      {
        path: 'terms',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Terms />
          </Suspense>
        ),
        meta: {
          title: 'Terms & Conditions',
        },
      },

      // 404 - Catch all (MUST be last)
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

/**
 * Get route by path
 * @param {string} path - Route path
 * @returns {Object|null} Route object or null
 */
export const getRouteByPath = (path) => {
  const findRoute = (routes) => {
    for (const route of routes) {
      if (route.path === path || route.index) {
        return route;
      }

      if (route.children) {
        const found = findRoute(route.children);
        if (found) return found;
      }
    }
    return null;
  };

  return findRoute(routeConfig);
};

/**
 * Get all route paths
 * @returns {Array<string>} Array of all route paths
 */
export const getAllRoutePaths = () => {
  const paths = [];

  const extractPaths = (routes, parentPath = '') => {
    routes.forEach(route => {
      const fullPath = route.path ? `${parentPath}/${route.path}`.replace(/\/+/g, '/') : parentPath;

      if (route.path || route.index) {
        paths.push(fullPath);
      }

      if (route.children) {
        extractPaths(route.children, fullPath);
      }
    });
  };

  extractPaths(routeConfig);
  return paths;
};

export default routeConfig;
