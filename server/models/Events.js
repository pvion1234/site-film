const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  date: { type: Date, required: true },
  heure: { type: String, required: true },
  notificationEnvoyee: { type: Boolean, default: false },
});

module.exports = mongoose.model('Event', EventSchema);