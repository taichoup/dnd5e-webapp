import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "QUERY":
      return { ...state, query: payload };
    case "GETDATA_DB":
      return { ...state, db: payload };
    case "GETDATA_POPUP":
      return { ...state, popupdata: payload };
    case "CLICK":
      return { ...state, click: !state.click, path: payload };
    case "BATTLE":
      return {
        ...state,
        battle: state.battle.concat(payload.map((c) => ({ ...c, id: uuidv4() }))),
      };
    case "RESET_BATTLE":
      return { ...state, battle: [] };
    default:
      return state;
  }
};

// Instanciates a store with our reducer, an initial state, and a function to execute
// on any state change
export const _Store = createStore(reducer, {
  query: "",
  db: null,
  popupdata: null,
  click: false,
  path: "",
  battle: [],
});
