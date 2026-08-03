const express = require('express');
const router = express.Router();
const Film = require('../models/Films');
const getPosterUrlById = require('../utils/tmdb');
const axios = require('axios');

router.get('/search', async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: 'Le paramètre title est requis' });
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: title,
      },
    });

    const resultats = response.data.results.slice(0, 5).map(film => ({
      tmdbId: film.id,
      title: film.title,
      annee: film.release_date ? film.release_date.slice(0, 4) : 'N/A',
      posterUrl: film.poster_path ? `https://image.tmdb.org/t/p/w200${film.poster_path}` : null,
    }));

    res.json(resultats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/films → récupérer tous les films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/films → ajouter un nouveau film
router.post('/', async (req, res) => {
  const posterUrl = req.body.tmdbId ? await getPosterUrlById(req.body.tmdbId) : null;

  const film = new Film({
    title: req.body.title,
    status: req.body.status,
    note: req.body.note,
    commentaire: req.body.commentaire,
    posterUrl: posterUrl,
  });

  try {
    const nouveauFilm = await film.save();
    res.status(201).json(nouveauFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/films/:id → modifier un film existant
router.put('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!film) return res.status(404).json({ message: 'Film non trouvé' });
    res.json(film);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/films/:id → supprimer un film
router.delete('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film non trouvé' });
    res.json({ message: 'Film supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;