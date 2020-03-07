import React from 'react';
import StoreContext from './StoreContext';
import { _Store } from './Store';
import axios from 'axios';
import Fuse from 'fuse.js';


function handleUserInput(event) {
    _Store.dispatch({ type: "QUERY", payload: event.target.value })
}

const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: ["entries"]
};


// COMMENTS FROM THE REACT TRAINER:
// no need to have the db in the state (heavy) --> service worker?
// debounce ? (not on every hit)
// search button ? 
// service worker (separate thread)

export const Form = () => {

    React.useEffect(() => {
        (async () => {
            const response = await axios.get(
                `/data2.json`
            );
            _Store.dispatch({ type: "GETDATA_DB", payload: response.data });
            const db_light = response.data.map(o => { return { section: o.section, entries: o.results.map(o => o.result.name) } }).filter(e => e != null).filter(e => e.section !== "spellcasting" && e.section !== "starting-equipment");
            _Store.dispatch({ type: "GETDATA_DB", payload: db_light });
        })();
        return () => {
        };
    }, []);

    const fuse = new Fuse(_Store.getState().db, options);

    const _db = _Store.getState().db;

    const q = _Store.getState().query;

    const fuseResults = _db ? fuse.search(q) : [];

    _db ? console.log("Fuse results: ", fuseResults) : console.log("");

    const generatePath = (section, name) => {
        section = section.toLowerCase().replace(/'s/g, "s").replace(/ /g, "-").replace(/:/g, "");
        name = name.toLowerCase().replace(/'s/g, "s").replace(/ /g, "-").replace(/:/g, "");
        return `http://www.dnd5eapi.co/api/${section}/${name}`;
    }

    return (
        <StoreContext.Consumer>
            {store =>
                <form className="form">
                    <input
                        type="text"
                        className="input"
                        id="query-field"
                        placeholder="Type your query here..."
                        onChange={handleUserInput}
                        value={_Store.getState().query}
                        autofocus="true"
                    />

                    <div className="flex-container results">
                        {
                            fuseResults.map(o => <pre>
                                <p>{o.section.toUpperCase()}</p>
                                <ul>{o.entries.filter(e => e.toLowerCase().indexOf(q.toLowerCase()) > -1).map(e => <li><a href={generatePath(o.section, e)}>{e}</a></li>)}</ul>
                            </pre>
                            )
                        }
                    </div>
                </form>
            }
        </StoreContext.Consumer >
    )
}