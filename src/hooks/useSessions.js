import { useState } from 'react'
import {
  createSession,
  loadSessions,
  saveSessions,
} from '../lib/sessions.js'

export function useSessions() {
  const [sessions, setSessions] = useState(() => loadSessions())

  function addSession(input) {
    const next = [createSession(input), ...sessions]
    setSessions(next)
    saveSessions(next)
  }

  return { sessions, addSession }
}
