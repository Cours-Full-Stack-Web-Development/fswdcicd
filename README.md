# StudyLog

A small **Vite + React** app for tracking study sessions. It is designed as a hands-on **CI/CD lab**: students fork or clone the repo, implement a feature on a branch, open a pull request, and verify that GitHub Actions runs lint, tests, and build successfully.

## Topic

**StudyLog** lets learners record what they studied (subject + duration in minutes), see recent sessions, and view simple totals. Data is stored in `localStorage`—no backend required.

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Scripts

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start dev server with HMR        |
| `npm run build`   | Type-check and production build  |
| `npm run test`    | Run unit tests once (CI uses this) |
| `npm run test:watch` | Run tests in watch mode       |
| `npm run lint`    | ESLint                           |
| `npm run preview` | Preview production build locally |

## Project layout

```
src/
  lib/sessions.ts      # Pure logic: validation, totals, storage
  hooks/useSessions.ts # React state + persistence
  components/          # UI pieces (form, list, stats)
  App.tsx              # Page composition
```

Keeping business rules in `src/lib/` makes the app easy to extend: add functions, write tests, then wire them in components.

## CI pipeline

On every push and pull request to `main` / `master`, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

Students should see a green check on the PR when all steps pass.

## Suggested student exercises

Pick one (or combine) for a PR assignment:

1. **Delete a session** — add a remove button and update storage.
2. **Filter by subject** — search or dropdown to narrow the list.
3. **Weekly goal** — e.g. target 300 minutes/week with a progress bar.
4. **Export CSV** — download sessions as a file.
5. **Validation tweak** — allow 15-minute increments only; update tests accordingly.

Each exercise should include **tests** for new logic in `src/lib/` and, when relevant, a component test.

## Course workflow (GitHub)

1. Fork this repository (or use a classroom org repo).
2. Create a branch: `git checkout -b feature/delete-session`
3. Implement the feature and run `npm run lint && npm run test && npm run build` locally.
4. Push and open a pull request.
5. Open the **Checks** tab on the PR and confirm CI is green before merging.

## License

MIT — use freely for teaching.
