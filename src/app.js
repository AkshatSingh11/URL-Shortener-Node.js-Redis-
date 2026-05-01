require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("URL Shortener API Running");
// });

const morgan = require("morgan");
app.use(morgan("dev"));

const urlRoutes = require("./routes/url.routes");
app.use("/", urlRoutes);

const connectDB = require("./config/db");
connectDB();

const { connectRedis } = require("./config/redis");
connectRedis();

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 100 // limit each IP
});

app.use(limiter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));