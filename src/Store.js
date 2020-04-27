// Creates the store, a dispatch function to execute the events, and exposes a store getter.
import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";

// This is where the state modification happens, called by the dispatch function
const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === "QUERY") {
    state.query = payload;
  } else if (type === "GETDATA_DB") {
    state.db = payload;
  } else if (type === "GETDATA_POPUP") {
    state.popupdata = payload;
  } else if (type === "CLICK") {
    state.click = !state.click;
    state.path = payload;
  } else if (type === "BATTLE") {
    payload.id = uuidv4();
    state.battle.push(payload);
    console.log(state.battle);
  }
  return state;
};

// Instanciates a store with our reducer, an initial state, and a function to execute
// on any state change
export const _Store = createStore(reducer, {
  query: "",
  popupdata: null,
  click: false,
  path: "",
  battle: [],
});
