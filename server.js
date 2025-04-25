require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

// 👇 Setup CORS for frontend
const corsOptions = {
  origin: 'https://ecomm-frontend-af11.onrender.com', 
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Backend is live!');
});

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

// Dynamic port for Render
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
