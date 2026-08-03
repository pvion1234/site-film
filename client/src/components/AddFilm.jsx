import { useState } from 'react';
import axios from 'axios';

function AddFilm({ onFilmAdded }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('À regarder');

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
        placeholder="Titre du film"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="À regarder">À regarder</option>
        <option value="Vu">Vu</option>
        <option value="Abandonné">Abandonné</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddFilm;