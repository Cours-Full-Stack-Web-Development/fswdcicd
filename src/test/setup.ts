import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

const storage = new Map<string, string>()

const localStorageMock: Storage = {
  get length() {
    return storage.size
  },
  clear() {
    storage.clear()
  },
  getItem(key: string) {
    return storage.get(key) ?? null
  },
  key(index: number) {
    return [...storage.keys()][index] ?? null
  },
  removeItem(key: string) {
    storage.delete(key)
  },
  setItem(key: string, value: string) {
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
