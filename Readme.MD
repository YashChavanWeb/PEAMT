# PEAMT - Proctored Exam Automation and Monitoring Tool Project

A full-stack MERN application with a React frontend and an Express backend.

## Table of Contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## client

The frontend of this project is built with React and Vite. It includes features for user interaction and integrates with Firebase for authentication and data storage.

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/peamt.git
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd peamt/frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install @reduxjs/toolkit firebase react react-dom react-dotenv react-redux react-router-dom redux-persist
   ```

4. **Create a `.env` file in the `client` directory and add your environment variables:**

   ```plaintext
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_PRIVATE_DASHBOARD_ID=your_private_dashboard_id
   VITE_DASHBOARD_PASSWORD=your_dashboard_password
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

### Usage

Navigate to `http://localhost:5173` in your browser to use the application. Make sure the backend server is running as well.

---

## Backend

The backend of this project is built with Node.js and Express. It provides API endpoints and handles authentication and data storage.

### Setup

1. **The backend directory is in the route directory itself:**

   ```bash
   /peamt
   ```

2. **Install dependencies:**

   ```bash
   npm install @reduxjs/toolkit axios bcryptjs body-parser cookie-parser cors dotenv express jsonwebtoken lenis mongoose nodemon react-redux three
   ```

3. **Create a `.env` file in the `root` directory and add your environment variables:**

   ```plaintext
   MONGO=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN=your_admin_mongodb_connection_string
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

### Usage

The backend will run on `http://localhost:3000` by default. Ensure it is running before interacting with the frontend.

---

## Environment Variables

Make sure to configure the following environment variables:

- **client (.env file):**

  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_PRIVATE_DASHBOARD_ID`
  - `VITE_DASHBOARD_PASSWORD`

- **Root Directory (.env file):**
  - `MONGO` (MongoDB connection string)
  - `JWT_SECRET` (Secret key for JWT authentication)
  - `ADMIN` (Admin MongoDB connection string)

## Features

- **Frontend:**

  - User authentication with Firebase
  - Responsive UI built with React and TailwindCSS
  - State management with Redux Toolkit and Redux Persist
  - Routing with React Router DOM

- **Backend:**
  - RESTful API with Express
  - Authentication with JWT
  - Data storage and retrieval with MongoDB
  - Middleware for body parsing, cookies, and CORS

## API Documentation

For detailed API documentation, refer to the [API Documentation](#). This includes information on available endpoints, request formats, and response examples.

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or further information, you can contact the project maintainer through GitHub or the project's support channels.
