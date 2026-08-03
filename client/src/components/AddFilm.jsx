import { useState } from 'react';
import axios from 'axios';

function AddFilm({ onFilmAdded }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('To watch');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/api/films`, { title, status })
      .then(response => {
        onFilmAdded(response.data);
        setTitle('');
        setStatus('À regarder');
      })
      .catch(error => console.error('Erreur lors de l\'ajout du film :', error));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add</button>
    </form>
  );
}

export default AddFilm;