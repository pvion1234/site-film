const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['À regarder', 'En cours', 'Vu', 'Abandonné'], default: 'À regarder' },
  note: { type: Number, min: 0, max: 10 },
  commentaire: { type: String },
  dateAjout: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Film', FilmSchema);