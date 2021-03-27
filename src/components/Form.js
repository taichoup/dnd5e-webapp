import React, { useEffect } from "react";
import StoreContext from "../StoreContext";
import { _Store } from "../Store";
import axios from "axios";
import Fuse from "fuse.js";
import { Popup } from "./Popup";

// UTILS ----------------------------------------------------------------

function handleUserInput(event) {
  _Store.dispatch({ type: "QUERY", payload: event.target.value });
}

const options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: ["entries"],
};

function showPopup(path) {
  _Store.dispatch({ type: "CLICK", payload: path });
  return <Popup />;
}

function generatePath(section, name) {
  section = section
    .toLowerCase()
    .replace(/'s/g, "s")
    .replace(/ /g, "-")
    .replace(/:/g, "");
  name = name
    .toLowerCase()
    .replace(/'s/g, "s")
    .replace(/ /g, "-")
    .replace(/:/g, "")
    .replace(/[()]/g, "")
    .replace(/,/g, "")
    .replace(/\//g, "-");
  return `https://www.dnd5eapi.co/api/${section}/${name}`;
}

export const Form = () => {
  // DATA FETCH --(after render)------------------------------------------

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/data2.json`);
      const db_light = response.data
        .map((o) => {
          return {
            section: o.section,
            entries: o.results.map((o) => o.result.name),
          };
        })
        .filter((e) => e != null)
        .filter(
          (e) =>
            e.section !== "spellcasting" && e.section !== "starting-equipment"
        );
      _Store.dispatch({ type: "GETDATA_DB", payload: db_light });
    })();
    return () => {}; // abort function (does nothing, can theoretically be removed)
  }, []);

  // SEARCH -------------------------------------------------------------

  const fuse = new Fuse(_Store.getState().db, options);
  const _db = _Store.getState().db;
  const q = _Store.getState().query;
  const fuseResults = _db ? fuse.search(q) : [];

  //   _db ? console.log("Fuse results: ", fuseResults) : console.log("");

  // RENDER -------------------------------------------------------------

  return (
    <StoreContext.Consumer>
      {(store) => (
        <form className="form">
          <input
            type="text"
            id="query-field"
            placeholder="Type your query here..."
            onChange={handleUserInput}
            value={_Store.getState().query}
            autoFocus
          />

          <div className="flex-container results">
            {fuseResults.map((o, idx) => (
              <pre key={idx}>
                <p>{o.section.toUpperCase()}</p>
                <ul>
                  {o.entries
                    .filter(
                      (e) => e.toLowerCase().indexOf(q.toLowerCase()) > -1
                    )
                    .map((e, idx) => (
                      <li key={idx}>
                        <a
                          href="/#"
                          onClick={() => showPopup(generatePath(o.section, e))}
                        >
                          {e}
                        </a>
                      </li>
                    ))}
                </ul>
              </pre>
            ))}
            {_Store.getState().click && <Popup />}
          </div>
        </form>
      )}
    </StoreContext.Consumer>
  );
};
