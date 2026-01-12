const express = require('express');
const cors = require('cors');
require('dotenv').config();

const nodeFetch = require('node-fetch');
const fetch = globalThis.fetch || nodeFetch;

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const GENIUS_ACCESS_TOKEN = process.env.REACT_APP_CLIENT_ACCESS_TOKEN || process.env.CLIENT_ACCESS_TOKEN || '';

app.get('/api/genius/search', async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!GENIUS_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'Genius API token not configured' });
    }

    const url = `https://api.genius.com/search?q=${encodeURIComponent(q)}&per_page=${limit}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Genius API error: ${response.status} ${response.statusText}` 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/genius/songs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!GENIUS_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'Genius API token not configured' });
    }

    const url = `https://api.genius.com/songs/${id}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Genius API error: ${response.status} ${response.statusText}` 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasToken: !!GENIUS_ACCESS_TOKEN });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📝 Genius API token: ${GENIUS_ACCESS_TOKEN ? '✅ Configured' : '❌ Not found'}`);
});
