function EventList({ events, onDeleteEvent }) {
  return (
    <div>
      <h2>Événements à venir</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.film?.title}</strong> — le {new Date(event.date).toLocaleDateString('fr-FR')} à {event.heure}
            <button onClick={() => onDeleteEvent(event._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;