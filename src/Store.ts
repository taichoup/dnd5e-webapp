import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";
import type { AppAction, AppState } from "./types";

export const initialState: AppState = {
  query: "",
  db: null,
  popupdata: null,
  click: false,
  path: "",
  battle: [],
};

export const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case "QUERY":
      return { ...state, query: action.payload };
    case "GETDATA_DB":
      return { ...state, db: action.payload };
    case "GETDATA_POPUP":
      return { ...state, popupdata: action.payload };
    case "CLICK":
      return { ...state, click: !state.click, path: action.payload };
    case "BATTLE":
      return {
        ...state,
        battle: state.battle.concat(action.payload.map((c) => ({ ...c, id: uuidv4() }))),
      };
    case "RESET_BATTLE":
      return { ...state, battle: [] };
    default:
      return state;
  }
};

// Instanciates a store with our reducer, an initial state, and a function to execute
// on any state change
export const _Store = createStore(reducer);
