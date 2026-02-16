/**
 * Email Service
 * Email notifications for leads, inquiries, and alerts
 */

/**
 * Send contact form notification to team
 * @param {Object} leadData - Lead information
 * @returns {Promise<Object>} Email send result
 */
export const sendContactFormNotification = async (leadData) => {
  try {
    const response = await fetch('/api/email/send-contact-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'contact@alphawaves.tech',
        subject: `New Lead: ${leadData.full_name} - ${leadData.service_interested_in}`,
        leadData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending contact notification:', error);
    throw error;
  }
};

/**
 * Send confirmation email to client
 * @param {string} email - Client email
 * @param {Object} leadData - Lead information
 * @returns {Promise<Object>} Email send result
 */
export const sendClientConfirmation = async (email, leadData) => {
  try {
    const response = await fetch('/api/email/send-client-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        clientName: leadData.full_name,
        service: leadData.service_interested_in,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending client confirmation:', error);
    throw error;
  }
};

/**
 * Send newsletter email
 * @param {Array<string>} subscribers - Email list
 * @param {Object} content - Email content
 * @returns {Promise<Object>} Email send result
 */
export const sendNewsletter = async (subscribers, content) => {
  try {
    const response = await fetch('/api/email/send-newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: subscribers,
        ...content,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send newsletter');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
};

export default {
  sendContactFormNotification,
  sendClientConfirmation,
  sendNewsletter,
};
