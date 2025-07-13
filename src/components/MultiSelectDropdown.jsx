import { useState, useRef, useEffect } from "react";

function MultiSelectDropdown({
  options,
  field,
  selectedValues,
  onChange,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const selectedLabels =
    options
      .filter((o) => selectedValues.includes(o.value))
      .map((o) => o.label)
      .join(", ") ||
    (field === "genres" ? "Select genres" : "Select countries");

  return (
    <div
      className={`multi-select-dropdown ${disabled ? "disabled" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
      >
        {selectedLabels}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map(({ value, label }) => (
            <label key={value} className="dropdown-option">
              <input
                type="checkbox"
                checked={selectedValues.includes(value)}
                onChange={() => toggleOption(value)}
                disabled={disabled}
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
