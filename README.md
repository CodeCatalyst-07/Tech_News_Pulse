# Tech News Pulse

A simple tech news aggregator built with HTML, CSS, and JavaScript. Fetches real-time technology headlines and lets you search, filter, sort, and save articles for later.

---

## What it does

- Fetches real-time tech news using the GNews API
- Filter by category: All Tech, AI, Crypto, Gadgets
- Search articles by keyword
- Sort by Newest, Oldest, or A→Z
- Save articles to a "Read Later" list
- Night mode toggle (preference saved in localStorage)
- Fully responsive on mobile, tablet, and desktop

---

## API Used

**GNews API** — https://gnews.io  
Endpoint: `GET /api/v4/search`

The API key is **never exposed to the browser**. All requests go through a Vercel serverless function (`/api/news.js`) which calls GNews on the server side and returns the results.

---

## Project Structure

```
Tech_News_Pulse/
├── api/
│   └── news.js       — Vercel serverless function (proxies GNews API)
├── index.html        — page structure
├── style.css         — styling and dark/light mode
├── app.js            — all logic (fetch, search, filter, sort, save)
├── vercel.json       — Vercel routing config
├── .gitignore        — ignores config.js
└── README.md
```

---

## How it works (API proxy)

```
Browser → /api/news?query=technology → Vercel Function → GNews API
                                                              ↓
Browser ← articles JSON              ← Vercel Function ←────┘
```

The GNews API key is stored as a **Vercel Environment Variable** (`GNEWS_API_KEY`). It never appears in any file pushed to GitHub.

---

## How to run locally

1. Clone this repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Tech_News_Pulse.git
   cd Tech_News_Pulse
   ```

2. Install Vercel CLI (needed to run serverless functions locally):
   ```bash
   npm install -g vercel
   ```

3. Create a `.env` file in the project root:
   ```
   GNEWS_API_KEY=your_gnews_api_key_here
   ```

4. Run locally with Vercel dev server:
   ```bash
   vercel dev
   ```

5. Open `http://localhost:3000` in your browser.

> Get a free GNews API key at https://gnews.io

---

## How to deploy on Vercel

1. Push the project to GitHub
2. Go to vercel.com → Import your GitHub repo
3. In **Settings → Environment Variables**, add:
   - **Name:** `GNEWS_API_KEY`
   - **Value:** your GNews API key
4. Deploy — Vercel auto-deploys on every push to `main`

---

## Array HOFs used

All searching, filtering, and sorting uses Array Higher-Order Functions — no `for` or `while` loops anywhere:

- `.filter()` — search articles by keyword, remove saved articles
- `.sort()` — sort by date (newest/oldest) or title (A→Z)
- `.find()` — look up a specific article by URL
- `.map()` — render article cards and saved list as HTML

---

## Milestones

| Milestone | Deadline | Status |
|---|---|---|
| M1 — Setup & README | 23rd March | ✅ Done |
| M2 — API Integration | 1st April | ✅ Done |
| M3 — Core Features | 8th April | ✅ Done |
| M4 — Deploy & Final Submission | 10th April | ✅ Done |

---

## Live Demo

🔗 https://tech-news-pulse-drab.vercel.app/
