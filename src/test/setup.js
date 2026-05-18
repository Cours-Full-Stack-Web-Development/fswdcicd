import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

const storage = new Map()

const localStorageMock = {
  get length() {
    return storage.size
  },
  clear() {
    storage.clear()
  },
  getItem(key) {
    return storage.get(key) ?? null
  },
  key(index) {
    return [...storage.keys()][index] ?? null
  },
  removeItem(key) {
    storage.delete(key)
  },
  setItem(key, value) {
    storage.set(key, value)
  },
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true,
})

beforeEach(() => {
  storage.clear()
})

afterEach(() => {
  cleanup()
})
