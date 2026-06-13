import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "./Avatar";
import CanvasDraw from "react-canvas-draw";
import type { AppAction, AppState } from "../types";
import type { Dispatch } from "redux";

function generateAvatarName(avatarName: string): string {
  const avatarArray = avatarName.trim().split(" ");
  if (avatarArray.length > 1) {
    return avatarArray.map((elt) => elt[0]).join("");
  }
  return avatarName.slice(0, 2);
}

export const Battleground = () => {
  const dispatch = useDispatch<Dispatch<AppAction>>();
  const battle = useSelector((state: AppState) => state.battle);
  const canvas = useRef<CanvasDraw | null>(null);

  function resetBattle() {
    dispatch({ type: "RESET_BATTLE" });
    (document.getElementById("creature") as HTMLInputElement | null)?.select();
  }

  function resetCanvas() {
    canvas.current?.clear();
  }

  function undoCanvas() {
    canvas.current?.undo();
  }

  return (
    <div>
      <div id="battleground">
        <div id="creature-layer">
          {battle.map((item) => (
            <Avatar
              key={item.id}
              name={generateAvatarName(item.creature_name)}
              team={item.team}
              firstName={item.creature_birthName}
            />
          ))}
        </div>
        <CanvasDraw
          brushRadius={3}
          hideGrid={true}
          backgroundColor="rgba(0,0,0,0)"
          canvasWidth="100%"
          canvasHeight="100%"
          lazyRadius={0}
          ref={canvas}
        />
      </div>
      <div className="battle-reset">
        <button type="reset" className="pure-button" onClick={resetBattle}>
          Reset battle
        </button>
        <button type="button" className="pure-button" onClick={undoCanvas}>
          Undo brush stroke
        </button>
        <button type="reset" className="pure-button" onClick={resetCanvas}>
          Reset drawing
        </button>
      </div>
    </div>
  );
};
