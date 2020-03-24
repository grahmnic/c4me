// LIBRARIES
import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// COMPONENTS
import Login from './components/login/login.js';
import Home from './components/home/home.js';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <div className="header">
          <ul className="navBar">
            <li className="navLink">
              <Link to="/">Home</Link>
            </li>
            <li className="navLink">
              <Link to="/">Resources</Link>
            </li>
            <li className="navLink">
              <Link to="/">Student Services</Link>
            </li>
            <li className="navLink">
              <Link to="/">Administration</Link>
            </li>
            <li className="navLink">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        <div className="content">
          <hr />
          <Switch>
            <Route exact path="/">
              <HomeComponent />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
      
  );
}

// You can think of these components as "pages"
// in your app.

function HomeComponent() {
  return (
    <Home />
  );
}

function LoginComponent() {
  return (
    <Login />
  );
}
