import { useEffect, useState } from "react";
import { getMovieGenres, getCountries, getLanguages } from "../services/api";
import MultiSelectDropdown from "./MultiSelectDropdown";
import "../css/Filters.css";

function Filters({ filters: externalFilters, onFilterChange, disabled }) {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);

  // Local internal state to let user change filters before applying
  const [localFilters, setLocalFilters] = useState(externalFilters);

  useEffect(() => {
    getMovieGenres().then((res) => setGenres(res.genres || []));
    getLanguages().then((res) => setLanguages(res || []));
    getCountries().then((res) => setCountries(res || []));
  }, []);

  // When external filters change (e.g. on Clear), sync local state
  useEffect(() => {
    setLocalFilters(externalFilters);
  }, [externalFilters]);

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      genre: [],
      language: "",
      country: "",
      year: "",
    };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  const genreOptions = genres.map((g) => ({
    value: String(g.id),
    label: g.name,
  }));

  return (
    <div className={`filter-section ${disabled ? "disabled" : ""}`}>
      <MultiSelectDropdown
        options={genreOptions}
        selectedValues={localFilters.genre || []}
        onChange={(newSelected) =>
          setLocalFilters({ ...localFilters, genre: newSelected })
        }
        disabled={disabled}
      />

      <select
        value={localFilters.language}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, language: e.target.value })
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
        value={localFilters.country}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, country: e.target.value })
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
        value={localFilters.year}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, year: e.target.value })
        }
        min="1900"
        max={new Date().getFullYear()}
        style={{ width: "90px" }}
        disabled={disabled}
      />

      <div className="filter-buttons">
        <button onClick={handleApply} disabled={disabled}>
          Apply
        </button>
        <button onClick={handleClear} disabled={disabled} type="button">
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
