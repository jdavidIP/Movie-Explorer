# 🎬 Movie Explorer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue)](https://movie-explorer-lac-xi.vercel.app)

This is a modern React application that lets you discover, search, filter, and browse movies using the [TMDB API](https://www.themoviedb.org/)

---

## 🚀 Live Demo

Try the app live here: [https://movie-explorer-lac-xi.vercel.app](https://movie-explorer-lac-xi.vercel.app)

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
/src
  ├── assets               # Static assets (images, icons, etc.)
  ├── components           # Reusable UI components
  │   ├── CustomDropdown.jsx
  │   ├── Filters.jsx
  │   ├── MovieCard.jsx
  │   └── MovieView.jsx
  │   ├── MultiSelectDropdown.jsx
  │   └── NavBar.jsx
  ├── contexts             # React Context for global state
  │   └── MovieContexts.jsx
  ├── css                  # All CSS modules or stylesheets
  │   ├── App.css
  │   ├── Favorites.css
  │   ├── Filters.css
  │   ├── Home.css
  │   ├── Index.css
  │   ├── MovieCard.css
  │   ├── MovieView.css
  │   └── NavBar.css
  ├── pages                # Route-level pages
  │   ├── Favourites.jsx
  │   └── Home.jsx
  ├── services             # API calls and external services
  │   └── api.js
  ├── App.jsx              # Main App shell
  └── main.jsx             # Entry point
```

---

## ⚙️ Local Development

1️⃣ **Clone the repository**
```bash
git clone https://github.com/jdavidIP/movie-explorer.git
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

## 🚀 Deployment

This project is deployed on Vercel.
No server is needed — API requests hit TMDB directly.

---

## 🙌 Acknowledgements
- Powered by the TMDB API.
- Built with React and Vite.

---

## 🧑‍💻 Author

**Jose Ibanez**

[My GitHub](https://github.com/jdavidIP)

[My LinkedIn](https://www.linkedin.com/in/jose-ibanez-polo-622314253/)
