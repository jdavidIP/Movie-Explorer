import React from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();

  return (
    <>
      {favourites.length > 0 ? (
        <div className="favourites">
          <h2>Your Favourites</h2>
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="favourites-empty">
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
