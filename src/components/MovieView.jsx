import { useEffect, useState } from "react";
import { getMovie, getPlatforms } from "../services/api"; // added getPlatforms
import "../css/MovieView.css";
import MovieCard from "./MovieCard";

function MovieView({ movie, onClose }) {
  const [fullMovie, setFullMovie] = useState(movie); // start with partial data
  const [platforms, setPlatforms] = useState([]); // NEW: platforms state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const response = await getMovie(movie.id); // fetch full details
      setFullMovie(response);

      // If movie has IMDb ID, fetch platforms
      if (response.imdb_id) {
        try {
          const platformsResponse = await getPlatforms(response.imdb_id);
          setPlatforms(platformsResponse);
        } catch (platformErr) {
          console.error("Failed to fetch platforms.", platformErr);
          setPlatforms([]); // fallback to empty if API fails
        }
      }

      setError(null);
    } catch (err) {
      console.error("Failed to get movie.", err);
      setError("Failed to load movie details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movie.id]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <div className="movie-view">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <div className="movie-poster">
                <MovieCard movie={movie} />
              </div>
              <div className="movie-info">
                <h2>{fullMovie.title}</h2>
                {fullMovie.original_title !== fullMovie.title && (
                  <p>
                    <strong>Original Title:</strong> {fullMovie.original_title}
                  </p>
                )}
                <p>
                  <strong>Release Date:</strong> {fullMovie.release_date}
                </p>
                <p>
                  <strong>Original Language:</strong>{" "}
                  {fullMovie.original_language?.toUpperCase()}
                </p>
                <p>
                  <strong>Runtime:</strong> {fullMovie.runtime} mins
                </p>
                <p>
                  <strong>Rating:</strong> {fullMovie.vote_average?.toFixed(2)}{" "}
                  / 10 ({fullMovie.vote_count} votes)
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {fullMovie.genres?.map((g) => g.name).join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Synopsis:</strong>{" "}
                  {fullMovie.overview || "No synopsis available."}
                </p>
                {fullMovie.homepage && (
                  <p>
                    <a
                      href={fullMovie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Official Website
                    </a>
                  </p>
                )}

                {/* NEW: Where to Watch section */}
                {platforms.length > 0 && (
                  <div className="platforms">
                    <h3>Where to Watch</h3>
                    <div className="platform-list">
                      {platforms.map((p, index) => (
                        <a
                          key={index}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="platform-card"
                        >
                          <img
                            src={p.image}
                            alt={p.platform}
                            className="platform-logo"
                          />
                          <div className="platform-label">{p.label}</div>
                          <div className="platform-name">{p.platform}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieView;
