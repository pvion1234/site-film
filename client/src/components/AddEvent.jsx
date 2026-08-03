import { useState } from 'react';
import api from '../utils/api';

function AddEvent({ films, onEventAdded }) {
  const [filmId, setFilmId] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/api/events', { film: filmId, date, heure })
      .then(response => {
        onEventAdded(response.data);
        setFilmId('');
        setDate('');
        setHeure('');
      })
      .catch(error => console.error('Erreur lors de la création de l\'événement :', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={filmId} onChange={(e) => setFilmId(e.target.value)} required>
        <option value="">-- Choose a movie --</option>
        {films.map(film => (
          <option key={film._id} value={film._id}>{film.title}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={heure}
        onChange={(e) => setHeure(e.target.value)}
        required
      />
      <button type="submit">Schedule</button>
    </form>
  );
}

export default AddEvent;