const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware (optional)
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is working fine ");
});

// MongoDB connection + start server
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log(" MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
