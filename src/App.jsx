import "./App.css";
import React from "react";
import { Form } from "./components/Form";
import { Battle } from "./components/Battle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="flex-container">
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
  );
}

export default App;
