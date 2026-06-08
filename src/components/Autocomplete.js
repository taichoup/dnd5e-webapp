import React, { useState } from "react";
import PropTypes from "prop-types";

const Autocomplete = ({ suggestions = [], onBlur }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  function onChange(e) {
    const input = e.currentTarget.value;
    const filtered = suggestions.filter(
      (s) => s.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActiveSuggestion(0);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setUserInput(input);
  }

  function onClick(e) {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  }

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) return;
      setActiveSuggestion(activeSuggestion + 1);
    }
  }

  const suggestionsListComponent =
    showSuggestions && userInput && filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li
            key={suggestion}
            className={index === activeSuggestion ? "suggestion-active" : undefined}
            onClick={onClick}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <div className="holder">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        id="creature"
        placeholder="Name"
        name="creature_name"
        autoComplete="off"
        autoFocus
        onBlur={onBlur}
      />
      {suggestionsListComponent}
    </div>
  );
};

Autocomplete.propTypes = {
  suggestions: PropTypes.instanceOf(Array),
};

export default Autocomplete;
