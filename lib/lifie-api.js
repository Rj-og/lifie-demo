/**
 * Lifie Reach API Client
 * 
 * Server-side API client for interacting with the Lifie Reach voice API.
 * Uses the POST API call approach to create campaigns and trigger calls.
 * 
 * This file should ONLY be imported in server-side code (API routes).
 */

const BASE_URL = 'https://voice-api.salesbox.ai/functions/v1';
const API_KEY = process.env.LIFIE_API_KEY;

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
 * Fetch the preset by ID
 * 
 * @param {string} presetId - The preset UUID
 * @returns {object} The matching preset object
 */
async function fetchPreset(presetId = 'c237f6be-50f7-4473-94c0-c2b50650a499') {
  const url = `${BASE_URL}/list-presets?agentType=speed_to_lead`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to fetch presets (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const presets = data.presets || [];

  const targetPreset = presets.find(
    (p) => p.id === presetId || p.presetId === presetId || p.presetName === presetId
  );

  if (!targetPreset) {
    console.error('Available presets:', JSON.stringify(presets, null, 2));
    throw new Error(
      `Preset "${presetId}" not found. Available: ${presets.map(p => p.presetName).join(', ')}`
    );
  }

  return targetPreset;
}

/**
 * Execute the full demo request flow
 * 
 * 1. Fetch the preset
 * 2. Create an auto_run campaign with the lead (triggers call immediately)
 * 
 * @param {object} leadData - Form submission data
 * @returns {object} Result containing campaign info
 */
export async function executeDemoRequestFlow(leadData) {
  // Step 1: Fetch preset
  console.log('[Lifie API] Step 1: Fetching preset...');
  const preset = await fetchPreset('c237f6be-50f7-4473-94c0-c2b50650a499');
  console.log('[Lifie API] Step 1 complete. Preset:', preset.presetName);

  // Step 2: Create auto_run campaign with lead
  console.log('[Lifie API] Step 2: Creating auto_run campaign...');
  const url = `${BASE_URL}/stl-new-batch`;

  const payload = {
    presetName: preset.presetName,
    mode: 'auto_run',
    deployMode: false,
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
    throw new Error(`Failed to create campaign (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  if (data.invalidLeads > 0) {
    const details = data.invalidPhoneDetails?.join(', ') || 'unknown reason';
    throw new Error(`Lead was rejected: ${details}`);
  }

  console.log('[Lifie API] Step 2 complete. Campaign:', data.campaignId,
    '| Leads:', data.totalRows, '| Invalid:', data.invalidLeads);

  return {
    success: true,
    campaignId: data.campaignId,
    totalRows: data.totalRows,
    mode: data.mode,
  };
}
