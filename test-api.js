const BASE_URL = 'https://voice-api.salesbox.ai/functions/v1';
const API_KEY = 'sk_0bf31d037dce422ea719cd9ed217f842';

async function checkAPI() {
  try {
    const url = `${BASE_URL}/list-presets?agentType=speed_to_lead`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    const data = await response.json();
    const targetPreset = 'c237f6be-50f7-4473-94c0-c2b50650a499';
    const presetObj = data.presets.find(p => p.presetName === targetPreset || p.id === targetPreset || p.presetId === targetPreset);

    console.log('Preset Name to use:', presetObj.presetName);

    const payload = {
      presetName: presetObj.presetName,
      mode: 'auto_run',
      deployMode: false,
      data: [{
        phone: '+918971019935',
        name: 'Raj',
        firstName: 'Raj',
        lastName: '',
        email: 'raj@mail.com'
      }]
    };

    console.log('Sending payload:', JSON.stringify(payload, null, 2));

    const createBatchUrl = `${BASE_URL}/stl-new-batch`;
    const batchResponse = await fetch(createBatchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload)
    });

    const batchData = await batchResponse.json();
    console.log('Batch creation response:', batchData);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkAPI();
