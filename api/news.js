// api/news.js
// This runs on Vercel's server — the API key is NEVER sent to the browser

export default async function handler(req, res) {

  // Allow requests from your site only
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    // API_KEY is read from Vercel Environment Variables — never exposed to browser
    const API_KEY = process.env.GNEWS_API_KEY;

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=40&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data     = await response.json();

    if (data.errors) {
      return res.status(500).json({ error: data.errors[0] });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
}
