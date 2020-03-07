import React from 'react';
import StoreContext from './StoreContext';
import { _Store } from './Store';
import axios from 'axios';
import Fuse from 'fuse.js';


// const loadData = () => import('./components/data2.json');

// loadData()
//     .then(
//         (data) => {
//             console.log("HELLO", data);
//         }
//     );


function handleUserInput(event) {
    _Store.dispatch({ type: "QUERY", payload: event.target.value })
}

const options = { // TODO: add ids
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: [
        "results.name",
        "results.result.full_name",
        "results.result.desc"
    ]
};

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
            console.log("AXIOS: %o", response);
            _Store.dispatch({ type: "GETDATA_DB", payload: response.data });
        })();
        return () => {
        };
    }, []);

    const fuse = new Fuse(_Store.getState().db, options);

    const _db = _Store.getState().db;

    const fuseResults = _db ? fuse.search(_Store.getState().query) : [];

    _db ? console.log("Fuse results: ", fuseResults) : console.log("");

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
                        {fuseResults ? fuseResults.map(o => <pre>{o.toString()}</pre>) : []}
                    </div>
                </form>
            }
        </StoreContext.Consumer>
    )
}