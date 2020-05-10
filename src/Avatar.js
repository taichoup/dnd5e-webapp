import React from "react";
import Draggable from "react-draggable";

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
