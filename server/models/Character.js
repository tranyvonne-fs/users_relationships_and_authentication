const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  franchise: String,
  yearRelease: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Character', characterSchema);
