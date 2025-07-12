import { useEffect, useState } from "react";
import { getMovieGenres, getCountries, getLanguages } from "../services/api";
import MultiSelectDropdown from "./MultiSelectDropdown";
import CustomDropdown from "./CustomDropdown";
import "../css/Filters.css";

function Filters({ filters: externalFilters, onFilterChange, disabled }) {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);

  const [localFilters, setLocalFilters] = useState(externalFilters);

  useEffect(() => {
    getMovieGenres().then((res) => setGenres(res.genres || []));
    getLanguages().then((res) => setLanguages(res || []));
    getCountries().then((res) => setCountries(res || []));
  }, []);

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

  const languageOptions = languages.map((l) => ({
    value: l.iso_639_1,
    label: l.english_name,
  }));

  const countryOptions = countries.map((c) => ({
    value: c.iso_3166_1,
    label: c.english_name,
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

      <CustomDropdown
        options={[{ value: "", label: "All Languages" }, ...languageOptions]}
        value={localFilters.language}
        onChange={(value) =>
          setLocalFilters({ ...localFilters, language: value })
        }
        placeholder="Select Language"
        disabled={disabled}
      />

      <CustomDropdown
        options={[{ value: "", label: "All Countries" }, ...countryOptions]}
        value={localFilters.country}
        onChange={(value) =>
          setLocalFilters({ ...localFilters, country: value })
        }
        placeholder="Select Country"
        disabled={disabled}
      />

      <input
        type="number"
        placeholder="Year"
        value={localFilters.year}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, year: e.target.value })
        }
        min="1900"
        max={new Date().getFullYear()}
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
