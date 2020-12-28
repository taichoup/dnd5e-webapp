import React from "react";
import { useEffect } from "react";
import { _Store } from "../Store";
import StoreContext from "../StoreContext";
import { JsonToTable } from "./JsonToTable";
import { Loader } from "./Loader";

export const Popup = () => {
  useEffect(() => {
    const statePath = _Store.getState().path;
    async function fetchData() {
      try {
        const res = await(fetch(statePath));
        const res_json = await res.json();
        _Store.dispatch({ type: "GETDATA_POPUP", payload: res_json });
      } catch (error) {
        console.log(error.message);
      }

      }
    fetchData();
  }, []);

  // close popup by pressing Esc.
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closePopup();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  function closePopup() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("query-field").focus();
    document.getElementById("query-field").select();
    _Store.dispatch({ type: "CLICK", payload: "" });
  }

  function formatResults(results) {
    const filteredResults = Object.keys(results)
      .filter(
        (k) => k !== "_id" && k !== "index" && k !== "name" && k !== "url"
      )
      .reduce((obj, key) => {
        obj[key] = results[key];
        return obj;
      }, {});

    return (
      <div>
        <h2>{results.name}</h2>
        <JsonToTable json={filteredResults} />
      </div>
    );
  }

  return (
    <StoreContext.Consumer>
      {(store) => (
        <div className="modal" id="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => closePopup()}>
              ⨉
            </button>
            {_Store.getState().popupdata
              ? formatResults(_Store.getState().popupdata)
              : <Loader/>}
          </div>
        </div>
      )}
    </StoreContext.Consumer>
  );
};
