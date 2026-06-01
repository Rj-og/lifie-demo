const url = 'https://hikpqruyuzltphlcqgyj.supabase.co/functions/v1/stl-ingest/b26ec9f1e62ab6a05ff10fd0a51ca1d4';

async function testWebhook() {
  try {
    // Try sending just the lead object first
    const payload = {
      phone: '+918971019935',
      first_name: 'Raj',
      last_name: 'WebhookTest',
      email: 'raj@mail.com'
    };

    console.log('Sending payload format 1 (flat object)...');
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    let data = await response.text();
    console.log('Response 1 Status:', response.status);
    console.log('Response 1 Data:', data);

    if (response.status !== 200) {
      console.log('Trying payload format 2 (array)...');
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([payload])
      });
      data = await response.text();
      console.log('Response 2 Status:', response.status);
      console.log('Response 2 Data:', data);
    }

    if (response.status !== 200) {
        console.log('Trying payload format 3 ({data: array})...');
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [payload] })
        });
        data = await response.text();
        console.log('Response 3 Status:', response.status);
        console.log('Response 3 Data:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testWebhook();
