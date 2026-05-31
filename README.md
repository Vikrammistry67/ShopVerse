# 🛒 Product Service API

A scalable backend service for managing products in an e-commerce system using Node.js, Express, MongoDB, and MVC architecture.

---

## 📌 Overview

This service handles:
- Product creation and management
- Product listing and details
- Category-based filtering
- Seller-linked products

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- MVC Architecture

---

## 📁 Project Structure

src/
├── models/
│   └── product.model.js
├── controllers/
│   └── product.controller.js
├── routes/
│   └── product.routes.js
├── middlewares/
├── config/
├── app.js
└── server.js

---

## 🚀 Features

- Create product (seller-based)
- Get all products
- Get product by ID
- Search-ready schema (text indexing)
- Scalable MVC structure

---

## 🔗 API Endpoints

### Create Product
POST /api/products

### Get All Products
GET /api/products

### Get Product by ID
GET /api/products/:id

---

## ⚙️ Environment Variables

Create a `.env` file:

PORT=5000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret

---

## ▶️ Getting Started

### 1. Clone repository
git clone <repo-url>

### 2. Install dependencies
npm install

### 3. Run project
npm run dev

---

## 🧠 Architecture

- MVC Pattern (Model → Controller → Route)
- Scalable folder structure
- Ready for microservices migration
- Indexing for performance optimization

---

## 📦 Future Improvements

- Pagination & filtering
- Redis caching
- Cloudinary image upload
- Role-based access control
- Event-driven architecture

---

### API Gateway Integration

Implemented an API Gateway to act as a single entry point for all client requests.
The gateway routes incoming requests to the appropriate microservices, specifically:

- Cart Service → Handles cart operations (add/remove/update items)
- Order Service → Manages order creation, processing, and history

#### Key Features:
- Centralized routing and request handling
- Improved scalability and service decoupling
- Easier integration of cross-cutting concerns like authentication, logging, and rate limiting
- Simplified client-side communication (single base URL)

#### Example Routes:
- /api/cart → Routed to Cart Service
- /api/orders → Routed to Order Service

## 👨‍💻 Author

Vikram Mistry  
MERN Stack Developer
