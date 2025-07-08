import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css";
import {
  searchMovies,
  getPopularMovies,
  discoverMovies,
} from "../services/api";
import Filters from "../components/Filters";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: [],
    year: "",
    country: "",
    language: "",
  });
  const [sort, setSort] = useState();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [homeTitle, setHomeTitle] = useState("Trending Movies");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      if (
        (filters.genre && filters.genre.length > 0) ||
        filters.language ||
        filters.country ||
        filters.year
      ) {
        const response = await discoverMovies(filters, sort, pageNum);
        setMovies(response.results);
        setTotalPages(response.total_pages);
      } else {
        const response = await getPopularMovies(pageNum);
        setMovies(response.results);
        setTotalPages(response.total_pages);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch movies.", err);
      setError("Failed to fetch movies.");
      setMovies(null);
      setTotalPages(null);
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
      setMovies(null);
      setTotalPages(null);
    } finally {
      setLoading(false);
    }
  };

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
    if (
      !searchQuery &&
      !(
        (filters.genre && filters.genre.length > 0) ||
        filters.language ||
        filters.country ||
        filters.year
      )
    ) {
      setHomeTitle("Trending Movies");
      fetchMovies(page);
    } else {
      setHomeTitle("Search Results");
      fetchSearch(page);
    }
  }, [page, filters, sort]);

  useEffect(() => {
    if (!searchQuery) {
      setHomeTitle("Trending Movies");
      fetchMovies(page);
    }
  }, [searchQuery, page]);

  return (
    <div className="home">
      <div className="search-and-filters">
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

        <Filters
          filters={filters}
          onFilterChange={setFilters}
          disabled={searchQuery}
        />
      </div>

      <div className="home-title">
        <h1>{homeTitle}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="sort-dropdown">
        <select
          value={sort || ""}
          onChange={(e) => setSort(e.target.value)}
          disabled={
            !(
              (filters.genre && filters.genre.length > 0) ||
              filters.language ||
              filters.country ||
              filters.year
            )
          }
        >
          <option value="">Sort by...</option>
          <option value="title.asc">Title A-Z</option>
          <option value="title.desc">Title Z-A</option>
          <option value="popularity.asc">Popularity ↑</option>
          <option value="popularity.desc">Popularity ↓</option>
          <option value="revenue.asc">Revenue ↑</option>
          <option value="revenue.desc">Revenue ↓</option>
          <option value="primary_release_date.asc">Release Date ↑</option>
          <option value="primary_release_date.desc">Release Date ↓</option>
          <option value="vote_average.asc">Rating ↑</option>
          <option value="vote_average.desc">Rating ↓</option>
          <option value="vote_count.asc">Vote Count ↑</option>
          <option value="vote_count.desc">Vote Count ↓</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
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
