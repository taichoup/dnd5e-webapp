import React, { useRef } from "react";
import { _Store } from "../Store";
import { Avatar } from "./Avatar";
import CanvasDraw from "react-canvas-draw";

export const Battleground = () => {

    const canvas = useRef(null);

    /*
 * Generate the label for the little avatars on the battleground
 * @param {string} avatarName - either free text from user or autocomplete result
 */
    function generateAvatarName(avatarName) {
        const avatarArray = avatarName.trim().split(" ");
        if (avatarArray.length > 1) {
            return avatarArray.map((elt) => elt[0]).join("");
        }
        return avatarName.slice(0, 2);
    }

    /*
     * Clear the initiative table
     * NB: Since the creature name field is a controlled component with a separate state, it's not possible to clear its value
     * TO DO: figure out how to either share the state or propagate the clear event
     */
    function resetBattle() {
        _Store.dispatch({ type: "RESET_BATTLE" });
        document.getElementById("creature").select();
    }

    function resetCanvas() {
        canvas.current.clear();
    }

    function undoCanvas() {
        canvas.current.undo();
    }

    return (
        <div>
            <div id="battleground">
                <div id="creature-layer">
                    {_Store.getState().battle.map((item) => (
                        <Avatar
                            key={item.creature_name}
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
                <button
                    type="reset"
                    className="pure-button"
                    onClick={resetBattle}
                >
                    Reset battle
          </button>
                <button
                    type="button"
                    className="pure-button"
                    onClick={undoCanvas}
                >
                    Undo brush stroke
          </button>
                <button
                    type="reset"
                    className="pure-button"
                    onClick={resetCanvas}
                >
                    Reset drawing
          </button>
            </div>
        </div>
    );
};