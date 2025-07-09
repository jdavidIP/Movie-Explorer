# 🎬 Movie Explorer

This is a modern React application that lets you discover, search, filter, and browse movies using the [TMDB API](https://www.themoviedb.org/)

---

## ✨ Features

- 🔍 **Search movies** by title.
- 🎭 **Filter** by genre, language, country, and release year.
- 🔝 **Browse** trending, top-rated, and now-playing tabs.
- ❤️ Mark movies as **favourites** to save them in a special tab.
- 📊 **Sort** by popularity, revenue, rating, vote count, or release date.
- ⏩ **Pagination** to navigate through results.
- ⚡ Built with **React + Vite** for fast, modern development.

---

## 📂 Project Structure

```bash
src/
├─ assets/
├─ components/
│ ├─ Filters.jsx
│ ├─ MovieCard.jsx
│ ├─ MultiSelectDropdown.jsx
│ ├─ NavBar.jsx
├─ contexts/
│ └─ MovieContexts.jsx
├─ css/
│ ├─ App.css
│ ├─ Favorites.css
│ ├─ Home.css
│ ├─ Index.css
│ ├─ MovieCard.css
│ ├─ MovieView.css
│ ├─ NavBar.css
├─ pages/
│ ├─ Favourites.jsx
│ ├─ Home.jsx
│ ├─ MovieView.jsx
├─ services/
│ └─ api.js
├─ App.jsx
└─ main.jsx
```

---

## ⚙️ Local Development

1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Create a .env file**
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4️⃣ **Start the dev server**
```bash
npm run dev
```

Your app should now be running at http://localhost:5173 ✨

---

## 🙌 Acknowledgements
- Powered by the TMDB API.
- Built with React and Vite.
