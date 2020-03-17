import './App.css';
import React from 'react';
import StoreContext from "./StoreContext";
import { Form } from './Form';
;

function App() {

  return (
    <StoreContext.Consumer>
      {store => (
        <div className="flex-container">
          <Form />
        </div >
      )}
    </StoreContext.Consumer>
  );
}

export default App; // imported into index.js for render
