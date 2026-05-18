import { useState } from 'react'
import {
  createSession,
  loadSessions,
  saveSessions,
  type SessionInput,
  type StudySession,
} from '../lib/sessions'

export function useSessions() {
  const [sessions, setSessions] = useState<StudySession[]>(() => loadSessions())

  function addSession(input: SessionInput) {
    const next = [createSession(input), ...sessions]
    setSessions(next)
    saveSessions(next)
  }

  return { sessions, addSession }
}
