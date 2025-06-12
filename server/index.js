const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Correct and full CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  mode: 'no-cors',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.post('/api/suplimax', (req, res) => {
  const { features, audience, tone, style } = req.body;

  console.log('Received from frontend:', { features, audience, tone, style });

  // Simulated response (we’ll replace this with Gemini later)
  res.json({
    message: `Video generated for audience "${audience}" with tone "${tone}" and style "${style}"`,
    videoUrl: 'https://example.com/fake-suplimax-video.mp4',
  });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
