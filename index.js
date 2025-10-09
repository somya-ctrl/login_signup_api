require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
const PORT = 5000;



app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/", userRouter);
app.get("/", (req, res) => {
  res.send("Server is working ");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected !");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error(" MongoDB error:", err));

