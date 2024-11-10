import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Counter from "../features/counter/Counter";
import GamePlay from "./gameplay";

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/gameplay" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            Testing 1..2..3..
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/gameplay" element={<GamePlay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
