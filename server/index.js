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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
