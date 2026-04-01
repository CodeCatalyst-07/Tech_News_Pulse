# Tech News Pulse

A simple tech news aggregator built with HTML, CSS, and JavaScript.

---

## What it does

- Fetches real-time tech news using the NewsAPI
- Filter by category: All Tech, AI, Crypto, Gadgets
- Search articles by keyword
- Sort by Newest, Oldest, or A→Z
- Save articles to read later
- Night mode toggle (preference saved in localStorage)
- Fully responsive on mobile

---

## API Used

**NewsAPI** — https://newsapi.org  
Endpoint: `GET /v2/everything`

> Free plan only works on localhost. For deployment use GNews or TheNewsAPI instead.

---

## How to run

1. Clone this repo
2. Create a `config.js` file in the project root (this file is gitignored):
   ```js
   const API_KEY = 'your_actual_api_key_here';
   ```
3. Open `index.html` in a browser (or use Live Server in VS Code)

> ⚠️ `config.js` is listed in `.gitignore` and will never be pushed to GitHub.  
> Anyone cloning this repo must create their own `config.js` with their own API key.

---

## Files

```
index.html    — page structure
style.css     — styling and dark mode
app.js        — all logic (fetch, search, filter, sort, save)
config.js     — your API key (gitignored, NOT pushed to GitHub)
.gitignore    — tells Git to ignore config.js
```

---

## Array HOFs used

- `.filter()` — search and remove saved articles
- `.sort()` — sort by date or title
- `.find()` — look up an article by URL
- `.map()` — render article cards and saved list

---

## Milestones

| Milestone | Deadline | Status |
|---|---|---|
| M1 — Setup & README | 23rd March | ✅ Done |
| M2 — API Integration | 1st April | ✅ Done |
| M3 — Core Features | 8th April | ✅ Done |
| M4 — Deploy & Submit | 10th April | ⏳ Pending |
