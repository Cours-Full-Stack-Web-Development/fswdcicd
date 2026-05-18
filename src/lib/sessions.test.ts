import { describe, expect, it } from 'vitest'
import {
  createSession,
  formatDuration,
  totalMinutes,
  validateSessionInput,
} from './sessions'

describe('validateSessionInput', () => {
  it('accepts valid input', () => {
    const result = validateSessionInput('Algorithms', '45')
    expect(result).toEqual({
      ok: true,
      value: { subject: 'Algorithms', minutes: 45 },
    })
  })

  it('rejects empty subject', () => {
    const result = validateSessionInput('  ', '30')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors).toContain('Subject is required.')
    }
  })

  it('rejects invalid duration', () => {
    const result = validateSessionInput('React', '0')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors).toContain(
        'Duration must be between 1 and 480 minutes.',
      )
    }
  })
})

describe('createSession', () => {
  it('creates a session with metadata', () => {
    const session = createSession({ subject: 'CI/CD', minutes: 25 })
    expect(session.subject).toBe('CI/CD')
    expect(session.minutes).toBe(25)
    expect(session.id).toBeTruthy()
    expect(session.loggedAt).toBeTruthy()
  })
})

describe('totalMinutes', () => {
  it('sums session durations', () => {
    const sessions = [
      createSession({ subject: 'A', minutes: 30 }),
      createSession({ subject: 'B', minutes: 15 }),
    ]
    expect(totalMinutes(sessions)).toBe(45)
  })
})

describe('formatDuration', () => {
  it('formats minutes only', () => {
    expect(formatDuration(25)).toBe('25m')
  })

  it('formats hours and minutes', () => {
    expect(formatDuration(95)).toBe('1h 35m')
  })
})
