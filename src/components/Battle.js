import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Battleground } from "./Battleground";
import Autocomplete from "./Autocomplete";
import NewWindow from 'react-new-window';
import { monstersInitHPDB } from '../assets/monsters';
import { npcNames } from '../assets/npcs';

function initiativeSortFunction(a, b) {
  return b.initiative_roll - a.initiative_roll;
}

function matchingCreaturesInDb(creature) {
  return monstersInitHPDB.filter((c) => c.label === creature);
}

function getModifier(abilityScore) {
  return Math.floor((abilityScore - 10) / 2);
}

function rollInitiative() {
  const creature = document.getElementById("creature").value;
  if (matchingCreaturesInDb(creature).length) {
    const dex = matchingCreaturesInDb(creature)[0].dex;
    const modifier = getModifier(dex);
    const roll = Math.floor(Math.random() * 20) + modifier;
    document.getElementById("initiative_roll").value = roll;
    return roll;
  }
}

function setHP(event) {
  const creature = event.target.value;
  if (matchingCreaturesInDb(creature).length) {
    const hp = matchingCreaturesInDb(creature)[0].hp;
    document.getElementById("hit_points").value = hp;
  }
}

export const Battle = () => {
  const dispatch = useDispatch();
  const battle = useSelector((state) => state.battle);
  const [battleDisplay, setBattleDisplay] = useState("inline");

  function handleUserInput(event) {
    const creature_name = event.target["creature_name"].value;
    const initiative_roll = event.target["initiative_roll"].value;
    const hit_points = event.target["hit_points"].value;
    const team = event.target["team"].value;
    const quantity = Number(event.target["qty"].value) || 1;
    const update = [...Array(quantity)].map((_, idx) => ({
      creature_name: `${creature_name} ${quantity > 1 ? idx + 1 : ""}`,
      initiative_roll,
      hit_points,
      team,
      creature_birthName:
        team === "Red"
          ? npcNames[Math.floor(Math.random() * npcNames.length)]
          : creature_name,
    }));
    dispatch({ type: "BATTLE", payload: update });
    event.preventDefault();
    event.target.reset();
    document.getElementById("creature").focus();
  }

  function resetBattle() {
    dispatch({ type: "RESET_BATTLE" });
    document.getElementById("creature").select();
  }

  return (
    <div>
      <div id="popout-checkbox">
        <input
          type="checkbox"
          onChange={() => setBattleDisplay((d) => d === "popout" ? "inline" : "popout")}
          checked={battleDisplay === "popout"}
          id="popout-setting"
        />
        <label htmlFor="popout-setting">Pop out the battleground</label>
      </div>
      <form className="pure-form battle-form" onSubmit={handleUserInput} id="battleInput">
        <Autocomplete
          suggestions={monstersInitHPDB.map((entry) => entry.label)}
          onBlur={setHP}
        />
        <select name="team" required defaultValue="">
          <option value="" disabled>Team</option>
          <option style={{ color: "blue" }} value="Blue">PCs</option>
          <option style={{ color: "red" }} value="Red">Enemies</option>
        </select>
        <input
          type="text"
          name="initiative_roll"
          id="initiative_roll"
          placeholder="Initiative roll"
          onFocus={rollInitiative}
        />
        <input type="text" name="hit_points" placeholder="Hit points" id="hit_points" />
        <input type="number" name="qty" placeholder="Qty" id="qty" min="1" />
        <button type="submit" className="pure-button pure-button-primary">ADD</button>
      </form>

      {battle.length >= 1 && (
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
              {battle.slice().sort(initiativeSortFunction).map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.creature_name}</td>
                  <td>{item.initiative_roll}</td>
                  <td>
                    <div contentEditable suppressContentEditableWarning={true}>
                      {item.hit_points}
                    </div>
                  </td>
                  <td>
                    <div contentEditable suppressContentEditableWarning={true}>-</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="reset" className="pure-button" onClick={resetBattle}>
            Reset battle
          </button>
          {battleDisplay === "inline" && <Battleground />}
          {battleDisplay === "popout" && (
            <NewWindow title="Battle" center="screen">
              <Battleground />
            </NewWindow>
          )}
        </>
      )}
    </div>
  );
};
