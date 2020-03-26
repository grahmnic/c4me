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
import Profile from './components/profile/profile.js';
import Collegesearch from './components/collegesearch/collegesearch.js';
import { logDOM } from "@testing-library/react";

export default function BasicExample() {
  return (
    <Router>
      <div>

        {/*Navbar Header]*/}

        <div className="header">

          <div className="headerBar">

            {/*Needs to be changed to actual logo*/}
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
                    <li>
                      <Link to="/collegesearch">College Search</Link>
                    </li>
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

              <div className="navLink responsive">
                  <div className="navBar responsive">
                    <div className="respMenu">
                      <a>MENU</a>
                      <div className="respDropdown">
                        <li className="respLink">Student Services</li>
                        <li className="respLink">Administration</li>
                        <li className="respLink">Login</li>
                      </div>
                    </div>
                  </div>
              </div>

            </div>
          </div>
          
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/">
              <HomeComponent />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/collegesearch">
              <CollegesearchComponent />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
      // <LoginComponent />
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

function ProfileComponent() {
  return (
    <Profile />
  )
}

function CollegesearchComponent() {
  return (
    <Collegesearch />
  )
}