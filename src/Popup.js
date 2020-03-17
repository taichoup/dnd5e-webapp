import React from "react";
import { useEffect } from "react";
import { _Store } from "./Store";
import StoreContext from "./StoreContext";
import { JsonToTable } from "react-json-to-table";

export const Popup = () => {
  useEffect(() => {
    const statePath = _Store.getState().path;
    async function fetchData() {
      const res = await fetch(statePath); // For the hook to work we need to wrap the fetch in an async...await thing.
      res
        .json()
        .then(res => _Store.dispatch({ type: "GETDATA_POPUP", payload: res }))
        .catch(error => console.log(error.message));
    }
    fetchData();
  }, []);

  function closePopup() {
    document.getElementById("modal").style.display = "none";
    _Store.dispatch({ type: "CLICK", payload: "" });
  }

  function formatResults(results) {
    // return (
    //   <table>
    //     <tbody>
    //       {Object.keys(results)
    //         .map(k => (
    //           <tr>
    //             <td>{typeof k === "object" ? Object.keys(k) : k}</td>
    //             <td>{results[k]}</td>
    //           </tr>
    //         ))
    //         .filter(k => k !== "index")}
    //     </tbody>
    //   </table>
    // );
    return <JsonToTable json={results} />;
  }

  return (
    <StoreContext.Consumer>
      {store => (
        <div className="modal" id="modal">
          <div className="modal-content">
            {_Store.getState().popupdata
              ? formatResults(_Store.getState().popupdata)
              : "No data yet."}
            <button className="close-button" onClick={() => closePopup()}>
              &times;
            </button>
          </div>
        </div>
      )}
    </StoreContext.Consumer>
  );
};
