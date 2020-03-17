import './App.css';
import React from 'react';
import StoreContext from "./StoreContext";
import { Form } from './Form';
import { Popup } from './Popup';
;

function App() {

  return (
    <StoreContext.Consumer>
      {store => (
        <div className="flex-container">
          <Popup />
          <Form />
        </div >
      )}
    </StoreContext.Consumer>
  );
}

export default App; // imported into index.js for render
