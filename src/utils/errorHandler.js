/**
 * Error Handler Utility
 * Centralized error handling for consistent error management
 */

import { HTTP_STATUS } from '../config/constants';

/**
 * User-friendly error messages
 */
const ERROR_MESSAGES = {
  // Network errors
  [HTTP_STATUS.NOT_FOUND]: 'The page or resource you requested was not found.',
  [HTTP_STATUS.BAD_REQUEST]: 'There was a problem with your request. Please try again.',
  [HTTP_STATUS.UNAUTHORIZED]: 'Please log in to continue.',
  [HTTP_STATUS.FORBIDDEN]: 'You do not have permission to access this resource.',
  [HTTP_STATUS.CONFLICT]: 'This resource already exists or there was a conflict.',
  [HTTP_STATUS.SERVER_ERROR]: 'Server error. Please try again later.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
};

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @param {string} context - Where the error occurred (for logging)
 * @returns {Object} Standardized error object
 */
export const handleError = (error, context = '') => {
  const isDev = import.meta.env.DEV;
  
  // Log to console in development
  if (isDev && context) {
    console.error(`[${context}]`, error);
  }

  // Create standardized error object
  const errorObj = {
    message: getUserFriendlyMessage(error),
    status: null,
    code: null,
    originalError: isDev ? error : null,
  };

  // Categorize error
  if (error.response) {
    // HTTP error
    errorObj.status = error.response.status;
    errorObj.code = `HTTP_${error.response.status}`;
    errorObj.message = 
      error.response.data?.message || 
      ERROR_MESSAGES[error.response.status] || 
      ERROR_MESSAGES.UNKNOWN;
  } else if (error.request && !error.response) {
    // Request made but no response
    errorObj.code = 'NO_RESPONSE';
    errorObj.message = ERROR_MESSAGES.NETWORK_ERROR;
  } else if (error.code === 'ECONNABORTED') {
    // Timeout
    errorObj.code = 'TIMEOUT';
    errorObj.message = ERROR_MESSAGES.TIMEOUT;
  } else if (error.code === 'ERR_NETWORK') {
    // Network error
    errorObj.code = 'NETWORK_ERROR';
    errorObj.message = ERROR_MESSAGES.NETWORK_ERROR;
  } else {
    // Unknown error
    errorObj.code = 'UNKNOWN';
    errorObj.message = error.message || ERROR_MESSAGES.UNKNOWN;
  }

  // Log to external service in production
  if (import.meta.env.PROD && context) {
    logErrorToSentry(errorObj, context);
  }

  return errorObj;
};

/**
 * Get user-friendly error message
 * @param {Error} error - Error object
 * @returns {string} User-friendly message
 */
export const getUserFriendlyMessage = (error) => {
  if (!error) return ERROR_MESSAGES.UNKNOWN;

  // API response error
  if (error.response?.status) {
    return ERROR_MESSAGES[error.response.status] || ERROR_MESSAGES.UNKNOWN;
  }

  // Network errors
  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Known error messages
  if (error.message) {
    return error.message;
  }

  return ERROR_MESSAGES.UNKNOWN;
};

/**
 * Log error to Sentry (or other service)
 * @param {Object} errorObj - Error object
 * @param {string} context - Error context
 */
export const logErrorToSentry = (errorObj, context) => {
  try {
    // Initialize Sentry if available
    if (window.Sentry) {
      window.Sentry.captureException(errorObj.originalError || errorObj.message, {
        tags: {
          context,
          errorCode: errorObj.code,
        },
      });
    }
  } catch (err) {
    console.error('Failed to log error to Sentry:', err);
  }
};

/**
 * Retry a failed operation
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries (ms)
 * @returns {Promise} Result of function
 */
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};

/**
 * Validate form data
 * @param {Object} data - Form data
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result
 */
export const validateFormData = (data, schema) => {
  const errors = {};

  Object.keys(schema).forEach(field => {
    const rules = schema[field];
    const value = data[field];

    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = `${rules.label || field} is required`;
      return;
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors[field] = `${rules.label || field} must be at least ${rules.minLength} characters`;
      return;
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors[field] = `${rules.label || field} must be at most ${rules.maxLength} characters`;
      return;
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors[field] = rules.patternMessage || `Invalid ${field}`;
      return;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  handleError,
  getUserFriendlyMessage,
  logErrorToSentry,
  withRetry,
  validateFormData,
};
