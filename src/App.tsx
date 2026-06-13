import "./App.css";
import React from "react";
import { Form } from "./components/Form";
import { Battle } from "./components/Battle";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
          <Routes>
            <Route path="/battle" element={<Battle />} />
            <Route path="/" element={<Form />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
