const mongoose = require('mongoose');

const NextMovieSchema = new mongoose.Schema({
  film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  lien: { type: String },
});

module.exports = mongoose.model('NextMovie', NextMovieSchema);