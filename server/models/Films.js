const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['To watch', 'Watched', 'Abandoned'], default: 'To watch' },
  note: { type: Number, min: 0, max: 10 },
  commentaire: { type: String },
  posterUrl: { type: String },
  dateAjout: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Film', FilmSchema);