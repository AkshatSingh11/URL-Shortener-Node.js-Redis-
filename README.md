# 🔗 URL Shortener (Node.js + Redis + MongoDB)

A high-performance URL shortener backend built using **Node.js**, **Express**, **MongoDB**, and **Redis**.  
It uses a **cache-first architecture** to deliver ultra-fast redirection and scalable performance.

---

## ✨ Features

- 🔗 Convert long URLs into short, unique IDs
- ⚡ Fast redirection using Redis caching
- 💾 Persistent storage with MongoDB
- 🚦 Rate limiting to prevent abuse
- 🧠 Cache-first strategy for performance optimization
- 🧱 Clean layered architecture (Routes → Controllers → Services → DB)

---

## 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- Morgan (logging)
- Express Rate Limiter

---

## ⚡ Architecture

Client → Express Route → Controller → Service Layer  
                             ↓  
                     Redis Cache (fast lookup)  
                             ↓  
                     MongoDB (fallback storage)

---

## 📁 Project Structure
src/
├── config/
├── controllers/
├── routes/
├── models/
├── services/
└── app.js


---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/AkshatSingh11/URL-Shortener.git
cd URL-Shortener

### 1. Clone the repository
npm install

3. Create .env file
PORT=5000
MONGO_URI=your_mongo_uri
REDIS_URL=your_redis_url

4. Run the server

node src/app.js
OR (if nodemon is installed):
npm run dev

📌 API Endpoints
🔗 Create Short URL
POST /shorten

Request Body:

{
  "originalUrl": "https://example.com"
}

Response:

{
  "shortUrl": "http://localhost:5000/abc123"
}
🔁 Redirect URL
GET /:shortId

Redirects to the original URL.


🚀 Performance Highlights
  ⚡ Redis reduces database calls significantly
  🚀 Faster redirects for frequently accessed URLs
  📉 Reduced MongoDB load using caching layer
  🧠 Optimized read-heavy architecture

📈 Future Improvements
  Custom short URLs (user-defined aliases)
  Click analytics dashboard
  Expiry-based short links
  JWT authentication system
  Docker deployment

