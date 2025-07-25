const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Simple city-to-coordinates mapping (add more as needed)
const cityCoordinates = {
  London: { lat: 51.5074, lon: -0.1278 },
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Mumbai: { lat: 19.0760, lon: 72.8777 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Delhi: { lat: 28.6139, lon: 77.2090 },
};

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  const coords = cityCoordinates[city];

  if (!city || !coords) {
    return res.status(400).json({ error: 'City not supported or missing' });
  }

  const { lat, lon } = coords;

  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    res.json({
      city,
      ...response.data.current_weather,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
