import { useState, useEffect } from 'react';
import axios from 'axios';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';

function App() {
  const [films, setFilms] = useState([]);
  const [events, setEvents] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('Tous');

  useEffect(() => {
    axios.get('http://localhost:5000/api/films')
      .then(response => setFilms(response.data))
      .catch(error => console.error('Erreur lors du chargement des films :', error));

    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Erreur lors du chargement des événements :', error));
  }, []);

  const handleFilmAdded = (nouveauFilm) => {
    setFilms([...films, nouveauFilm]);
  };

  const handleDeleteFilm = (id) => {
    axios.delete(`http://localhost:5000/api/films/${id}`)
      .then(() => {
        setFilms(films.filter(film => film._id !== id));
      })
      .catch(error => console.error('Erreur lors de la suppression :', error));
  };

  const handleUpdateFilm = (id, updatedData) => {
    axios.put(`http://localhost:5000/api/films/${id}`, updatedData)
      .then(response => {
        setFilms(films.map(film => film._id === id ? response.data : film));
      })
      .catch(error => console.error('Erreur lors de la modification :', error));
  };

  const handleEventAdded = (nouvelEvent) => {
    setEvents([...events, nouvelEvent]);
  };

  const handleDeleteEvent = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(error => console.error('Erreur lors de la suppression :', error));
  };
  
  const filmsFiltres = filtreStatut === 'Tous'
    ? films
    : films.filter(film => film.status === filtreStatut);

  const eventsTries = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
  <div>
    <section className="section-films">
      <h2>Ajouter un film</h2>
      <AddFilm onFilmAdded={handleFilmAdded} />

      <div className="filtres-statut">
        {['Tous', 'À regarder', 'Vu', 'Abandonné'].map(statut => (
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
    onDeleteFilm={handleDeleteFilm}
    onUpdateFilm={handleUpdateFilm}
  />
</section>

    <section className="section-evenements">
      <AddEvent films={films} onEventAdded={handleEventAdded} />
      <EventList events={eventsTries} onDeleteEvent={handleDeleteEvent} />
    </section>
  </div>
 );
}

export default App;