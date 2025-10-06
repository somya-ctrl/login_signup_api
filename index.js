
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", userRouter);

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Server is working ");
});

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log(" MongoDB connected !");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error(" MongoDB error:", err));

