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
          <option value="À regarder">À regarder</option>
          <option value="Vu">Vu</option>
          <option value="Abandonné">Abandonné</option>
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
          placeholder="Commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />
        <button onClick={handleSave}>Enregistrer</button>
        <button onClick={handleCancel}>Annuler</button>
      </li>
    );
  }

  const statusClass = {
    'À regarder': 'statut-a-regarder',
    'Vu': 'statut-vu',
    'Abandonné': 'statut-abandonne',
  };

  return (
    <li>
      <strong>{film.title}</strong>
      <span className={`badge-statut ${statusClass[film.status]}`}>{film.status}</span>
      {film.note && ` — Note : ${film.note}/10`}
      {film.commentaire && ` — "${film.commentaire}"`}
      <button onClick={() => setIsEditing(true)}>Modifier</button>
      <button onClick={() => onDeleteFilm(film._id)}>Supprimer</button>
    </li>
  );
}

export default FilmItem;