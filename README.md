# 🔗 URL Shortener (Node.js + Redis)

A scalable backend system that converts long URLs into short, shareable links with fast redirection using Redis caching.

---

## 🚀 Features

* Shorten long URLs into unique IDs
* Fast redirection using Redis cache
* Persistent storage with MongoDB
* Rate limiting to prevent abuse
* Clean backend architecture (Controller → Service → DB)

---

## 🧠 Tech Stack

* Node.js, Express.js
* MongoDB (Mongoose)
* Redis (Caching layer)
* REST APIs
* Morgan

---

## ⚡ Performance Improvements

* Reduced DB reads using Redis caching
* Faster redirect response for frequently accessed URLs

---

## 📦 Setup

```bash
git clone <your-repo>
cd url-shortener
npm install
```

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongo_uri
REDIS_URL=your_redis_uri
```

Run:

```bash
node src/app.js
```

---

## 📌 API Endpoints

### Create Short URL

POST /shorten

```json
{
  "originalUrl": "https://example.com"
}
```

### Redirect

GET /:shortId

---

## 📈 Future Improvements

* Custom short URLs
* Analytics (click tracking)
* Expiry-based links
* Authentication layer
