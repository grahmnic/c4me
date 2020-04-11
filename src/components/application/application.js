import React from 'react';
import './application.css';

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="applicationWrap">
                <div className="applicationHeader">
                    <div className="collegeName"> STONY BROOK UNIVERSITY </div>
                    <div className="editApplication"> EDIT</div>
                </div>
                <div className="applicationStatus">
                    <div className="applicationStatus"> ACCEPTED </div>
                    <div className="appCollegeInfo"> INFO </div>
                </div>
            </div>
        );
    }
}

export default Application;