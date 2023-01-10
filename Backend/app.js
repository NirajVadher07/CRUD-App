require("dotenv").config();
const express = require("express");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const connectToDB = require("./config/db");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDB();

app.use("/", userRoutes);

module.exports = app;
