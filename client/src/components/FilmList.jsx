import FilmItem from './FilmItem';

function FilmList({ films, onDeleteFilm, onUpdateFilm }) {
  return (
    <div>
      <h1>Ma liste de films</h1>
      <ul>
        {films.map(film => (
          <FilmItem
            key={film._id}
            film={film}
            onDeleteFilm={onDeleteFilm}
            onUpdateFilm={onUpdateFilm}
          />
        ))}
      </ul>
    </div>
  );
}

export default FilmList;