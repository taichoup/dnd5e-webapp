import React, { useState } from "react";
import PropTypes from "prop-types";

export const Autocomplete = (props) => {

  const propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  const defaultProps = {
    suggestions: [],
  };

  const [autcompleteState, setAutocompleteState] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });

  const onChange = (event) => {
    const { suggestions } = props;
    const userInput = event.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > - 1
    );

    setAutocompleteState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value,
    });
  };

  const onClick = (event) => {
    setAutocompleteState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText,
    });
  };

  const onKeyDown = (event) => {
    const { activeSuggestion, filteredSuggestions } = autcompleteState;
  
    // enter key
    if (event.keyCode === 13) {
      // do not submit form when selecting a monster
      event.preventDefault();
      setAutocompleteState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    }

    // up arrow (index--)
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setAutocompleteState({activeSuggestion: activeSuggestion - 1});

    // down arrow (index ++)
    } else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setAutocompleteState({activeSuggestion: activeSuggestion + 1});
    }
  };



  return (

  )

}
