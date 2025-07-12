import React, { useState } from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/MovieCard";
import MovieView from "../components/MovieView";

function Favourites() {
  const { favourites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      {favourites.length > 0 ? (
        <div className="favorites">
          <h2 className="favorites-title">Your Favourites</h2>
          <div className="movies-grid">
            {favourites.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>

          {selectedMovie && (
            <MovieView
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </div>
      ) : (
        <div className="favorites-empty">
          <h2>No favourites movies yet</h2>
          <p>
            Start adding movies to your favourites and they will appear here
          </p>
        </div>
      )}
    </>
  );
}

export default Favourites;
