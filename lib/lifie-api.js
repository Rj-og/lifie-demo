/**
 * Lifie Reach API Client
 * 
 * Server-side API client for interacting with the Lifie Reach voice API.
 * This module handles preset fetching, batch creation, and lead submission.
 * 
 * All API calls are authenticated using the LIFIE_API_KEY environment variable.
 * This file should ONLY be imported in server-side code (API routes).
 */

const BASE_URL = process.env.LIFIE_API_BASE_URL || 'https://voice-api.salesbox.ai/functions/v1';
const API_KEY = process.env.LIFIE_API_KEY;

/** Default headers for all API requests */
function getHeaders() {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('LIFIE_API_KEY is not configured. Please set it in your .env.local file.');
  }

  return {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };
}

/**
 * Step 1: Fetch available voice presets
 * 
 * Retrieves all presets for the "speed_to_lead" agent type
 * and returns the one matching the target name (default: "AI SDR").
 * 
 * @param {string} targetPresetName - Name of the preset to find
 * @returns {object} The matching preset object
 * @throws {Error} If preset is not found or API call fails
 */
export async function fetchPreset(targetPresetIdentifier = 'c237f6be-50f7-4473-94c0-c2b50650a499') {
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
    (preset) => preset.presetName === targetPresetIdentifier || preset.id === targetPresetIdentifier || preset.presetId === targetPresetIdentifier
  );

  if (!targetPreset) {
    console.error('Available presets:', JSON.stringify(presets, null, 2));
    throw new Error(
      `Preset "${targetPresetIdentifier}" not found. Available: ${presets.map(p => p.presetName).join(', ')}`
    );
  }

  return targetPreset;
}

/**
 * Steps 2 & 3 Combined: Create batch + add lead in one call
 * 
 * Creates an auto_run campaign with the lead data included directly.
 * This is the most efficient approach — a single API call that:
 * 1. Creates the campaign with the specified preset
 * 2. Adds the lead immediately
 * 3. Triggers the outbound call automatically (auto_run mode)
 * 
 * @param {object} preset - The preset object from fetchPreset()
 * @param {object} leadData - Lead information from the form
 * @returns {object} The campaign creation response
 * @throws {Error} If campaign creation fails
 */
export async function createBatchWithLead(preset, leadData) {
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
        company: leadData.companyName,
        ...(leadData.teamSize && { team_size: leadData.teamSize }),
        ...(leadData.useCase && { use_case: leadData.useCase }),
        ...(leadData.message && { message: leadData.message }),
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

  // Check if lead was actually accepted
  if (data.invalidLeads > 0) {
    const details = data.invalidPhoneDetails?.join(', ') || 'unknown reason';
    throw new Error(`Lead was rejected: ${details}`);
  }

  return data;
}

/**
 * Fallback: Add a lead to an existing batch
 * 
 * Used as a fallback if separate batch creation is needed.
 * 
 * @param {string} campaignId - The campaign ID from createBatch
 * @param {object} leadData - Lead information from the form
 * @returns {object} The API response
 * @throws {Error} If adding lead fails
 */
export async function addLeadToBatch(campaignId, leadData) {
  const url = `${BASE_URL}/stl-add-batch-leads`;

  const payload = {
    campaignId: campaignId,
    data: [
      {
        phone: leadData.phoneNumber,
        name: leadData.fullName,
        firstName: leadData.fullName.split(' ')[0],
        lastName: leadData.fullName.split(' ').slice(1).join(' ') || '',
        email: leadData.workEmail,
        company: leadData.companyName,
        ...(leadData.teamSize && { team_size: leadData.teamSize }),
        ...(leadData.useCase && { use_case: leadData.useCase }),
        ...(leadData.message && { message: leadData.message }),
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
    throw new Error(`Failed to add lead to batch (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Execute the full demo request flow
 * 
 * Orchestrates the API steps:
 * 1. Fetch the "AI SDR" preset
 * 2. Create an auto_run campaign with the lead data included
 *    (combines batch creation + lead addition in one call)
 * 
 * The auto_run mode automatically triggers the outbound AI call.
 * 
 * @param {object} leadData - Form submission data
 * @returns {object} Result containing preset, campaign info
 * @throws {Error} If any step fails (with descriptive error messages)
 */
export async function executeDemoRequestFlow(leadData) {
  // Step 1: Fetch the target preset
  console.log('[Lifie API] Step 1: Fetching presets...');
  const preset = await fetchPreset('c237f6be-50f7-4473-94c0-c2b50650a499');
  console.log('[Lifie API] Step 1 complete. Preset found:', preset.presetName || preset.id);

  // Step 2+3: Create campaign with lead included (auto_run triggers call)
  console.log('[Lifie API] Step 2: Creating auto_run campaign with lead data...');
  const campaign = await createBatchWithLead(preset, leadData);
  console.log('[Lifie API] Step 2 complete. Campaign:', campaign.campaignId, 
    '| Leads:', campaign.totalRows, '| Invalid:', campaign.invalidLeads);

  return {
    success: true,
    preset: preset.presetName,
    campaignId: campaign.campaignId,
    totalRows: campaign.totalRows,
    mode: campaign.mode,
  };
}
