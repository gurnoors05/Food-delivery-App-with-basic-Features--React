# 🍔 Food Delivery App

A full-stack **Food Delivery Web Application** inspired by platforms like **Swiggy and Zomato**.  
Users can browse restaurant menus, add items to their cart, update quantities, and manage their cart with data stored securely in a backend database.

This project demonstrates **full-stack development using React, Node.js, Express, MongoDB, and JWT authentication** with a responsive UI.

---

# 🚀 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected backend routes

## 🍽 Restaurant & Menu
- Fetch restaurant menu dynamically
- Display food items with images and descriptions
- Responsive UI for menu browsing

## 🛒 Cart System
- Add items to cart
- Increase or decrease item quantity
- Automatically remove item when quantity becomes zero
- Cart stored in MongoDB
- Cart persists after login and refresh

## 👤 User-Specific Cart
- Each user has their own cart
- Cart data is stored and retrieved per user
- Cart is synced between frontend and backend

## ⚡ Real-Time Cart Updates
- Cart updates instantly when items are added or modified
- Uses event-based UI refresh

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router
- Tailwind CSS
- React Hot Toast

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Tokens (JWT)

---


# ⚙️ Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/food-delivery-app.git

## 2️⃣ Backend Setup
cd backend
npm install

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

node server.js

## 3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3000

Backend API will run on:

http://localhost:5000

# 📂 Project Structure
