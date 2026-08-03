const axios = require('axios');

const getPosterUrlById = async (tmdbId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });

    const cheminAffiche = response.data.poster_path;

    if (!cheminAffiche) {
      return null;
    }

    return `https://image.tmdb.org/t/p/w500${cheminAffiche}`;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'affiche TMDB :', error.message);
    return null;
  }
};

module.exports = getPosterUrlById;