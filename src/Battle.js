import React from "react";
import StoreContext from "./StoreContext";
import { _Store } from "./Store";

function handleUserInput(event) {
  const creature_name = event.target["creature_name"].value;
  const initiative_roll = event.target["initiative_roll"].value;
  const hit_points = event.target["hit_points"].value;
  _Store.dispatch({
    type: "BATTLE",
    payload: {
      creature_name: creature_name,
      initiative_roll: initiative_roll,
      hit_points: hit_points,
    },
  });
  event.preventDefault();
  event.target.reset();
  document.getElementById("creature").focus();
}

function initiative(a, b) {
  return b.initiative_roll - a.initiative_roll;
}

// function rollInitiative(event) {
//   event.preventDefault();
//   let roll = 0;
//   roll += event.deltaY;
//   event.target.value = roll;
// }

export const Battle = (props) => {
  return (
    <StoreContext.Consumer>
      {(store) => (
        <div>
          <form className="pure-form battle-form" onSubmit={handleUserInput}>
            <input
              type="text"
              name="creature_name"
              placeholder="Name"
              id="creature"
            />
            <input
              type="text"
              name="initiative_roll"
              placeholder="Initiative roll"
              // onWheel={rollInitiative}
            />
            <input type="text" name="hit_points" placeholder="Hit points" />
            <button type="submit" className="pure-button pure-button-primary">
              ADD
            </button>
          </form>
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
            {_Store
              .getState()
              .battle.sort(initiative)
              .map((item) => (
                <tr>
                  <td>{_Store.getState().battle.indexOf(item) + 1}</td>
                  <td>{item.creature_name}</td>
                  <td>{item.initiative_roll}</td>
                  <td>
                    <div contentEditable>{item.hit_points}</div>
                  </td>
                  <td>
                    <div contentEditable>-</div>
                  </td>
                </tr>
              ))}
          </table>
          <div className="battle-reset">
            <button
              type="submit"
              className="pure-button"
              onClick={() => _Store.dispatch({ type: "RESET_BATTLE" })}
            >
              Reset table
            </button>
          </div>
        </div>
      )}
    </StoreContext.Consumer>
  );
};
