import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { Popup } from "./Popup";

const fuseOptions = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: ["entries"],
};

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
  const dispatch = useDispatch();
  const db = useSelector((state) => state.db);
  const query = useSelector((state) => state.query);
  const click = useSelector((state) => state.click);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/data2.json`);
      const data = await response.json();
      const db_light = data
        .map((o) => ({
          section: o.section,
          entries: o.results.map((o) => o.result.name),
        }))
        .filter((e) => e != null)
        .filter(
          (e) =>
            e.section !== "spellcasting" && e.section !== "starting-equipment"
        );
      dispatch({ type: "GETDATA_DB", payload: db_light });
    })();
  }, [dispatch]);

  const fuse = useMemo(() => (db ? new Fuse(db, fuseOptions) : null), [db]);
  const fuseResults = fuse && query ? fuse.search(query) : [];

  function handleUserInput(event) {
    dispatch({ type: "QUERY", payload: event.target.value });
  }

  function showPopup(path) {
    dispatch({ type: "CLICK", payload: path });
  }

  return (
    <form className="form">
      <input
        type="text"
        id="query-field"
        placeholder="Type your query here..."
        onChange={handleUserInput}
        value={query}
        autoFocus
      />
      <div className="flex-container results">
        {fuseResults.map((o, idx) => (
          <pre key={idx}>
            <p>{o.section.toUpperCase()}</p>
            <ul>
              {o.entries
                .filter((e) => e.toLowerCase().indexOf(query.toLowerCase()) > -1)
                .map((e, idx) => (
                  <li key={idx}>
                    <a href="/#" onClick={() => showPopup(generatePath(o.section, e))}>
                      {e}
                    </a>
                  </li>
                ))}
            </ul>
          </pre>
        ))}
        {click && <Popup />}
      </div>
    </form>
  );
};
