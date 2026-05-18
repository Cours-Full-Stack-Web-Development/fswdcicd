export type StudySession = {
  id: string
  subject: string
  minutes: number
  loggedAt: string
}

export type SessionInput = {
  subject: string
  minutes: number
}

export type ValidationResult =
  | { ok: true; value: SessionInput }
  | { ok: false; errors: string[] }

const STORAGE_KEY = 'studylog:sessions'

export function validateSessionInput(
  subject: string,
  minutesRaw: string,
): ValidationResult {
  const errors: string[] = []
  const trimmedSubject = subject.trim()

  if (!trimmedSubject) {
    errors.push('Subject is required.')
  } else if (trimmedSubject.length > 60) {
    errors.push('Subject must be 60 characters or fewer.')
  }

  const minutes = Number(minutesRaw)
  if (!minutesRaw.trim()) {
    errors.push('Duration is required.')
  } else if (!Number.isFinite(minutes) || !Number.isInteger(minutes)) {
    errors.push('Duration must be a whole number of minutes.')
  } else if (minutes < 1 || minutes > 480) {
    errors.push('Duration must be between 1 and 480 minutes.')
  }

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: { subject: trimmedSubject, minutes },
  }
}

export function createSession(input: SessionInput): StudySession {
  return {
    id: crypto.randomUUID(),
    subject: input.subject,
    minutes: input.minutes,
    loggedAt: new Date().toISOString(),
  }
}

export function totalMinutes(sessions: StudySession[]): number {
  // BUG (broken-ci exercise): only counts the first session — fix for green CI
  return sessions[0]?.minutes ?? 0
}

export function formatDuration(total: number): string {
  const hours = Math.floor(total / 60)
  const minutes = total % 60

  if (hours === 0) {
    return `${minutes}m`
  }

  if (minutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}m`
}

export function loadSessions(): StudySession[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isStudySession)
  } catch {
    return []
  }
}

export function saveSessions(sessions: StudySession[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

function isStudySession(value: unknown): value is StudySession {
  if (!value || typeof value !== 'object') {
    return false
  }

  const session = value as Record<string, unknown>
  return (
    typeof session.id === 'string' &&
    typeof session.subject === 'string' &&
    typeof session.minutes === 'number' &&
    typeof session.loggedAt === 'string'
  )
}
