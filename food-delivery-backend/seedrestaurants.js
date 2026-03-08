require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const data = require("./MOCK_RESTAURANT_DATA");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  try {

    const formatted = data.map(r => r.info);

    await Restaurant.insertMany(formatted);

    console.log("Restaurants inserted successfully");

    process.exit();

  } catch (err) {

    console.error(err);
    process.exit(1);

  }
};

seed();