require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('✅ Backend running on port 5000'));
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
