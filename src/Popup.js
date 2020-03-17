import React from "react";
import { useEffect } from "react";
import { _Store } from "./Store";
import StoreContext from "./StoreContext";

// we need to pass the desired path as prop
export const Popup = () => {
  // export const Popup = (props) => {

  // useEffect(() => {
  //     console.log("We are in the effect now");
  //     console.log("Props.path is %s", props.path)
  //     async function fetchData() {
  //         console.log("Fetching from %s...", props.path);
  //         const res = await fetch(props.path); // For the hook to work we need to wrap the fetch in an async...await thing.
  //         res
  //             .json()
  //             .then(res => _Store.dispatch({ type: "GETDATA_POPUP", payload: res.data }))
  //             .catch(error => console.log(error.message))
  //     }
  //     fetchData();
  // }, [props.path]);

  function closePopup() {
    document.getElementById("modal").style.display = "none";
    _Store.dispatch({ type: "CLICK", payload: "" });
  }

  return (
    <StoreContext.Consumer>
      {store => (
        <div className="modal" id="modal">
          <div className="modal-content">
            <p>
              {_Store.getState().popupdata
                ? _Store.getState().popupdata.toString()
                : "No data yet."}
            </p>
            {/* <button className="close-button" onClick={props.close}>&times;</button> */}
            <button className="close-button" onClick={() => closePopup()}>
              &times;
            </button>
          </div>
          <p>Hello there!</p>
        </div>
      )}
    </StoreContext.Consumer>
  );
};
