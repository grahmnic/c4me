// LIBRARIES
import React from "react";
import Logo from "./logo.PNG";
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
import { logDOM } from "@testing-library/react";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <div className="header">

          <div className="headerBar">
            <img className="logo" src={Logo} alt="LOGO"></img>

            <div className="navBarWrap">

              <ul className="navBar">
                <li className="navLink">
                  <Link to="/">Home</Link>
                </li>
                <div className="navLink dropdown">
                  <li>
                    <Link to="/">Student Services</Link>
                  </li>
                  <div className="dropdown-content">
                    <li>College Search</li>
                    <li>Highschool Search</li>
                    <li>Applications Tracker</li>
                  </div>
                </div>
                

                <div className="navLink dropdown">
                  <li>
                    <Link to="/">Administration</Link>
                  </li>
                  <div className="dropdown-content">
                    <li>Import</li>
                    <li>Scrape Data</li>
                    <li>Review Decisions</li>
                  </div>
                </div>

                <li className="navLink">
                  <Link className="login" to="/login">Login</Link>
                </li>
              </ul>

            </div>
          </div>
          
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
