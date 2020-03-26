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
import keyIndex from 'react-key-index';
import { logDOM } from "@testing-library/react";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          popups: [] 
        }

        localStorage.clear();

        this.createPopup = this.createPopup.bind(this);
        this.removePopup = this.removePopup.bind(this);
    }

    componentDidMount() {
      setInterval(function() {
        if(this.state.popups.length) {
          var array = [...(localStorage.getItem("popups") ? JSON.parse(localStorage.getItem("popups")) : [])];
          array.shift();
          localStorage.setItem("popups", JSON.stringify(array))
          this.setState({
            popups: array
          });
        }
      }.bind(this), 5000);
    }

    createPopup(ops) {
      var array = [...(localStorage.getItem("popups") ? JSON.parse(localStorage.getItem("popups")) : [])];
      array.push(ops);
      localStorage.setItem("popups", JSON.stringify(array))
      this.setState({popups: array});
    }

    removePopup(key) {
      this.setState({popups: this.state.popups.splice(key, 1)});
    }

    render() {
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
        return(
            <div>
              <div className="popups">
                {popups}
              </div>
                <Login createPopup={this.createPopup} />
            </div>
        );
    }
}

export default App;

// export default function BasicExample() {
//   return (
//     <div>
//       <LoginComponent />
//     </div>
//     // <Router>
//     //   <div>
//     //     <div className="header">

//     //       <div className="headerBar">
//     //         <img className="logo" src={Logo} alt="LOGO"></img>

//     //         <div className="navBarWrap">

//     //           <ul className="navBar">

//     //             <li className="navLink">
//     //               <Link to="/">Home</Link>
//     //             </li>

//     //             <div className="navLink dropdown">
//     //               <li>
//     //                 <Link to="/">Student Services</Link>
//     //               </li>
//     //               <div className="dropdown-content">
//     //                 <li>College Search</li>
//     //                 <li>Highschool Search</li>
//     //                 <li>Applications Tracker</li>
//     //               </div>
//     //             </div>
                
//     //             <div className="navLink dropdown">
//     //               <li>
//     //                 <Link to="/">Administration</Link>
//     //               </li>
//     //               <div className="dropdown-content">
//     //                 <li>Import</li>
//     //                 <li>Scrape Data</li>
//     //                 <li>Review Decisions</li>
//     //               </div>
//     //             </div>

//     // //             <li className="navLink">
//     // //               <Link className="login" to="/login">Login</Link>
//     // //             </li>
//     // //           </ul>

//     //           <div className="navLink responsive">
//     //               <div className="navBar responsive">
//     //                 <div className="respMenu">
//     //                   <a>MENU</a>
//     //                   <div className="respDropdown">
//     //                     <li className="respLink">Student Services</li>
//     //                     <li className="respLink">Administration</li>
//     //                     <li className="respLink">Login</li>
//     //                   </div>
//     //                 </div>
//     //               </div>
//     //           </div>

//     //         </div>
//     //       </div>
          
//     // //     </div>

//     // //     <div className="content">
//     // //       <Switch>
//     // //         <Route exact path="/">
//     // //           <HomeComponent />
//     // //         </Route>
//     // //         <Route path="/login">
//     // //           <LoginComponent />
//     // //         </Route>
//     // //       </Switch>
//     // //     </div>
//     // //   </div>
//     // // </Router>

//   );
// }

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