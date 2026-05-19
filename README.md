# StudyLog

A small **Vite + React (JavaScript)** app for tracking study sessions. It is designed as a hands-on **CI/CD lab**: students fork or clone the repo, implement a feature on a branch, open a pull request, and verify that GitHub Actions runs lint, tests, and build successfully.

## Topic

**StudyLog** lets learners record what they studied (subject + duration in minutes), see recent sessions, and view simple totals. Data is stored in `localStorage`—no backend required.

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Scripts

| Command              | Purpose                            |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start dev server with HMR          |
| `npm run build`      | Production build                   |
| `npm run test`       | Run unit tests once (CI uses this) |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run lint`       | ESLint                             |
| `npm run preview`    | Preview production build locally   |

## Project layout

```
src/
  lib/sessions.js      # Pure logic: validation, totals, storage
  hooks/useSessions.js # React state + persistence
  components/          # UI pieces (form, list, stats)
  App.jsx              # Page composition
```

Keeping business rules in `src/lib/` makes the app easy to extend: add functions, write tests, then wire them in components.

## CI pipeline

On every push and pull request to `main` / `master`, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

## Broken CI exercise branch

The remote branch **`broken-ci`** is intentionally red on GitHub Actions.

1. Check out the branch: `git fetch origin && git checkout broken-ci`
2. Open the failed workflow run on GitHub and read which step failed (tests).
3. Run locally: `npm run test` — the `totalMinutes` test should fail.
4. Fix the bug in `src/lib/sessions.js` (hint: sum **all** sessions, not just the first).
5. Push your fix on a new branch and open a PR; CI should pass.

`main` stays green; use `broken-ci` only for the debugging lab.

## License

MIT
