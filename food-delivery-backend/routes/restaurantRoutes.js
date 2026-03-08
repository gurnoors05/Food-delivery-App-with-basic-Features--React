const express = require('express');
const router = express.Router();
const { getAllRestaurants } = require('../controllers/restaurantController');

// This maps GET requests to /api/restaurants to your controller function
router.get('/', getAllRestaurants);

module.exports = router;