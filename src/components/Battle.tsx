import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Battleground } from "./Battleground";
import Autocomplete from "./Autocomplete";
import NewWindowBase from 'react-new-window';
import type { PropsWithChildren } from "react";
import { monstersInitHPDB } from '../assets/monsters';
import { npcNames } from '../assets/npcs';
import type { AppAction, AppState, BattleEntry } from "../types";
import type { Dispatch } from "redux";

const NewWindow = NewWindowBase as unknown as React.ComponentType<
  PropsWithChildren<{ title?: string; center?: "parent" | "screen" }>
>;

function initiativeSortFunction(a: BattleEntry, b: BattleEntry): number {
  return Number(b.initiative_roll) - Number(a.initiative_roll);
}

function matchingCreaturesInDb(creature: string) {
  return monstersInitHPDB.filter((c) => c.label === creature);
}

function getModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}

function rollInitiative(): number | undefined {
  const creature = (document.getElementById("creature") as HTMLInputElement | null)?.value ?? "";
  if (matchingCreaturesInDb(creature).length) {
    const dex = matchingCreaturesInDb(creature)[0].dex;
    const modifier = getModifier(dex);
    const roll = Math.floor(Math.random() * 20) + modifier;
    const initiative = document.getElementById("initiative_roll") as HTMLInputElement | null;
    if (initiative) initiative.value = String(roll);
    return roll;
  }
}

function setHP(event: React.FocusEvent<HTMLInputElement>) {
  const creature = event.currentTarget.value;
  if (matchingCreaturesInDb(creature).length) {
    const hp = matchingCreaturesInDb(creature)[0].hp;
    const hitPoints = document.getElementById("hit_points") as HTMLInputElement | null;
    if (hitPoints) hitPoints.value = String(hp);
  }
}

export const Battle = () => {
  const dispatch = useDispatch<Dispatch<AppAction>>();
  const battle = useSelector((state: AppState) => state.battle);
  const [battleDisplay, setBattleDisplay] = useState<"inline" | "popout">("inline");

  function handleUserInput(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const creature_name = String(formData.get("creature_name") ?? "");
    const initiative_roll = String(formData.get("initiative_roll") ?? "");
    const hit_points = String(formData.get("hit_points") ?? "");
    const team = String(formData.get("team") ?? "");
    const quantity = Number(formData.get("qty")) || 1;
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
    form.reset();
    document.getElementById("creature")?.focus();
  }

  function resetBattle() {
    dispatch({ type: "RESET_BATTLE" });
    (document.getElementById("creature") as HTMLInputElement | null)?.select();
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
