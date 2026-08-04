import { useState } from 'react';
import api from '../utils/api';

function NextMovieSection({ films, nextMovie, username, onNextMovieUpdated }) {
  const [selectionOuverte, setSelectionOuverte] = useState(false);
  const [editionLien, setEditionLien] = useState(false);
  const [lien, setLien] = useState(nextMovie?.lien || '');
  const [filmId, setFilmId] = useState('');

  const filmsAVoir = films.filter(film => film.status === 'To watch');
  const estUtilisateur1 = username === 'Linley';

  const handleChoisirFilm = (e) => {
    e.preventDefault();

    api.post('/api/next-movie', { filmId })
      .then(response => {
        onNextMovieUpdated(response.data);
        setSelectionOuverte(false);
        setFilmId('');
        setLien('');
        setEditionLien(false);
      })
      .catch(error => console.error('Erreur lors du choix du film :', error));
  };

  const handleSupprimerNextMovie = () => {
    api.delete('/api/next-movie')
      .then(() => {
        onNextMovieUpdated(null);
        setLien('');
        setEditionLien(false);
      })
      .catch(error => console.error('Erreur lors de la suppression :', error));
  };

  const handleSauverLien = () => {
    api.put('/api/next-movie/lien', { lien })
      .then(response => {
        onNextMovieUpdated(response.data);
        setEditionLien(false);
      })
      .catch(error => console.error('Erreur lors de la sauvegarde du lien :', error));
  };

  const handleSupprimerLien = () => {
    api.delete('/api/next-movie/lien')
      .then(response => {
        onNextMovieUpdated(response.data);
        setLien('');
        setEditionLien(false);
      })
      .catch(error => console.error('Erreur lors de la suppression du lien :', error));
  };

  return (
    <section className="section-next-movie">
      <h2>Next movie</h2>

      {nextMovie ? (
        <div className="next-movie-carte">
          {nextMovie.film.posterUrl && (
            <img src={nextMovie.film.posterUrl} alt={nextMovie.film.title} className="film-affiche" />
          )}
          <div className="next-movie-infos">
            <strong>{nextMovie.film.title}</strong>
            <span> — {nextMovie.film.status}</span>
            {nextMovie.film.note && <span> — Rating: {nextMovie.film.note}/10</span>}
            {nextMovie.film.commentaire && (
              <p className="film-commentaire">"{nextMovie.film.commentaire}"</p>
            )}

            {nextMovie.lien && !editionLien && (
              <a href={nextMovie.lien} target="_blank" rel="noopener noreferrer">Download link</a>
            )}
          </div>

          {estUtilisateur1 && !editionLien && (
            <button onClick={() => setEditionLien(true)} className="bouton-engrenage">⚙️</button>
          )}

          {estUtilisateur1 && editionLien && (
            <div className="edition-lien">
              <input
                type="text"
                placeholder="URL"
                value={lien}
                onChange={(e) => setLien(e.target.value)}
              />
              <button onClick={handleSauverLien}>Save</button>
              {nextMovie.lien && <button onClick={handleSupprimerLien}>Delete link</button>}
              <button onClick={() => setEditionLien(false)}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <p>There is no next movie planned.</p>
      )}

      {!selectionOuverte && (
        <div className="next-movie-actions">
          <button onClick={() => setSelectionOuverte(true)}>Change next movie</button>
          {nextMovie && <button onClick={handleSupprimerNextMovie}>Remove next movie</button>}
        </div>
      )}

      {selectionOuverte && (
        <form onSubmit={handleChoisirFilm}>
          <select value={filmId} onChange={(e) => setFilmId(e.target.value)} required>
            <option value="">-- Choose a movie --</option>
            {filmsAVoir.map(film => (
              <option key={film._id} value={film._id}>{film.title}</option>
            ))}
          </select>
          <button type="submit">Confirm</button>
          <button type="button" onClick={() => setSelectionOuverte(false)}>Cancel</button>
        </form>
      )}
    </section>
  );
}

export default NextMovieSection;