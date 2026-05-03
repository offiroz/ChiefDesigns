require('dotenv').config();
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint — keeps the API key server-side
app.post('/api/format', async (req, res) => {
  const { messages, model, max_tokens } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, messages }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data.error?.message || 'Upstream error' });
    }

    res.json(data);
  } catch (err) {
    console.error('[proxy error]', err);
    res.status(502).json({ error: 'Failed to reach Anthropic API' });
  }
});

// Serve the formatter for any other path
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
