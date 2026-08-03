import { useState } from 'react';
import api from '../utils/api';

function AddFilm({ onFilmAdded }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('To watch');
  const [resultats, setResultats] = useState([]);
  const [recherche, setRecherche] = useState(false);
  const [erreur, setErreur] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    api.get('/api/films/search', {
      params: { title },
    })
      .then(response => {
        setResultats(response.data);
        setRecherche(true);
      })
      .catch(error => console.error('Erreur lors de la recherche :', error));
  };

  const handleSelectFilm = (filmChoisi) => {
    setErreur('');
  
    api.post('/api/films', {
      title: filmChoisi.title,
      status: status,
      tmdbId: filmChoisi.tmdbId,
    })
      .then(response => {
        onFilmAdded(response.data);
        setTitle('');
        setStatus('To watch');
        setResultats([]);
        setRecherche(false);
      })
      .catch(error => {
        if (error.response?.status === 409) {
          setErreur('This movie is already in your list.');
        } else {
          console.error('Erreur lors de l\'ajout du film :', error);
        }
      });
  };

  const handleCancel = () => {
    setResultats([]);
    setRecherche(false);
  };

  if (recherche) {
    return (
      <div className="resultats-recherche">
        <h3>Select the correct movie:</h3>
        {erreur && <p className="erreur-login">{erreur}</p>}
        {resultats.length === 0 && <p>No results found.</p>}
        <ul className="liste-resultats">
          {resultats.map(resultat => (
            <li key={resultat.tmdbId} onClick={() => handleSelectFilm(resultat)} className="resultat-item">
              {resultat.posterUrl && (
                <img src={resultat.posterUrl} alt={resultat.title} className="resultat-affiche" />
              )}
              <span>{resultat.title} ({resultat.annee})</span>
            </li>
          ))}
        </ul>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To watch">To watch</option>
        <option value="Watched">Watched</option>
        <option value="Abandoned">Abandoned</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

export default AddFilm;