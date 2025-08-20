# TMDB Movie Panel (React + Vite + Redux)

A small movie web panel implementing:
- Popular (Home), Top Rated, Upcoming pages
- Single Movie Detail page with cast
- Global search from the navbar
- Pagination using TMDB's `page` parameter

## Setup
1) Install Node.js 18+
2) In this project folder, run:
   ```bash
   npm install
   npm run dev
   ```
3) Create a `.env` file (copy `.env.sample`) and set your TMDB key. The project also includes a fallback demo key for convenience.

## Build
```bash
npm run build
npm run preview
```

## Deploy to CodeSandbox
- Create a new Sandbox "Import from ZIP" and upload the zipped project.
- Or push to GitHub and import the repo URL on CodeSandbox.
