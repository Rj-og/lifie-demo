/**
 * Lifie Reach API Client
 * 
 * Server-side API client for interacting with the Lifie Reach voice API.
 * This module sends new leads to a specific auto-run campaign webhook
 * instead of creating a new campaign for every lead.
 * 
 * This file should ONLY be imported in server-side code (API routes).
 */

const INGEST_URL = process.env.LIFIE_INGEST_URL;

/**
 * Execute the full demo request flow
 * 
 * Sends the lead directly to the Auto-run webhook URL for the existing campaign.
 * 
 * @param {object} leadData - Form submission data
 * @returns {object} Result indicating success
 * @throws {Error} If the API call fails
 */
export async function executeDemoRequestFlow(leadData) {
  if (!INGEST_URL) {
    throw new Error('LIFIE_INGEST_URL is not configured. Please set it in your .env.local file.');
  }

  console.log('[Lifie API] Sending lead to Webhook URL...');

  const payload = {
    phone: leadData.phoneNumber,
    first_name: leadData.fullName.split(' ')[0],
    last_name: leadData.fullName.split(' ').slice(1).join(' ') || '',
    email: leadData.workEmail,
    deployMode: false,
    ...(leadData.teamSize && { team_size: leadData.teamSize }),
    ...(leadData.useCase && { use_case: leadData.useCase }),
    ...(leadData.message && { message: leadData.message }),
  };

  const response = await fetch(INGEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to ingest lead (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Webhook rejected lead: ${JSON.stringify(data)}`);
  }

  console.log('[Lifie API] Lead successfully accepted by webhook. Row ID:', data.row_id);

  return {
    success: true,
    rowId: data.row_id,
  };
}
