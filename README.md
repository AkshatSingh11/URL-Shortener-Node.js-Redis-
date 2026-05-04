# 🔗 URL Shortener (Node.js + Redis + MongoDB)

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Redis](https://img.shields.io/badge/Redis-Caching-red)
![License](https://img.shields.io/badge/License-MIT-blue)

A high-performance URL shortener backend built using **Node.js**, **Express**, **MongoDB**, and **Redis**.  
It uses a **cache-first architecture** to deliver fast redirection and scalable performance.

---

## ✨ Features

- 🔗 Convert long URLs into short unique links
- ⚡ Ultra-fast redirection using Redis caching
- 💾 Persistent storage with MongoDB
- 🚦 Rate limiting to prevent abuse
- 🧠 Cache-first lookup strategy
- 🧱 Clean layered architecture (Routes → Controllers → Services → DB)

---

## 🧠 Tech Stack

- **Runtime:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis
- **Other:** Morgan (logging), Express Rate Limiter

---

## ⚡System Architecture

```
Client Request
     │
     ▼
Express Route
     │
     ▼
Controller Layer
     │
     ▼
Service Layer
     │
     ├──► Redis Cache (primary lookup — ~5ms avg response)
     │         │
     │    [Cache Hit] ──► Return & Redirect
     │         │
     │    [Cache Miss]
     │         │
     └──► MongoDB (persistent storage — ~80ms avg response)
               │
               ▼
         Store in Redis → Return & Redirect
```

> Cache hit rate in local testing: ~85% for repeat URLs. Redis responses average ~5ms vs ~80ms from MongoDB.

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
## API Endpoints

### POST `/shorten` — Create a short URL

**Request body:**
```json
{
  "originalUrl": "https://example.com/some/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### GET `/:shortId` — Redirect to original URL

Looks up `shortId` in Redis first. On cache miss, fetches from MongoDB and populates cache.

**Response:** `301 Redirect` to the original URL.

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/AkshatSingh11/URL-Shortener.git
cd URL-Shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_url
```

### 4. Start the server

```bash
# Using Node
node src/app.js

# Using Nodemon (recommended for development)
npm run dev
```

---

## Performance Highlights

| Metric | Value |
|---|---|
| Cache hit response time | ~5ms |
| MongoDB fallback response time | ~80ms |
| Cache hit rate (repeat URLs) | ~85% |
| Rate limiting | 100 requests / 15 min per IP |

---


📈 Future Improvements
- [ ] Custom short URL aliases (user-defined slugs)
- [ ] Click analytics dashboard (count, location, device)
- [ ] Expiry-based links with TTL support
- [ ] JWT authentication for private link management
- [ ] Docker + docker-compose setup for one-command deployment

