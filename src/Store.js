// Creates the store, a dispatch function to execute the events, and exposes a store getter.
import { createStore } from "redux";


// This is where the state modification happens, called by the dispatch function
const reducer = (state, action) => {
    const { type, payload } = action;
    if (type === "NAVIGATE") {
        state.section = payload;
        return state;
    } else if (type === "GETDATA") {
        state.data = payload;
        return state;
    }
    return state;
};

// Instanciates a store with our reducer, an initial state, and a function to execute 
// on any state change
export const _Store = createStore(reducer, { section: "races", data: null });