import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://your-production-domain.com']
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).send('API is working!');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP' });
});


app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
