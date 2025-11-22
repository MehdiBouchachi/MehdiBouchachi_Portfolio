<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Repository Quick Guide for AI Agents

This is a small React + Vite single-page app. The goal of this file is to give focused, actionable context so an AI coding agent can be immediately productive.

1) Big picture
- Type: Single-page React app using Vite dev server (ESM). Entry point: `index.html` -> `src/main.jsx`.
- Root component: `src/App.jsx`. Styling entry: `src/index.css`.
- Static assets: `public/` (served at `/`) and `src/assets/` (importable from modules).

2) Key files and what they show
- `package.json`: scripts: `dev` (vite), `build` (vite build), `preview` (vite preview), `lint` (eslint). Use `npm install` then `npm run dev` to start.
- `vite.config.js`: Vite + `@vitejs/plugin-react` (Fast Refresh/HMR). Rely on Vite's ESM behavior for imports.
- `eslint.config.js`: ESLint is configured for JS/JSX. Note rule: `no-unused-vars` ignores identifiers starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`). This is deliberate to allow React component names/constants to be unused during early scaffold work.

3) Typical developer workflows (commands)
- Install: `npm install`
- Dev server (HMR): `npm run dev` — opens Vite dev server, hot refresh on edits.
- Build for production: `npm run build`
- Local production preview: `npm run preview`
- Lint checks: `npm run lint` (auto-fix not included in script; run `npx eslint . --fix` to attempt fixes).

4) Project conventions and patterns
- File extensions: `.jsx` for React components. Keep components PascalCase (e.g., `App.jsx`) — ESLint treats leading uppercase specially.
- Module style: ESM imports/exports (`type: "module"` in `package.json`). Use absolute `/src/...` or relative imports from `src/` per Vite conventions.
- Assets: import images from `src/assets` (e.g., `import logo from './assets/logo.png'`) or place static files in `public/` and reference `/file.ext`.

5) What to look for when editing or adding features
- Entry wiring: `index.html` loads `/src/main.jsx` which mounts `<App />` into `<div id="root"></div>`.
- If adding new pages/components, create files under `src/`, export as default, and import them into `App.jsx` or route components.
- No router/SSR present — if a routing library is added, update `vite.config.js` only if new build steps/plugins are required.

6) Lint & types
- The repo contains `@types/react` devDependency but is currently plain JavaScript. Do not assume TypeScript is enabled.
- If introducing TypeScript, update ESLint config and `package.json` scripts accordingly.

7) Tests
- No test framework detected. If adding tests, prefer lightweight setup (Jest or Vitest) and add `test` script to `package.json`.

8) Debugging notes for agents
- Vite dev server provides fast refresh — reproduce issues by running `npm run dev` and inspecting browser console + network.
- Use `console.log` temporarily in `src/App.jsx` or `src/main.jsx`; Vite will reflect changes immediately.

9) Examples
- Start dev server:
  - `npm install`
  - `npm run dev`
- Add a component skeleton `src/components/Hello.jsx`:
  ```jsx
  export default function Hello(){
    return <div>Hello</div>
  }
  ```
  Then `import Hello from './components/Hello.jsx'` in `App.jsx` and render it.

10) When merging/committing changes
- Keep changes scoped and run `npm run lint` before opening PRs. There are no CI files discovered; follow repo owner preferences when creating PRs.

If any section is unclear or you'd like the guide expanded with examples (e.g., adding routing, TypeScript migration steps, or a suggested testing setup), tell me which area to expand.
