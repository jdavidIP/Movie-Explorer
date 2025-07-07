import { useEffect, useState } from "react";
import { getMovieGenres, getCountries, getLanguages } from "../services/api";
import "../css/Filters.css";

function Filters({ filters, onFilterChange, disabled }) {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getMovieGenres().then((res) => setGenres(res.genres || []));
    getLanguages().then((res) => setLanguages(res || []));
    getCountries().then((res) => setCountries(res || []));
  }, []);

  return (
    <div className={`filter-section ${disabled ? "disabled" : ""}`}>
      <select
        value={filters.genre}
        onChange={(e) => onFilterChange({ ...filters, genre: e.target.value })}
        disabled={disabled}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        value={filters.language}
        onChange={(e) =>
          onFilterChange({ ...filters, language: e.target.value })
        }
        disabled={disabled}
      >
        <option value="">All Languages</option>
        {languages.map((l) => (
          <option key={l.iso_639_1} value={l.iso_639_1}>
            {l.english_name}
          </option>
        ))}
      </select>

      <select
        value={filters.country}
        onChange={(e) =>
          onFilterChange({ ...filters, country: e.target.value })
        }
        disabled={disabled}
      >
        <option value="">All Countries</option>
        {countries.map((c) => (
          <option key={c.iso_3166_1} value={c.iso_3166_1}>
            {c.english_name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Year"
        value={filters.year}
        onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
        min="1900"
        max={new Date().getFullYear()}
        style={{ width: "90px" }}
        disabled={disabled}
      />
    </div>
  );
}

export default Filters;
