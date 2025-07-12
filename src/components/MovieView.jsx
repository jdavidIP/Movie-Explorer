import { useEffect, useState } from "react";
import { getMovie } from "../services/api";
import "../css/MovieView.css";
import MovieCard from "./MovieCard";

function MovieView({ movie, onClose }) {
  const [fullMovie, setFullMovie] = useState(movie); // start with partial data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const response = await getMovie(movie.id); // fetch full details
      setFullMovie(response);
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
    <div
      className="modal-overlay"
      onClick={onClose} // close modal when clicking outside
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieView;
