require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

function getCorsOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  const isDev = process.env.NODE_ENV === 'development';

  if (isProd) {
    return {
      origin: ['https://atwobs.github.io'],
      credentials: true
    };
  }

  if (isDev) {
    return {
      origin: '*',
      credentials: true
    };
  }

  // Optional fallback for other environments
  return {
    origin: false // block all by default
  };
}

app.use(cors(getCorsOptions()));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const locationSchema = new mongoose.Schema({
    serial: Number,
    name: String,
    description: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    image: String
});

const Location = mongoose.model("locations", locationSchema);

app.get("/", async (req, res) => {
    try {
        const locations = await Location.find();
        res.json({ locations });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch locations" });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});