# Adobe Summit 2026 — Product Flashcards

Interactive flashcard app for learning Adobe's enterprise product stack, built for Sprinklr Solutions Consultants preparing for the Adobe Summit booth.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173/adobe-flashcards/](http://localhost:5173/adobe-flashcards/) in your browser.

## Deploy to GitHub Pages

### 1. Create a GitHub repo

Create a new repo named `adobe-flashcards` (or whatever you like — just update `base` in `vite.config.js` to match).

### 2. Update the base path

In `vite.config.js`, make sure the `base` value matches your repo name:

```js
base: '/adobe-flashcards/',
```

### 3. Push your code

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/adobe-flashcards.git
git push -u origin main
```

### 4. Deploy

```bash
npm run deploy
```

This builds the project and pushes the `dist` folder to a `gh-pages` branch.

### 5. Enable GitHub Pages

Go to your repo → **Settings** → **Pages** → set source to the `gh-pages` branch.

Your app will be live at: `https://YOUR_USERNAME.github.io/adobe-flashcards/`

## Features

- **25 cards** across 7 categories (Data & Analytics, Content & Creation, Marketing & Orchestration, etc.)
- Toggle categories on/off to focus sessions
- "Got it" / "Still learning" tracking with focused review sessions
- Sprinklr integration context on each product card
- Keyboard support: Space/Enter to flip, Arrow keys to mark
- Progress tracking across sessions

## Built With

- [Vite](https://vite.dev/) + [React](https://react.dev/)
- Deployed with [gh-pages](https://www.npmjs.com/package/gh-pages)
