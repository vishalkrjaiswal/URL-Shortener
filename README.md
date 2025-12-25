# URL Shortener – MERN Stack

A production-ready **URL Shortener ** built using the **MERN stack**, designed to convert long URLs into short, unique, and shareable links with fast redirection.

This project demonstrates backend API design, database modeling, and frontend-backend integration.

---

## ✨ Key Features

- Generate short URLs for long links
- Redirect short URL to original URL
- Unique short code generation using NanoID
- RESTful API architecture
- Responsive frontend with copy-to-clipboard support
- MongoDB Atlas cloud database

---

## 🧱 Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- NanoID

---


📁 Project Structure

URL-Shortener/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
│
└── README.md

---

## ⚙️ How It Works

1. User enters a long URL in the frontend
2. Frontend sends request to backend API
3. Backend generates a unique short code
4. URL is stored in MongoDB
5. Short URL is returned to the frontend
6. Visiting the short URL redirects to original URL

---

## 🔌 API Endpoints

### Create Short URL

POST /api/create
**Request Body**
```json
{
  "url": "https://example.com"
}

Redirect to Original URL
GET /s/:code

🚀 Getting Started

Run Project Locally
1 Clone Repository

git clone https://github.com/your-username/URL-Shortener.git

2 Backend Setup

bash
cd backend
npm install
npm run dev

Create .env file:

MONGO_URI=your_mongodb_atlas_url
PORT=5000

3 Frontend Setup

cd frontend
npm install
npm run dev

Testing

APIs tested using Postman

UI Preview

Simple input box to enter URL
Button to generate short URL
Copy button for easy sharing






