
const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URI
});

client.on("error", (err) => console.log("Redis Error:", err));

const connectRedis = async () => {
  await client.connect();
  console.log("Redis connected");
};

module.exports = { client, connectRedis };