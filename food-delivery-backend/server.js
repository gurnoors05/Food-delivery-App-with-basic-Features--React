const express = require('express');
const cors = require('cors');
require('dotenv').config();
const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- Add this
// Use Routes
const cartRoutes = require('./routes/cartRoutes');
const contact=  require('./routes/contact')
const connectDB = require("./config/db");


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contact); // <-- Add this
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});