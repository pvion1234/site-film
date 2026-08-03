import FilmItem from './FilmItem';

function FilmList({ films, onDeleteFilm, onUpdateFilm, connecte }) {
  return (
    <div>
      <h1>My movie list</h1>
      <ul>
        {films.map(film => (
          <FilmItem
            key={film._id}
            film={film}
            onDeleteFilm={onDeleteFilm}
            onUpdateFilm={onUpdateFilm}
            connecte={connecte}
          />
        ))}
      </ul>
    </div>
  );
}

export default FilmList;