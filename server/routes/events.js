const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const verifierToken = require('../middleware/auth');

// GET /api/events → récupérer tous les événements
router.get('/', verifierToken, async (req, res) => {
  try {
    const events = await Event.find().populate('film');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/events → créer un nouvel événement
router.post('/', verifierToken, async (req, res) => {
  const event = new Event({
    film: req.body.film,
    date: req.body.date,
    heure: req.body.heure,
  });

  try {
    let nouvelEvent = await event.save();
    nouvelEvent = await nouvelEvent.populate('film');
    res.status(201).json(nouvelEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/events/:id → modifier un événement
router.put('/:id', verifierToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/events/:id → supprimer un événement
router.delete('/:id', verifierToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    res.json({ message: 'Événement supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;