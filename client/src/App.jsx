import { useState, useEffect } from 'react';
import api from './utils/api';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';
import Login from './components/Login';

function App() {
  const [films, setFilms] = useState([]);
  const [events, setEvents] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('All');
  const [connecte, setConnecte] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    api.get('/api/films')
      .then(response => setFilms(response.data))
      .catch(error => console.error('Erreur lors du chargement des films :', error));
  }, []);

  useEffect(() => {
    if (connecte) {
      api.get('/api/events')
        .then(response => setEvents(response.data))
        .catch(error => console.error('Erreur lors du chargement des événements :', error));
    }
  }, [connecte]);

  const handleFilmAdded = (nouveauFilm) => {
    setFilms([...films, nouveauFilm]);
  };

  const handleDeleteFilm = (id) => {
    api.delete(`/api/films/${id}`)
      .then(() => {
        setFilms(films.filter(film => film._id !== id));
      })
      .catch(error => console.error('Erreur lors de la suppression :', error));
  };

  const handleUpdateFilm = (id, updatedData) => {
    api.put(`/api/films/${id}`, updatedData)
      .then(response => {
        setFilms(films.map(film => film._id === id ? response.data : film));
      })
      .catch(error => console.error('Erreur lors de la modification :', error));
  };

  const handleEventAdded = (nouvelEvent) => {
    setEvents([...events, nouvelEvent]);
  };

  const handleDeleteEvent = (id) => {
    api.delete(`/api/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(error => console.error('Erreur lors de la suppression :', error));
  };

  const handleLogin = (nomUtilisateur) => {
    setConnecte(true);
    setUsername(nomUtilisateur);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setConnecte(false);
    setUsername('');
    setEvents([]);
  };

  const ordreStatut = { 'To watch': 0, 'Watched': 1, 'Abandoned': 2 };

  const filmsFiltres = (filtreStatut === 'All'
    ? films.filter(film => film.status !== 'Abandoned')
    : films.filter(film => film.status === filtreStatut)
  ).slice().sort((a, b) => {
    const diffStatut = ordreStatut[a.status] - ordreStatut[b.status];
    if (diffStatut !== 0) return diffStatut;
    return (b.note || 0) - (a.note || 0);
  });

  const eventsTries = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <div className="bloc-auth">
        {connecte ? (
          <div className="infos-connexion">
            <p>Logged in as {username}</p>
            <button onClick={handleLogout} className="bouton-logout">Logout</button>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>

      <section className="section-films">
        <h2>Add a movie</h2>
        {connecte && <AddFilm onFilmAdded={handleFilmAdded} />}

        <div className="filtres-statut">
          {['All', 'To watch', 'Watched', 'Abandoned'].map(statut => (
            <button
              key={statut}
              className={filtreStatut === statut ? 'filtre-actif' : ''}
              onClick={() => setFiltreStatut(statut)}
            >
              {statut}
            </button>
          ))}
        </div>

        <FilmList
          films={filmsFiltres}
          onDeleteFilm={connecte ? handleDeleteFilm : null}
          onUpdateFilm={connecte ? handleUpdateFilm : null}
          connecte={connecte}
        />
      </section>

      {connecte && (
        <section className="section-evenements">
          <AddEvent films={films} onEventAdded={handleEventAdded} />
          <EventList events={eventsTries} onDeleteEvent={handleDeleteEvent} />
        </section>
      )}
    </div>
  );
}

export default App;