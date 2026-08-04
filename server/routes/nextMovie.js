const express = require('express');
const router = express.Router();
const NextMovie = require('../models/NextMovie');
const { verifierToken, verifierUtilisateursAutorises, verifierUtilisateur1 } = require('../middleware/auth');

// GET /api/next-movie → récupérer le film actuel (avec ou sans lien selon qui demande)
router.get('/', verifierToken, verifierUtilisateursAutorises, async (req, res) => {
  try {
    const nextMovie = await NextMovie.findOne().populate('film');
    res.json(nextMovie || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/next-movie → choisir/changer le film (Linley ou Alexandra)
router.post('/', verifierToken, verifierUtilisateursAutorises, async (req, res) => {
  try {
    await NextMovie.deleteMany({});

    const nextMovie = new NextMovie({ film: req.body.filmId });
    const nouveauNextMovie = await nextMovie.save();
    const rempli = await nouveauNextMovie.populate('film');

    res.status(201).json(rempli);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/next-movie → supprimer le prochain film (Linley ou Alexandra)
router.delete('/', verifierToken, verifierUtilisateursAutorises, async (req, res) => {
  try {
    await NextMovie.deleteMany({});
    res.json({ message: 'Next movie removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/next-movie/lien → ajouter/modifier le lien (Linley uniquement)
router.put('/lien', verifierToken, verifierUtilisateur1, async (req, res) => {
  try {
    const nextMovie = await NextMovie.findOne();

    if (!nextMovie) {
      return res.status(404).json({ message: 'No next movie set' });
    }

    nextMovie.lien = req.body.lien;
    await nextMovie.save();

    const rempli = await nextMovie.populate('film');
    res.json(rempli);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/next-movie/lien → supprimer le lien (Linley uniquement)
router.delete('/lien', verifierToken, verifierUtilisateur1, async (req, res) => {
  try {
    const nextMovie = await NextMovie.findOne();

    if (!nextMovie) {
      return res.status(404).json({ message: 'No next movie set' });
    }

    nextMovie.lien = undefined;
    await nextMovie.save();

    const rempli = await nextMovie.populate('film');
    res.json(rempli);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;