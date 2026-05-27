const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use("/api/leads", leadRoutes);

app.use("/api/auth", authRoutes);

/* TEST ROUTE */

app.get("/", (req, res) => {
  res.send("API Running");
});

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
app.get("/api/auth/test", (req, res) => {
  res.send("Auth route working");
});
app.use("/api/auth", authRoutes);