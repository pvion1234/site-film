import { useState } from 'react';

function FilmItem({ film, onDeleteFilm, onUpdateFilm }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(film.title);
  const [status, setStatus] = useState(film.status);
  const [note, setNote] = useState(film.note || '');
  const [commentaire, setCommentaire] = useState(film.commentaire || '');

  const handleSave = () => {
    onUpdateFilm(film._id, { title, status, note, commentaire });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(film.title);
    setStatus(film.status);
    setNote(film.note || '');
    setCommentaire(film.commentaire || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="film-en-edition">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To watch">To watch</option>
          <option value="Watched">Watched</option>
          <option value="Abandoned">Abandoned</option>
        </select>
        <input
          type="number"
          min="0"
          max="10"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          type="text"
          placeholder="Comment"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </li>
    );
  }

  const statusClass = {
    'To watch': 'statut-a-regarder',
    'Watched': 'statut-vu',
    'Abandonned': 'statut-abandonne',
  };

  return (
  <li>
    <div className="film-ligne-principale">
      <strong>{film.title}</strong>
      <span className={`badge-statut ${statusClass[film.status]}`}>{film.status}</span>
      {film.note && <span> — Rating: {film.note}/10</span>}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDeleteFilm(film._id)}>Delete</button>
    </div>
    {film.commentaire && <p className="film-commentaire">"{film.commentaire}"</p>}
    </li>
  );
}

export default FilmItem;