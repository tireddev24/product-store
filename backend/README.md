# 📱 Product Store Backend 

A RESTful backend for a Product Store application, built with Express and a MongoDB database.

---

## 🚀 Features

- 🔐 JWT authentication
- 🧑 User Sign up & login, 
- 📝 CRUD - Create, View, Edit, and Delete Products,
- 🚫 Rate Limiting in login route to avoid brute force attacks
- 🔌 RESTful API architecture
- 🛡️ Input validation and error handling

---

## 🛠️ Tech Stack

- 🟦 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔑 JWT for authentication
- 🌐 CORS for secure cross-origin requests

---

## 📁 Project Structure

- ├── config/ // Database connection
- ├── controllers/ // Route handlers
- ├── middlewares/ // Authentication
- ├── models/ // Mongoose models
- ├── routes/ // Express routers
- ├── utils/ // Helper functions
- ├── secrets.js/ // Environment Variables  
- └── server.js // Server Entry Point

## 📬 API Endpoints

**AUTH**

POST /api/auth/signup

POST /api/auth/login — Login and set cookie

POST /api/auth/logout - Logout and clear cookie


**USERS**

GET /api/users/getuser — Get Logged In User Details

GET /api/users/getallusers — Get All Users

POST /api/users/checkusername — Check UserName Availability


**PRODUCTS**

GET /api/products/ — Fetch all Products

GET /api/products/search/:id — Get Searched Product

GET /api/products/profile — Get Profile Products

POST /api/products/create — Create a New Product

PUT /api/products/profile/edit/:id - Update a product's details

DELETE /api/products/profile/delete/:id - Delete a product


**CART**

GET /api/cart/getcart — Get Profile Cart

GET /api/cart/allcart — Get all cart items 

POST /api/cart/addtocart/:id — Add a product to cart

DELETE /api/cart/removefromcart/:id — Remove a product from cart


**FAVOURITES**

GET /api/fav/getfav - Get Profile Favourites

POST /api/fav/addtofav/:id - Add a product to favourites

DELETE /api/fav/removefromfav/:id - Remove a product from favourites



### 👨‍💻 AUTHOR

Built by [Michael Amao](https://github.com/tireddev24)
