import React, { useState } from "react";
import StoreContext from "../StoreContext";
import { Battleground } from "./Battleground";
import { _Store } from "../Store";
import Autocomplete from "./Autocomplete";
import NewWindow from 'react-new-window';
import { monstersInitHPDB } from '../assets/monsters';
import { npcNames } from '../assets/npcs';

/*
 * Main event handler for the battle form
 * @param {event object}
 */
function handleUserInput(event) {
  const creature_name = event.target["creature_name"].value;
  const initiative_roll = event.target["initiative_roll"].value;
  const hit_points = event.target["hit_points"].value;
  const team = event.target["team"].value;
  // if no qty is set, qty is 1
  const quantity = Number(event.target["qty"].value) || 1;
  const update = [...Array(quantity)].map((creature, idx) => {
    return {
      creature_name: `${creature_name} ${quantity > 1 ? idx + 1 : ""}`,
      initiative_roll: initiative_roll,
      hit_points: hit_points,
      team: team,
      // select a first name at random from the list of NPC names
      // PCs keep their name
      creature_birthName: team === "Red"
        ? npcNames[Math.floor(Math.random() * npcNames.length)] 
        : creature_name,
    };
  });
  console.log("Update is ", update);
  _Store.dispatch({
    type: "BATTLE",
    payload: update,
  });
  event.preventDefault();
  event.target.reset();
  document.getElementById("creature").focus();
}

/*
 * Sort function for the battle order table
 * @param {int} a
 * @param {int} b
 */
function initiative(a, b) {
  return b.initiative_roll - a.initiative_roll;
}

function matchingCreaturesInDb(creature) {
  return monstersInitHPDB.filter((c) => c.label === creature);
}

function rollInitiative(event) {
  console.log("Rolling initiative...");
  const creature = document.getElementById("creature").value;

  if (matchingCreaturesInDb(creature).length) {
    const dex = matchingCreaturesInDb(creature)[0].dex;
    const modifier = getModifier(dex);
    const roll = Math.floor(Math.random() * 20) + modifier;
    console.log("%s + %s = %s", roll - modifier, modifier, roll);
    document.getElementById("initiative_roll").value = roll;
    return roll;
  }
}

function getModifier(abilityScore) {
  return Math.floor((abilityScore - 10) / 2);
}

function setHP(event) {
  const creature = event.target.value;
  if (matchingCreaturesInDb(creature).length) {
    const hp = matchingCreaturesInDb(creature)[0].hp;
    document.getElementById("hit_points").value = hp;
  }
}

export const Battle = (props) => {

  const [battleDisplay, setBattleDisplay] = useState("inline");

  function handlePopoutSetting(event) {
    if (battleDisplay === "popout") {
      setBattleDisplay("inline");
    } else if (battleDisplay === "inline") {
      setBattleDisplay("popout");
    }
  };

  return (
    <StoreContext.Consumer>
      {(store) => (
        <div>
          <div id="popout-checkbox">
            <input type="checkbox" onChange={handlePopoutSetting} checked={battleDisplay === "popout" ? true : false} value={battleDisplay} id="popout-setting" />
            <label htmlFor="popout-setting">Pop out the battleground</label>
          </div>
          <form
            className="pure-form battle-form"
            onSubmit={handleUserInput}
            id="battleInput"
          >
            <Autocomplete
              suggestions={monstersInitHPDB.map((entry) => entry.label)}
              onBlur={setHP}
            />

            <select name="team" required defaultValue="">
              <option value="" disabled>
                Team
              </option>
              <option style={{ color: "blue" }} value="Blue">
                PCs
              </option>
              <option style={{ color: "red" }} value="Red">
                Enemies
              </option>
            </select>
            <input
              type="text"
              name="initiative_roll"
              id="initiative_roll"
              placeholder="Initiative roll"
              onFocus={rollInitiative}
            />
            <input
              type="text"
              name="hit_points"
              placeholder="Hit points"
              id="hit_points"
            />
            <input
              type="number"
              name="qty"
              placeholder="Qty"
              id="qty"
              min="1"
            />
            <button type="submit" className="pure-button pure-button-primary">
              ADD
            </button>
          </form>
          {/* COMMENT THIS TO FOR BATTLEGROUND DEVELOPMENT  */}
          {_Store.getState().battle.length >= 1 && (
          // {(
            <>
              <table className="pure-table battle-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Initiative</th>
                    <th>HP</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {_Store
                    .getState()
                    .battle.sort(initiative)
                    .map((item) => (
                      <tr key={item.creature_name}>
                        <td>{_Store.getState().battle.indexOf(item) + 1}</td>
                        <td>{item.creature_name}</td>
                        <td>{item.initiative_roll}</td>
                        <td>
                          <div
                            contentEditable
                            suppressContentEditableWarning={true}
                          >
                            {item.hit_points}
                          </div>
                        </td>
                        <td>
                          <div
                            contentEditable
                            suppressContentEditableWarning={true}
                          >
                            -
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              { battleDisplay === "inline" && <Battleground />}
              { battleDisplay === "popout" && (
                <NewWindow 
                  title="Battle"
                  center="screen"
                  // onUnload={setBattleDisplay("inline")}
                >
                  <Battleground />
                </NewWindow>
              )}
            </>
          )}
        </div>
      )}
    </StoreContext.Consumer>
  );
};
