import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the study log shell', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /studylog/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add session/i })).toBeInTheDocument()
  })

  it('adds a session after valid input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/subject/i), 'TypeScript')
    await user.clear(screen.getByLabelText(/minutes/i))
    await user.type(screen.getByLabelText(/minutes/i), '30')
    await user.click(screen.getByRole('button', { name: /add session/i }))

    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
    expect(screen.getByLabelText(/study statistics/i)).toHaveTextContent('1')
    expect(screen.getByLabelText(/study statistics/i)).toHaveTextContent('30m')
  })
})
