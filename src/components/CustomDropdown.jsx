import { useState, useRef, useEffect } from "react";

function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select",
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div
      className={`custom-select ${disabled ? "disabled" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
      >
        {selectedLabel}
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map(({ value: val, label }) => (
            <div
              key={val}
              className="dropdown-option"
              onClick={() => {
                onChange(val);
                setOpen(false);
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
