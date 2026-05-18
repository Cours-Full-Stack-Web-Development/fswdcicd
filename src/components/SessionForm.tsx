import { type FormEvent, useState } from 'react'
import { validateSessionInput } from '../lib/sessions'
import type { SessionInput } from '../lib/sessions'

type SessionFormProps = {
  onAdd: (input: SessionInput) => void
}

export function SessionForm({ onAdd }: SessionFormProps) {
  const [subject, setSubject] = useState('')
  const [minutes, setMinutes] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = validateSessionInput(subject, minutes)
    if (!result.ok) {
      setErrors(result.errors)
      return
    }

    onAdd(result.value)
    setSubject('')
    setMinutes('')
    setErrors([])
  }

  return (
    <form className="session-form" onSubmit={handleSubmit} noValidate>
      <h2>Log a session</h2>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          placeholder="e.g. Web development"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="minutes">Minutes</label>
        <input
          id="minutes"
          name="minutes"
          type="number"
          min={1}
          max={480}
          placeholder="45"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
        />
      </div>
      {errors.length > 0 && (
        <ul className="form-errors" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <button type="submit">Add session</button>
    </form>
  )
}
