import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiSummary } from "./AiSummary";
import { JsonExplorer } from "./JsonExplorer";
import { Loader } from "./Loader";
import { removeUselessProperties, removeNullishValues } from "../utils/apiFormatter";

export const Popup = () => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.path);
  const popupdata = useSelector((state) => state.popupdata);
  const [rawPopupdata, setRawPopupdata] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(path);
        const res_json = await res.json();
        setRawPopupdata(res_json);
        const formattedData = structuredClone(res_json);
        removeUselessProperties(formattedData, "url");
        removeUselessProperties(formattedData, "index");
        removeNullishValues(formattedData);
        dispatch({ type: "GETDATA_POPUP", payload: formattedData });
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [path, dispatch]);

  const closePopup = useCallback(() => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("query-field").focus();
    document.getElementById("query-field").select();
    dispatch({ type: "CLICK", payload: "" });
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePopup]);

  function formatResults(results) {
    const filteredResults = Object.keys(results)
      .filter((k) => k !== "_id" && k !== "index" && k !== "name" && k !== "url")
      .reduce((obj, key) => {
        obj[key] = results[key];
        return obj;
      }, {});

    return (
      <div>
        <h2>{results.name}</h2>
        {rawPopupdata && <AiSummary resource={rawPopupdata} />}
        <JsonExplorer json={filteredResults} />
      </div>
    );
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <button type="button" className="close-button" onClick={closePopup}>
          ⨉
        </button>
        {popupdata ? formatResults(popupdata) : <Loader />}
      </div>
    </div>
  );
};
