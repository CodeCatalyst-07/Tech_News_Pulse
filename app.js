//  Tech News Pulse — app.js
//  News is fetched via /api/news (Vercel serverless function)
//  The actual GNews API key lives in Vercel Environment Variables — never in this file

// ── State ──
let allArticles   = [];
let savedArticles = [];
let currentCat    = 'technology';
let currentSearch = '';
let currentSort   = 'newest';

// DOM CODE
const newsGrid    = document.getElementById('newsGrid');
const loadingMsg  = document.getElementById('loadingMsg');
const errorMsg    = document.getElementById('errorMsg');
const emptyMsg    = document.getElementById('emptyMsg');
const searchInput = document.getElementById('searchInput');
const sortSelect  = document.getElementById('sortSelect');
const savedCount  = document.getElementById('savedCount');
const savedPanel  = document.getElementById('savedPanel');
const savedList   = document.getElementById('savedList');
const catBtns     = document.querySelectorAll('.cat-btn');
const themeToggle = document.getElementById('themeToggle');



//  FETCH CODE

//  Calls our Vercel serverless function — API key never reaches the browser
async function fetchNews(query) {
  showLoading();
  try {
    const url = `/api/news?query=${encodeURIComponent(query)}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    allArticles = data.articles.filter(a => a.title);

    renderArticles();
  } catch (err) {
    showError();
    console.error(err);
  }
}



//  RENDER COMMANDS

function renderArticles() {
  // 1. Search — using .filter()
  let results = allArticles.filter(a => {
    const kw = currentSearch.toLowerCase();
    return (
      a.title?.toLowerCase().includes(kw) ||
      a.description?.toLowerCase().includes(kw)
    );
  });

  // 2. Sort — using .sort() Function 
  results = results.sort((a, b) => {
    if (currentSort === 'newest') return new Date(b.publishedAt) - new Date(a.publishedAt);
    if (currentSort === 'oldest') return new Date(a.publishedAt) - new Date(b.publishedAt);
    if (currentSort === 'az')     return a.title.localeCompare(b.title);
    return 0;
  });

  if (results.length === 0) {
    showEmpty();
    return;
  }

  hideAll();
  newsGrid.classList.remove('hidden');

  // 3. Render cards — using .map()
  newsGrid.innerHTML = results.map(article => buildCard(article)).join('');

  // Attaching save button events
  newsGrid.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleSave(btn.dataset.url));
  });
}

function buildCard(article) {
  const fallback = 'https://placehold.co/600x180/e0e0e0/666666?text=No+Image';
  const img      = article.image || fallback;
  const desc     = article.description || 'No description available.';
  const source   = article.source?.name || 'Unknown';
  const date     = article.publishedAt ? new Date(article.publishedAt).toDateString() : '';
  const tag      = getTag(article);
  const isSaved  = !!savedArticles.find(a => a.url === article.url);

  return `
    <div class="card">
      <img src="${img}" alt="" onerror="this.src='${fallback}'" loading="lazy" />
      <div class="card-body">
        <span class="card-tag">${tag}</span>
        <p class="card-title">${escHtml(article.title)}</p>
        <p class="card-desc">${escHtml(desc)}</p>
        <p class="card-meta">${escHtml(source)} · ${date}</p>
      </div>
      <div class="card-footer">
        <a class="read-btn" href="${article.url}" target="_blank" rel="noopener">Read More</a>
        <button class="save-btn ${isSaved ? 'saved' : ''}" data-url="${article.url}">
          ${isSaved ? '🔖 Saved' : '+ Save'}
        </button>
      </div>
    </div>
  `;
}



//  SAVE FOR LATER CODE

function toggleSave(url) {
  const alreadySaved = !!savedArticles.find(a => a.url === url);

  if (alreadySaved) {
    // Remove — using .filter()
    savedArticles = savedArticles.filter(a => a.url !== url);
  } else {
    // Add — using .find()
    const article = allArticles.find(a => a.url === url);
    if (article) savedArticles.push(article);
  }

  savedCount.textContent = savedArticles.length;
  renderSavedList();
  renderArticles();
}

function renderSavedList() {
  if (savedArticles.length === 0) {
    savedList.innerHTML = '<p class="no-saved">No saved articles yet.</p>';
    return;
  }

  // Using .map()
  savedList.innerHTML = savedArticles.map(a => {
    const fallback = 'https://placehold.co/60x60/e0e0e0/666666?text=📰';
    const img = a.image || fallback;
    return `
      <div class="saved-item">
        <img src="${img}" alt="" onerror="this.src='${fallback}'" />
        <div class="saved-item-info">
          <p class="saved-item-title">${escHtml(a.title)}</p>
          <div class="saved-item-actions">
            <a href="${a.url}" target="_blank" rel="noopener">Read</a>
            <button onclick="removeSaved('${a.url}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function removeSaved(url) {
  savedArticles = savedArticles.filter(a => a.url !== url);
  savedCount.textContent = savedArticles.length;
  renderSavedList();
  renderArticles();
}



//  NIGHT MODE Code

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Night Mode';
  localStorage.setItem('nightMode', dark);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(!isDark);
});

// Restore saved preference on load
if (localStorage.getItem('nightMode') === 'true') setTheme(true);



//  DIFFERENT CATEGORY BUTTONS

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    fetchNews(currentCat);
  });
});



//  SEARCH CODE

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value;
  renderArticles();
});



//  SORT FUNCTION CODE

sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderArticles();
});



//  SAVED PANEL CODE

document.getElementById('savedToggle').addEventListener('click', () => {
  savedPanel.classList.remove('hidden');
  renderSavedList();
});

document.getElementById('closePanel').addEventListener('click', () => {
  savedPanel.classList.add('hidden');
});

document.getElementById('retryBtn').addEventListener('click', () => {
  fetchNews(currentCat);
});



//  UI STATE HELPERS

function showLoading() {
  loadingMsg.classList.remove('hidden');
  errorMsg.classList.add('hidden');
  emptyMsg.classList.add('hidden');
  newsGrid.classList.add('hidden');
  newsGrid.innerHTML = '';
}

function showError() {
  loadingMsg.classList.add('hidden');
  errorMsg.classList.remove('hidden');
  emptyMsg.classList.add('hidden');
  newsGrid.classList.add('hidden');
}

function showEmpty() {
  loadingMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');
  emptyMsg.classList.remove('hidden');
  newsGrid.classList.add('hidden');
}

function hideAll() {
  loadingMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');
  emptyMsg.classList.add('hidden');
}



//  HELPERS CODE

function getTag(article) {
  const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
  if (text.includes('ai') || text.includes('artificial intelligence')) return 'AI';
  if (text.includes('crypto') || text.includes('bitcoin'))             return 'Crypto';
  if (text.includes('gadget') || text.includes('phone'))               return 'Gadgets';
  if (text.includes('startup') || text.includes('funding'))            return 'Startup';
  return 'Tech';
}

function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}



//  START 

fetchNews(currentCat);
