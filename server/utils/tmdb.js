const axios = require('axios');

const getPosterUrl = async (title) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: title,
      },
    });

    const resultats = response.data.results;

    if (resultats.length === 0) {
      return null;
    }

    const cheminAffiche = resultats[0].poster_path;

    if (!cheminAffiche) {
      return null;
    }

    return `https://image.tmdb.org/t/p/w500${cheminAffiche}`;
  } catch (error) {
    console.error('Erreur lors de la recherche TMDB :', error.message);
    return null;
  }
};

module.exports = getPosterUrl;