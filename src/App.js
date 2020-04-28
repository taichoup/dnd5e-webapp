import "./App.css";
import React from "react";
import StoreContext from "./StoreContext";
import { Form } from "./Form";
import { Battle } from "./Battle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <StoreContext.Consumer>
      {(store) => (
        <div className="flex-container">
          {/* <Form /> */}
          <Router>
            <div>
              <nav>
                <ul>
                  <li className="nav-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/battle">Battle</Link>
                  </li>
                </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/battle">
                  <Battle />
                </Route>
                <Route path="/">
                  <Form />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      )}
    </StoreContext.Consumer>
  );
}

export default App;
