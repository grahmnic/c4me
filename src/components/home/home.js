import React from 'react';
import {
    Redirect
  } from "react-router-dom";

class Home extends React.Component {
    componentDidMount() {

    }

    render() {
        return(
            <Redirect to="/profile" />
        );
    }
}

export default Home;