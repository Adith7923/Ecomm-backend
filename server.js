require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

// Optional: Health check route
app.get('/', (req, res) => {
  res.send('🚀 Backend is live!');
});

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

// ✅ Correct port usage
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
