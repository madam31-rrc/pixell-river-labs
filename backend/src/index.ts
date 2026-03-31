import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import organizationRoutes from './routes/organizationRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/organization', organizationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});