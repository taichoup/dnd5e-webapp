import React from "react";
import { useEffect, useState } from "react";
import { _Store } from "../Store";
import StoreContext from "../StoreContext";
import { JsonToTable } from "./JsonToTable";
import { CustomView } from "./CustomView";
import ReactJson from 'react-json-view';
import { Loader } from "./Loader";
import { removeUselessProperties, removeNullishValues } from "../utils/apiFormatter";

export const Popup = () => {
  useEffect(() => {
    const statePath = _Store.getState().path;
    async function fetchData() {
      try {
        const res = await(fetch(statePath));
        const res_json = await res.json();
        // console.log("res_json: ", res_json);
        removeUselessProperties(res_json, "url");
        removeUselessProperties(res_json, "index");
        removeNullishValues(res_json);
        // console.log("cleaned", res_json);
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

  const [toggleView, setToggleView] = useState("table");

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

  function renderSwitch(param) {
    switch(param) {
      case 'table':
        return <JsonToTable json={filteredResults} />
      case 'json':
        return (
          <ReactJson
            src={filteredResults}
            theme="solarized"
            name="rule"
            iconStyle="circle"
            collapsed={1}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            style={{ padding: "1em" }}
          />
        )
      case 'custom':
        return <CustomView json={filteredResults} />
      default:
        return "Rien"
    }
  }

    return (
      <div>
        <h2>{results.name}</h2>
        <button
          type="button" 
          disabled={toggleView === "table" ? true : false}
          onClick={() => setToggleView("table")}
        >
          Table view
        </button>
        <button
          type="button"
          disabled={toggleView === "json" ? true : false}
          onClick={() => setToggleView("json")}
        >
          JSON view
        </button>
        <button
          type="button"
          disabled={toggleView === "custom" ? true : false}
          onClick={() => setToggleView("custom")}
        >
          Custom view
        </button>
        
        {renderSwitch(toggleView)}
        
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
