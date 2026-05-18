function formatLoggedAt(isoDate) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

export function SessionList({ sessions }) {
  if (sessions.length === 0) {
    return (
      <section className="session-list empty">
        <h2>Recent sessions</h2>
        <p>No sessions yet. Log your first study block above.</p>
      </section>
    )
  }

  return (
    <section className="session-list">
      <h2>Recent sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <div>
              <strong>{session.subject}</strong>
              <span className="meta">{formatLoggedAt(session.loggedAt)}</span>
            </div>
            <span className="duration">{session.minutes} min</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
