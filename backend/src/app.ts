import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import sweetRoutes from './routes/sweetRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🍬 Sweet Shop API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      sweets: '/api/sweets'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
