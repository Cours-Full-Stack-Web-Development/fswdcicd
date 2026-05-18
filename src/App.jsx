import { SessionForm } from './components/SessionForm.jsx'
import { SessionList } from './components/SessionList.jsx'
import { StatsBanner } from './components/StatsBanner.jsx'
import { useSessions } from './hooks/useSessions.js'
import './App.css'

function App() {
  const { sessions, addSession } = useSessions()

  return (
    <div className="app">
      <header className="app-header">
        <p className="eyebrow">FSWD · CI/CD lab</p>
        <h1>StudyLog</h1>
        <p className="tagline">
          Track study sessions locally. Extend the app via pull requests and
          watch CI validate your changes.
        </p>
      </header>

      <main className="app-main">
        <StatsBanner sessions={sessions} />
        <SessionForm onAdd={addSession} />
        <SessionList sessions={sessions} />
      </main>

      <footer className="app-footer">
        <p>
          Student ideas: delete sessions, filter by subject, export to CSV, or
          show a weekly goal progress bar.
        </p>
      </footer>
    </div>
  )
}

export default App
