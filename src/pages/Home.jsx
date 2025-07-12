import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css";
import {
  searchMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  discoverMovies,
} from "../services/api";
import Filters from "../components/Filters";
import MovieView from "../components/MovieView";

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
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const [tab, setTab] = useState(1);
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
        let response;
        if (tab === 1) {
          setHomeTitle("Trending Movies");
          response = await getPopularMovies(pageNum);
          setTotalPages(5);
        } else if (tab === 2) {
          setHomeTitle("Top Rated Movies");
          response = await getTopRatedMovies(pageNum);
          setTotalPages(5);
        } else if (tab === 3) {
          setHomeTitle("Movies Now Playing");
          response = await getNowPlayingMovies(pageNum);
          setTotalPages(1);
        }
        setMovies(response.results);
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
    setSearching(true);
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
      setSearching(false);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
    setSearching(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleTabChange = (tabValue) => {
    setTab(tabValue);
    setPage(1);
    setFilters({ genre: [], year: "", country: "", language: "" });
    setSort("");
    setSearchQuery("");
  };

  useEffect(() => {
    if (!searchQuery) {
      ((filters.genre && filters.genre.length > 0) ||
        filters.language ||
        filters.country ||
        filters.year) &&
        setHomeTitle("Search Results");
      fetchMovies(page);
    } else {
      setHomeTitle("Search Results");
      fetchSearch(page);
    }
  }, [page, filters, sort, tab]);

  useEffect(() => {
    if (!searchQuery && !searching) {
      fetchMovies(page);
    }
  }, [searchQuery, searching]);

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
          disabled={searching}
        />
      </div>

      <div className="home-title">
        <h1>{homeTitle}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tabs-sort-row">
        {!(
          (filters.genre && filters.genre.length > 0) ||
          filters.language ||
          filters.country ||
          filters.year
        ) &&
          !searching && (
            <div className="tabs">
              <button
                className={`tab-button ${tab === 1 ? "active" : ""} ${
                  searching ? "disabled" : ""
                }`}
                onClick={() => handleTabChange(1)}
                disabled={searching}
              >
                Trending
              </button>
              <button
                className={`tab-button ${tab === 2 ? "active" : ""} ${
                  searching ? "disabled" : ""
                }`}
                onClick={() => handleTabChange(2)}
                disabled={searching}
              >
                Top Rated
              </button>
              <button
                className={`tab-button ${tab === 3 ? "active" : ""} ${
                  searching ? "disabled" : ""
                }`}
                onClick={() => handleTabChange(3)}
                disabled={searching}
              >
                Now Playing
              </button>
            </div>
          )}

        {((filters.genre && filters.genre.length > 0) ||
          filters.language ||
          filters.country ||
          filters.year) &&
          !searching && (
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
                <option value="revenue.asc">Revenue ↑</option>
                <option value="revenue.desc">Revenue ↓</option>
                <option value="primary_release_date.asc">Release Date ↑</option>
                <option value="primary_release_date.desc">
                  Release Date ↓
                </option>
                <option value="vote_average.asc">Rating ↑</option>
                <option value="vote_average.desc">Rating ↓</option>
                <option value="vote_count.asc">Vote Count ↑</option>
                <option value="vote_count.desc">Vote Count ↓</option>
              </select>
            </div>
          )}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              onSelect={setSelectedMovie}
            />
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

      {selectedMovie && (
        <MovieView
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Home;
