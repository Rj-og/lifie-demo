/**
 * Lifie Reach API Client
 * 
 * Server-side API client for interacting with the Lifie Reach voice API.
 * Adds leads to a single existing auto_run campaign using the add-batch-leads endpoint.
 * 
 * This file should ONLY be imported in server-side code (API routes).
 */

const BASE_URL = 'https://voice-api.salesbox.ai/functions/v1';
const API_KEY = process.env.LIFIE_API_KEY;
const CAMPAIGN_ID = process.env.LIFIE_CAMPAIGN_ID;

/** Default headers for all API requests */
function getHeaders() {
  if (!API_KEY) {
    throw new Error('LIFIE_API_KEY is not configured. Please set it in your .env.local file.');
  }

  return {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };
}

/**
 * Execute the full demo request flow
 * 
 * Adds the lead to the existing auto_run campaign.
 * The campaign is already configured with the correct preset,
 * so calls trigger automatically when a lead is added.
 * 
 * @param {object} leadData - Form submission data
 * @returns {object} Result indicating success
 * @throws {Error} If the API call fails
 */
export async function executeDemoRequestFlow(leadData) {
  if (!CAMPAIGN_ID) {
    throw new Error('LIFIE_CAMPAIGN_ID is not configured. Please set it in your .env.local file.');
  }

  console.log('[Lifie API] Adding lead to campaign:', CAMPAIGN_ID);

  const url = `${BASE_URL}/add-batch-leads`;

  const payload = {
    campaignId: CAMPAIGN_ID,
    data: [
      {
        phone: leadData.phoneNumber,
        name: leadData.fullName,
        firstName: leadData.fullName.split(' ')[0],
        lastName: leadData.fullName.split(' ').slice(1).join(' ') || '',
        email: leadData.workEmail,
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to add lead to campaign (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  if (data.invalidLeads > 0) {
    const details = data.invalidPhoneDetails?.join(', ') || 'unknown reason';
    throw new Error(`Lead was rejected: ${details}`);
  }

  console.log('[Lifie API] Lead added successfully. Total rows:', data.totalRows, '| Invalid:', data.invalidLeads);

  return {
    success: true,
    campaignId: CAMPAIGN_ID,
    totalRows: data.totalRows,
  };
}
