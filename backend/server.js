const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Media = require('./models/Media');

const app = express();
app.use(cors());
app.use(express.json());

// Replace the old connection code in server.js with this:
const MONGO_URI = "mongodb+srv://milanieeduave_db_user:Z7N9NNPTUtM9oXIw@cluster0.yxrpwy8.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully to Atlas'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// 1. GET all media
app.get('/api/media', async (req, res) => {
  try {
    const watchlist = await Media.find();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST a new movie/series
// 2. POST a new movie/series (Explicitly mapping properties)
// 2. POST a new movie/series
app.post('/api/media', async (req, res) => {
  console.log("📥 BACKEND RECEIVED BODY:", req.body);

  const { title, type, status, platform, currentSeason, currentEpisode } = req.body;

  // Build a distinct object structure mapping out inputs explicitly
  const newMedia = new Media({
    title,
    type,
    status,
    platform: platform && platform.trim() !== "" ? platform : "Other",
    currentSeason,
    currentEpisode
  });

  try {
    const savedMedia = await newMedia.save();
    res.status(201).json(savedMedia);
  } catch (err) {
    console.error("❌ Mongoose save failure:", err.message);
    res.status(400).json({ message: err.message });
  }
});
// 3. DELETE a movie/series
app.delete('/api/media/:id', async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));