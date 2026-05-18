import { formatDuration, totalMinutes } from '../lib/sessions.js'

export function StatsBanner({ sessions }) {
  const total = totalMinutes(sessions)

  return (
    <section className="stats-banner" aria-label="Study statistics">
      <div>
        <p className="label">Sessions</p>
        <p className="value">{sessions.length}</p>
      </div>
      <div>
        <p className="label">Total time</p>
        <p className="value">{formatDuration(total)}</p>
      </div>
    </section>
  )
}
