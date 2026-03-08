// const mysql = require('mysql2');
// require('dotenv').config();

// // Create a connection pool (better for performance than a single connection)
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     ssl: {
//         rejectUnauthorized: false // Required for Aiven cloud databases
//     }
// });

// // Convert pool to use promises so we can use async/await
// const promisePool = pool.promise();

// module.exports = promisePool;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;