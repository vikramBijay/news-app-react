# 📰 React News App

A fully responsive news aggregator built with **React.js** and **Tailwind CSS**. Browse top stories, filter by category, search articles, and navigate through paginated results — all powered by the free NewsAPI.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat&logo=tailwindcss)
![Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=flat&logo=reactrouter)
![API](https://img.shields.io/badge/News_API-Free_Tier-orange?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 🔗 Live Demo

👉 [vikrambijay.github.io/news-app](https://vikramBijay.github.io/news-app)

---

## ✨ Features

- 📰 **Top Stories** — Fetches and displays latest headlines on load
- 🗂️ **Category Filter** — Browse news by topic (Sports, Tech, Business, etc.)
- 🔍 **Optimized Search** — Debounced search — only **one API call** per query, not on every keystroke
- 📄 **Pagination** — Navigate through pages of results without re-fetching unnecessarily
- 🧩 **Single Category View** — Dedicated page for a selected category's full feed
- ⏳ **Loader** — Smooth loading state while API fetches data
- 📱 **Responsive** — Mobile-friendly layout with responsive navbar

---

## 🗂️ Project Structure

```
news-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Nav.jsx             # Desktop navigation bar
│   │   ├── Loader.jsx          # Loading spinner while fetching
│   │   ├── Newssection.jsx     # Main news feed / article grid
│   │   ├── Pagination.jsx      # Prev / Next page controls
│   │   ├── SingleCat.jsx       # Single category article listing
│   │   ├── TopStory.jsx        # Featured / top story highlight
│   │   └── Topics.jsx          # Category topic chips / tabs
│   ├── context/
│   │   └── NewsContext.jsx     # Global state — articles, category, search, page
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CategoryPage.jsx
│   │   └── SearchResults.jsx
│   ├── App.jsx                 # Routes + layout
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- A free API key from [newsapi.org](https://newsapi.org)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/vikramBijay/news-app.git
cd news-app

# 2. Install dependencies
npm install

# 3. Add your API key
# Create a .env file in the root:
echo "VITE_NEWS_API_KEY=your_api_key_here" > .env

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ **Note:** NewsAPI free tier only works on `localhost`. The deployed GitHub Pages version may not fetch live data — this is a free tier limitation of NewsAPI.

### Build for Production

```bash
npm run build
```

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| **React.js** | UI component framework |
| **Tailwind CSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **Context API** | Global state — articles, search, pagination |
| **NewsAPI (Free)** | Live news data source |

---

## 🔍 Search — One API Call Design

Search is **debounced** — the API is only called after the user **stops typing** (e.g. 500ms delay), not on every keystroke.

```js
// How it works under the hood
const handlesearch = (e) => {
    const searchvalue = e.target.value
    if (!searchvalue) return
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      const res = await fetchdata(`/everything?q=${searchvalue}&`)
      setdata(res)
    }, 500)
  }
```

This prevents unnecessary API rate limiting and keeps the app fast.

---

## 🌐 API

This project uses the **[NewsAPI](https://newsapi.org/)**.

```
Base URL: https://newsapi.org/v2

GET /top-headlines?country=us&apiKey=KEY          → Top stories
GET /top-headlines?category=technology&apiKey=KEY  → By category
GET /everything?q=search+term&apiKey=KEY           → Search articles
GET /top-headlines?page=2&apiKey=KEY               → Pagination
```

API key is stored in `.env` as `VITE_NEWS_API_KEY` — never hardcoded.

---

## 🧠 State Management — Context API

All global state lives in `NewsContext.jsx`:

| State | Description |
|---|---|
| `articles` | Current list of news articles |
| `loading` | Boolean — show/hide Loader |
| `category` | Currently selected topic |
| `query` | Search input value |
| `page` | Current pagination page |
| `totalResults` | Total articles for pagination math |

---

## 📱 Responsive Design

| Screen | Layout |
|---|---|
| Mobile (< 640px) | Stacked cards, hamburger nav |
| Tablet (640–1024px) | 2-column article grid |
| Desktop (> 1024px) | 3-column grid, full nav bar |

---

## 🗺️ Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Top stories feed |
| `/category/:name` | `CategoryPage` | Articles by topic |
| `/search` | `SearchResults` | Search query results |

---



## 🤝 Contributing

Pull requests are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add: your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📬 Contact

**Bijay Vikram**
📧 [vikrambijay005@email.com](mailto:vikrambijay005@email.com)
🐙 [github.com/vikramBijay](https://github.com/vikramBijay)
💼 [linkedin.com/in/bijayvikram](https://linkedin.com/in/bijayvikram)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by Bijay Vikram</p>
