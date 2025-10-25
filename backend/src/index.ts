import express from 'express';
import cors from 'cors';
import pool from './db/connection';
import tasksRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'healthy', 
      timestamp: result.rows[0].now,
      database: 'connected' 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      error: 'Database connection failed' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
