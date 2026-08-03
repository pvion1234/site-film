function EventList({ events, onDeleteEvent }) {
  return (
    <div>
      <h2>Upcoming events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.film?.title}</strong> — on {new Date(event.date).toLocaleDateString('fr-FR')} at {event.heure}
            <button onClick={() => onDeleteEvent(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;