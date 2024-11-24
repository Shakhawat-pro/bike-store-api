# Bike Store API

A RESTful API built with Express.js, TypeScript, and MongoDB for managing a bike store's inventory and orders.

## Features

- **Product Management:**
  - Create, read, update, and delete bikes
  - Search bikes by category, name, or brand
  - Track inventory levels automatically
  - Automatic stock status updates

- **Order Processing:**
  - Create new orders with automatic inventory adjustment
  - Calculate total price automatically
  - Prevent orders for out-of-stock items

- **Revenue Analytics:**
  - Calculate total revenue from all orders

- **Data Validation:**
  - Mongoose schema validation
  - Error handling with detailed responses

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Cors
- Dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bike-store-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

4. Build the project:
```bash
npm run build
```

## Running the Application

### Development Mode
```bash
npm run dev
# or
npm run start:dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Products

- **POST** `/api/products` - Create a new bike
- **GET** `/api/products` - Get all bikes
- **GET** `/api/products?searchTerm=category` - Search bikes by category
- **GET** `/api/products/:productId` - Get a specific bike
- **PUT** `/api/products/:productId` - Update a bike
- **DELETE** `/api/products/:productId` - Delete a bike

### Orders

- **POST** `/api/orders` - Create a new order
- **GET** `/api/orders/revenue` - Get total revenue from all orders

## Project Structure

```
src/
├── app.ts
├── server.ts
├── config/
│   └── index.ts
├── models/
│   ├── product.model.ts
│   └── order.model.ts
├── controllers/
│   ├── product.controller.ts
│   └── order.controller.ts
├── routes/
    ├── product.route.ts
    └── order.route.ts

```

## Available Scripts

- `npm start` - Run the built application
- `npm run dev` - Run the application in development mode
- `npm run start:dev` - Run with ts-node-dev for development
- `npm run build` - Build the TypeScript code
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues





## Author

[MD.Shakhawat Hossain]
