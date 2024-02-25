
# 🛍️ E-Commerce Project
This project is a backend system for a simple e-commerce application. You can manage brands and products, and simulate product purchase processes. 🎉

# 🚀 Getting Started
This section will guide you on how to get the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have Node.js installed on your local machine before starting.

Installation
Clone the repository:

```
git clone https://yourproject.git 

```
Use code with caution.
Install NPM packages:
```
npm install 
```
Use code with caution.
Start the application:

Install NPM packages:
```
npx prisma migrate dev --name init
npm run seed
npm start 
```
# 📦 Endpoints
Below are the available API endpoints and their descriptions.

**<h4>Brands<h4>**

GET /api/brands: Lists all brands. 🏷️

POST /api/brands: Creates a new brand. 🆕
**<h4>Products<h4>**

GET /api/products:  Lists all products along with brand information. 📦

POST /api/products: Creates a new product. 🆕
**<h4>Checkout<h4>**
api/checkout": Simulates a product purchase process. 🛒




# 🛠️ Built With
Node.js
Moleculer
Prisma
SQLite (As the database)



 
