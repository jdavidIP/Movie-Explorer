import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";
import { getMovie } from "../services/api";
import "../css/MovieView.css";

function MovieView() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const response = await getMovie(id);
      setMovie(response);
    } catch (err) {
      console.error("Failed to get movie.", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) return <div>No movie found.</div>;

  return (
    <div className="movie-view">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movie-poster">
            <MovieCard movie={movie}></MovieCard>
          </div>
          <div className="movie-info">
            <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>
              {movie.title}
            </h2>
            {movie.original_title !== movie.title && (
              <p>
                <strong>Original Title:</strong> {movie.original_title}
              </p>
            )}
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Original Language:</strong>{" "}
              {movie.original_language?.toUpperCase()}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10 (
              {movie.vote_count} votes)
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres && movie.genres.length
                ? movie.genres.map((g) => g.name).join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Overview:</strong>{" "}
              {movie.overview || "No synopsis available."}
            </p>
            {movie.homepage && (
              <p>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#e50914", textDecoration: "underline" }}
                >
                  Official Website
                </a>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieView;
