import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies, getMovie } from "../services/api";
import Filters from "../components/Filters";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    country: "",
    language: "",
  });
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [homeTitle, setHomeTitle] = useState("Trending Movies");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await getPopularMovies(pageNum);

      const moviesWithDetails = await Promise.all(
        response.results.map(async (movie) => {
          const details = await getMovie(movie.id);
          return {
            ...movie,
            original_language: details.original_language,
            origin_country: details.origin_country || [],
          };
        })
      );

      setMovies(moviesWithDetails);
      setTotalPages(response.total_pages);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch movies.", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const response = await searchMovies(searchQuery, page);
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setError(null);
    } catch (err) {
      console.error("Failed to search movies.", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    // Genre filter
    if (filters.genre && !movie.genre_ids?.includes(Number(filters.genre)))
      return false;
    // Language filter
    if (filters.language && movie.original_language !== filters.language)
      return false;
    // Country filter (origin_country is an array)
    if (
      filters.country &&
      !(movie.origin_country || []).includes(filters.country)
    )
      return false;
    // Year filter (release_date is "YYYY-MM-DD")
    if (
      filters.year &&
      (!movie.release_date || !movie.release_date.startsWith(filters.year))
    )
      return false;
    return true;
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setHomeTitle("Search Results");
    try {
      setPage(1);
      const response = await searchMovies(searchQuery, page);
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = (e) => {
    setSearchQuery("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchMovies(page);
    } else {
      fetchSearch(page);
    }
  }, [page]);

  useEffect(() => {
    if (!searchQuery) {
      setHomeTitle("Trending Movies");
      fetchMovies(page);
    }
  }, [searchQuery]);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
        <button
          type="button"
          className="clear-filters-button"
          onClick={clearSearch}
        >
          Clear
        </button>
      </form>

      <Filters filters={filters} onFilterChange={setFilters} />

      <div className="home-title">
        <h1>{homeTitle}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      <div
        style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
      >
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
