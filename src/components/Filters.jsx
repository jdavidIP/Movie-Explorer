import { useEffect, useState } from "react";
import { getMovieGenres, getCountries, getLanguages } from "../services/api";
import MultiSelectDropdown from "./MultiSelectDropdown";
import "../css/Filters.css";
import CustomDropdown from "./CustomDropdown";

function Filters({ filters: externalFilters, onFilterChange, disabled }) {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);

  const [localFilters, setLocalFilters] = useState(externalFilters);

  useEffect(() => {
    getMovieGenres().then((res) => setGenres(res.genres || []));
    getLanguages().then((res) => setLanguages(res || []));
    getCountries().then((res) => setCountries(res || []));
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let y = currentYear; y >= 1816; y--) {
      yearOptions.push({ value: String(y), label: String(y) });
    }
    setYears(yearOptions);
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

  const handleRemoveFilter = (type, value) => {
    const updatedFilters = { ...localFilters };
    if (type === "genre") {
      updatedFilters.genre = updatedFilters.genre.filter((v) => v !== value);
    } else {
      updatedFilters[type] = "";
    }
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
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

  const getLabel = (type, value) => {
    if (type === "genre") {
      return genres.find((g) => String(g.id) === value)?.name || value;
    }
    if (type === "language") {
      return (
        languages.find((l) => l.iso_639_1 === value)?.english_name || value
      );
    }
    if (type === "country") {
      return (
        countries.find((c) => c.iso_3166_1 === value)?.english_name || value
      );
    }
    if (type === "year") {
      return value;
    }
    return value;
  };

  return (
    <div className={`filter-section-wrapper ${disabled ? "disabled" : ""}`}>
      <div className="filter-section">
        <MultiSelectDropdown
          options={genreOptions}
          field="genres"
          selectedValues={localFilters.genre || []}
          onChange={(newSelected) =>
            setLocalFilters({ ...localFilters, genre: newSelected })
          }
          disabled={disabled}
        />

        <MultiSelectDropdown
          options={countries.map((c) => ({
            value: c.iso_3166_1,
            label: c.english_name,
          }))}
          field="countries"
          selectedValues={localFilters.country || []}
          onChange={(newSelected) =>
            setLocalFilters({
              ...localFilters,
              country: newSelected,
            })
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
          options={[{ value: "", label: "Any Year" }, ...years]}
          value={localFilters.year}
          onChange={(value) =>
            setLocalFilters({ ...localFilters, year: value })
          }
          placeholder="Select a Year"
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

      {/* Active Filter Chips */}
      <div className="active-filters">
        {["genre", "language", "country", "year"].map((key) => {
          const filterValue = localFilters[key];

          if (Array.isArray(filterValue)) {
            // For multi-select filters like country
            return filterValue.map((val) => (
              <div key={`${key}-${val}`} className="filter-chip">
                {getLabel(key, val)}
                <span
                  className="remove-chip"
                  onClick={() => handleRemoveFilter(key, val)}
                >
                  ×
                </span>
              </div>
            ));
          } else if (filterValue) {
            return (
              <div key={key} className="filter-chip">
                {getLabel(key, filterValue)}
                <span
                  className="remove-chip"
                  onClick={() => handleRemoveFilter(key, filterValue)}
                >
                  ×
                </span>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default Filters;
