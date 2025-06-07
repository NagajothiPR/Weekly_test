import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Counter from "./Components/Counter";
import TodoList from "./Components/TodoList";
import PasswordToggle from "./Components/PasswordToggle";
import ApiFetcher from "./Components/ApiFetcher";
import ScrollTop from "./Components/ScrollTop";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
       <nav className="navbar">
  <div className="navbar-brand">Nagajothi<span>-Projects</span></div>
  <ul className="navbar-links">
    <li><Link to="/">Counter</Link></li>
    <li><Link to="/todo">Todo List</Link></li>
    <li><Link to="/password">Password</Link></li>
    <li><Link to="/api">API Fetch</Link></li>
    <li><Link to="/scroll">Scroll Top</Link></li>
  </ul>
</nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/password" element={<PasswordToggle />} />
            <Route path="/api" element={<ApiFetcher />} />
            <Route path="/scroll" element={<ScrollTop />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
