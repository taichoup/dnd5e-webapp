import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
// import StoreContext from "./StoreContext";
// import { _Store } from "./Store";

export const Avatar = (props) => {
  return (
    // <Draggable grid={[25, 25]}>
    <Draggable>
      <div>
        <div
          className={
            props.team === "Blue" ? "avatar avatar-blue" : "avatar avatar-red"
          }
        >
          <div className="avatar-label">{props.name}</div>
        </div>
      </div>
    </Draggable>
  );
};
