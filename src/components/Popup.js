import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { JsonToTable } from "./JsonToTable";
import { Loader } from "./Loader";
import { removeUselessProperties, removeNullishValues } from "../utils/apiFormatter";

export const Popup = () => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.path);
  const popupdata = useSelector((state) => state.popupdata);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(path);
        const res_json = await res.json();
        removeUselessProperties(res_json, "url");
        removeUselessProperties(res_json, "index");
        removeNullishValues(res_json);
        dispatch({ type: "GETDATA_POPUP", payload: res_json });
      } catch (error) {
        console.log(error.message);
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
        <JsonToTable json={filteredResults} />
      </div>
    );
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closePopup}>
          ⨉
        </button>
        {popupdata ? formatResults(popupdata) : <Loader />}
      </div>
    </div>
  );
};
