import './App.css';
import React from 'react';
import axios from 'axios';
import { _Store } from './Store';
import StoreContext from "./StoreContext";
import { Results } from './Results'
import { NavItem } from './NavItem';
import { Form } from './Form';
;

function App() {

  const currentSection = _Store.getState().section;

  // EFFECT
  React.useEffect(() => {
    _Store.dispatch({ type: "GETDATA", payload: null });
    let canceled = false;
    (async () => {
      const response = await axios.get(
        `http://www.dnd5eapi.co/api/${currentSection}`
      );

      // console.log("AXIOS: %o", response);
      if (!canceled) {
        _Store.dispatch({ type: "GETDATA_API", payload: response.data.results });
      }
    })();
    return () => {
      canceled = true;
    };
  }, [currentSection]);


  //APP STRUCTURE
  return (
    <StoreContext.Consumer>
      {store => (
        <div className="flex-container">
          {/* <div className="sections">
            <NavItem name="Races" path="races" />
            <NavItem name="Subraces" path="subraces" />
            <NavItem name="Classes" path="classes" />
            <NavItem name="Subclasses" path="subclasses" />
            <NavItem name="Languages" path="languages" />
            <NavItem name="Spellcasting" path="spellcasting" />
            <NavItem name="Spells" path="spells" />
            <NavItem name="Monsters" path="monsters" />
            <NavItem name="Features" path="features" />
            <NavItem name="Equipment" path="equipment" />
            <NavItem name="Proficiencies" path="proficiencies" />
          </div>
          <Results selectedTab={_Store.getState().section} data={_Store.getState().data} /> */}
          <Form />
        </div >
      )}
    </StoreContext.Consumer>
  );
}

export default App; // imported into index.js for render
