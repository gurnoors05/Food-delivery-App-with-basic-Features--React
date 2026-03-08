// const db = require('../config/db');

// // Get all restaurants
// const getAllRestaurants = async (req, res) => {
//     try {
//         const [restaurants] = await db.query('SELECT * FROM restaurants');
//         res.json(restaurants);
//     } catch (error) {
//         console.error("Error fetching restaurants:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// module.exports = {
//     getAllRestaurants
// };

const Restaurant = require("../models/Restaurant");


// GET ALL RESTAURANTS
const getAllRestaurants = async (req, res) => {
  try {

    const restaurants = await Restaurant.find();

    res.json(restaurants);

  } catch (error) {

    console.error("Error fetching restaurants:", error);

    res.status(500).json({ message: "Server Error" });

  }
};

module.exports = {
  getAllRestaurants
};