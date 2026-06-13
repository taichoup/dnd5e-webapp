import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiSummary } from "./AiSummary";
import { JsonExplorer } from "./JsonExplorer";
import { Loader } from "./Loader";
import { removeUselessProperties, removeNullishValues } from "../utils/apiFormatter";
import type { AppAction, AppState, JsonObject } from "../types";
import type { Dispatch } from "redux";

export const Popup = () => {
  const dispatch = useDispatch<Dispatch<AppAction>>();
  const path = useSelector((state: AppState) => state.path);
  const popupdata = useSelector((state: AppState) => state.popupdata);
  const [rawPopupdata, setRawPopupdata] = useState<JsonObject | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(path);
        const res_json = (await res.json()) as JsonObject;
        setRawPopupdata(res_json);
        const formattedData = structuredClone(res_json);
        removeUselessProperties(formattedData, "url");
        removeUselessProperties(formattedData, "index");
        removeNullishValues(formattedData);
        dispatch({ type: "GETDATA_POPUP", payload: formattedData });
      } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
      }
    }
    fetchData();
  }, [path, dispatch]);

  const closePopup = useCallback(() => {
    document.getElementById("modal")?.style.setProperty("display", "none");
    const queryField = document.getElementById("query-field") as HTMLInputElement | null;
    queryField?.focus();
    queryField?.select();
    dispatch({ type: "CLICK", payload: "" });
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePopup]);

  function formatResults(results: JsonObject) {
    const filteredResults = Object.keys(results)
      .filter((k) => k !== "_id" && k !== "index" && k !== "name" && k !== "url")
      .reduce<JsonObject>((obj, key) => {
        obj[key] = results[key];
        return obj;
      }, {});

    return (
      <div>
        <h2>{String(results.name ?? "")}</h2>
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
