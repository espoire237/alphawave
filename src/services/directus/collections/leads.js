/**
 * Leads Service
 * CRUD operations for Leads collection (Contact Form Submissions)
 */

import directus from '../client';
import { buildReadQuery, buildCreateQuery } from '../queries';
import { handleDirectusError } from '../utils';
import { directusConfig } from '../../../config/directus.config';

/**
 * Submit a new lead/contact form
 * @param {Object} leadData - Lead information
 * @returns {Promise<Object>} Created lead object
 */
export const submitLead = async (leadData) => {
  try {
    // Validate required fields
    const { full_name, email, service_interested_in, project_description } = leadData;
    
    if (!full_name || !email || !service_interested_in || !project_description) {
      throw new Error('Missing required fields');
    }

    const query = buildCreateQuery(
      directusConfig.collections.LEADS,
      {
        full_name,
        email,
        phone: leadData.phone || null,
        company_name: leadData.company_name || null,
        service_interested_in,
        budget_range: leadData.budget_range || null,
        project_description,
        timeline_urgency: leadData.timeline_urgency || null,
        how_did_you_find_us: leadData.how_did_you_find_us || null,
        status: 'new', // Default status for new leads
        notes: leadData.notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get all leads (admin only)
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Leads array
 */
export const getAllLeads = async (options = {}) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.LEADS,
      {
        ...options,
        sort: ['-created_at'],
        fields: directusConfig.fields.leads,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw handleDirectusError(error);
  }
};

/**
 * Get leads by status
 * @param {string} status - Lead status (new, contacted, qualified, converted, lost)
 * @returns {Promise<Array>} Leads with specified status
 */
export const getLeadsByStatus = async (status) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.LEADS,
      {
        filter: { status: { _eq: status } },
        sort: ['-created_at'],
        fields: directusConfig.fields.leads,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching leads with status "${status}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get leads by service interest
 * @param {string} service - Service name
 * @returns {Promise<Array>} Leads interested in service
 */
export const getLeadsByService = async (service) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.LEADS,
      {
        filter: { service_interested_in: { _eq: service } },
        sort: ['-created_at'],
        fields: directusConfig.fields.leads,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error(`Error fetching leads interested in "${service}":`, error);
    throw handleDirectusError(error);
  }
};

/**
 * Get leads in date range
 * @param {string} startDate - Start date (ISO format)
 * @param {string} endDate - End date (ISO format)
 * @returns {Promise<Array>} Leads in date range
 */
export const getLeadsInDateRange = async (startDate, endDate) => {
  try {
    const query = buildReadQuery(
      directusConfig.collections.LEADS,
      {
        filter: {
          created_at: {
            _gte: startDate,
            _lte: endDate,
          },
        },
        sort: ['-created_at'],
        fields: directusConfig.fields.leads,
      }
    );

    return await directus.request(query);
  } catch (error) {
    console.error('Error fetching leads in date range:', error);
    throw handleDirectusError(error);
  }
};

export default {
  submitLead,
  getAllLeads,
  getLeadsByStatus,
  getLeadsByService,
  getLeadsInDateRange,
};
