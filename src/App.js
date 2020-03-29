// LIBRARIES
import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// ASSETS
import avatarImage from './assets/images/ralph.jpg';

// COMPONENTS
import Login from './components/login/login.js';
import Home from './components/home/home.js';
import Profile from './components/profile/profile.js';
import Collegesearch from './components/collegesearch/collegesearch.js';
import keyIndex from 'react-key-index';
import { logDOM } from "@testing-library/react";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          popups: [],
          showMenu: false 
        }

        //localStorage.clear();

        this.createPopup = this.createPopup.bind(this);
        this.removePopup = this.removePopup.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
        this.shiftPopup = this.shiftPopup.bind(this);
    }

    componentDidMount() {
      this.interval = setInterval(function() {
        if(localStorage.getItem("popups") != "[]" && localStorage.getItem("popups")) {
          var popups = JSON.parse(localStorage.getItem("popups"));
          var timestamps = JSON.parse(localStorage.getItem("popups_timestamps"));
          for (var x = 0; x < popups.length; x++) {
            timestamps[x] -= 500;
          }
          var set = false;
          while(timestamps[0] <= 0) {
            popups.shift();
            timestamps.shift();
            set = true;
          }
          localStorage.setItem("popups", JSON.stringify(popups))
          localStorage.setItem("popups_timestamps", JSON.stringify(timestamps));
          if(set) {
            this.setState({popups: []});
          }
          // if(timestamps[0] <= 0) {
          //   popups.shift();
          //   timestamps.shift();
          //   localStorage.setItem("popups", JSON.stringify(popups))
          //   localStorage.setItem("popups_timestamps", JSON.stringify(timestamps));
          //   this.setState({popups: []});
          // } else {
          //   localStorage.setItem("popups", JSON.stringify(popups))
          //   localStorage.setItem("popups_timestamps", JSON.stringify(timestamps));
          // }
        }
      }.bind(this), 500);
    }

    shiftPopup() {
      // if(localStorage.getItem("popups") != "[]") {
      //   localStorage.setItem("shifting", "yes");
      //   clearTimeout(parseInt(localStorage.getItem("id")));
      //   const id = setTimeout(function() {
      //       var array = [...(localStorage.getItem("popups") ? JSON.parse(localStorage.getItem("popups")) : [])];
      //       array.shift();
      //       localStorage.setItem("popups", JSON.stringify(array))
      //       this.setState({
      //         popups: array
      //       });
      //       this.shiftPopup();
      //   }.bind(this), 5000);
      //   localStorage.setItem("id", id.toString());
      // } else {
      //   localStorage.setItem("shifting", "");
      // }
    }

    handleSignout() {
      this.createPopup({
        title: "SIGNING OUT",
        content: "Thank you for using C4ME. Come back soon!"
      })
      localStorage.setItem("user", "");
      this.setState({showMenu: false});
    }

    createPopup(ops) {
      var array = [...(localStorage.getItem("popups") ? JSON.parse(localStorage.getItem("popups")) : [])];
      array.push(ops);
      localStorage.setItem("popups", JSON.stringify(array));
      if (!localStorage.getItem("shifting")) {
        this.shiftPopup();
      }
      var timestamps = [...(localStorage.getItem("popups_timestamps") ? JSON.parse(localStorage.getItem("popups_timestamps")) : [])];
      timestamps.push(5000);
      localStorage.setItem("popups_timestamps", JSON.stringify(timestamps));
      this.setState({showMenu: this.state.showMenu});
    }

    removePopup(key) {
      this.setState({popups: this.state.popups.splice(key, 1)});
    }

    handleMenu() {
      this.setState({
        showMenu: !this.state.showMenu
      });
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      if(localStorage.getItem("popups")) {
        this.shiftPopup();
      }
      var arr = [];
      var pops = JSON.parse(localStorage.getItem("popups")) ? JSON.parse(localStorage.getItem("popups")) : [];
      for(var i = 0; i < pops.length; i++) {
        arr.push({
          id: i,
          value: pops[i]
        })
      }
      const popups = arr.map((e) =>
        <div key={e.id} className="popup">
        <i class="popup-icon fas fa-times"></i>
        <div className="popup-title">{e.value.title}</div>
        <div className="popup-content">
          {e.value.content}
        </div>
        </div> 
      );
      var re = '';
      if(!localStorage.getItem("user")) {
        re = <Redirect to="/login" />
      }
        return(
            <div>
              <div className="popups">
                {popups}
              </div>
              <Router>
                {re}
                <div>
                  <div className="root">
                    <div className={`header ${localStorage.getItem("user") ? '' : 'notLoggedIn'}`}>
                      <div className={`avatar-wrapper ${this.state.showMenu ? 'avatar-wrapper-menu' : ''}`} onClick={this.handleMenu}>
                        <div className={`avatar ${this.state.showMenu ? 'avatar-menu' : ''}`}></div>
                      </div>
                        <Link to="/profile" className={`menu-btn ${this.state.showMenu ? 'menu-btn-active' : ''}`}>
                          <i class="far fa-user"></i>
                        </Link>
                        <Link to="/" className={`menu-btn ${this.state.showMenu ? 'menu-btn-active' : ''}`}>
                          <i class="fas fa-university"></i>
                        </Link>
                        <Link to="/collegesearch" className={`menu-btn ${this.state.showMenu ? 'menu-btn-active' : ''}`}>
                          <i class="fas fa-chalkboard"></i>
                        </Link>
                        <div onClick={this.handleSignout} className={`menu-btn ${this.state.showMenu ? 'menu-btn-active' : ''}`}>
                          <i class="fas fa-sign-out-alt"></i>
                        </div>                 
                    </div>
                  </div>

                  <div className="content">
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route path="/login">
                        <Login createPopup={this.createPopup}/>
                      </Route>
                      <Route path="/profile">
                        <Profile createPopup={this.createPopup}/>
                      </Route>
                      <Route path="/collegesearch">
                        <Collegesearch createPopup={this.createPopup}/>
                      </Route>
                    </Switch>
                  </div>
                </div>
              </Router>
            </div>
        );
    }
}

export default App;


// You can think of these components as "pages"
// in your app.

function HomeComponent() {
  return (
    <Home />
  );
}

function LoginComponent(props) {
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