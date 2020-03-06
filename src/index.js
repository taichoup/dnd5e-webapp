import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoreContext from "./StoreContext";
import { _Store } from "./Store";

_Store.subscribe(() => {
    doRender();
});

_Store.subscribe(() => {
    console.log("State updated: %o", _Store.getState());
})

const doRender = () => {
    ReactDOM.render(
        <StoreContext.Provider value={_Store}>
            <App />
        </StoreContext.Provider>,
        document.getElementById("root")
    );
};

// ReactDOM.render(<App />, document.getElementById('root'));

doRender();