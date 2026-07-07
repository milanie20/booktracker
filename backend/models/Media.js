const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // Removed strict enum for debugging
  status: { type: String, default: 'To Watch' },
  currentSeason: { type: Number},
  currentEpisode: { type: Number },
  rating: { type: Number },
  platform: { type: String, default: 'Unknown' }
});

module.exports = mongoose.model('Media', MediaSchema);