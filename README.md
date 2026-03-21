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
2. Open `app.js` and replace `YOUR_API_KEY_HERE` with your NewsAPI key
3. Open `index.html` in a browser (or use Live Server in VS Code)

---

## Files

```
index.html   — page structure
style.css    — styling and dark mode
app.js       — all logic (fetch, search, filter, sort, save)
```

---

## Array HOFs used

- `.filter()` — search and remove saved articles
- `.sort()` — sort by date or title
- `.find()` — look up an article by URL
- `.map()` — render article cards and saved list

---
