import React from 'react';
import './manageApplications.css';
import Application from '../application/application.js';

class ManageApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newApp: false,
            edittingApp: false
        }

        this.toggleNewApp = this.toggleNewApp.bind(this);
        this.toggleNewApp = this.toggleEditApp.bind(this);
    }

    componentDidMount() {

    }

    toggleNewApp() {
        this.setState({
            newApp: true,
            edittingApp: false
        });
    }

    toggleEditApp() {
        this.setState({
            newApp: false,
            edittingApp: true
        });
    }

    render() {

        var applicationModal;

        if(this.state.newApp) {
            applicationModal = 
            <div className="newAppModal">
                THIS IS A NEW APP MODAL
            </div>
        } else if (this.state.edittingApp) {
            applicationModal = 
            <div className="editAppModal">
                THIS IS AN EDIT APP MODAL
            </div>
        } else {
            applicationModal = <div></div>
        }

        return(
            <div className="card">
                {applicationModal}
                <div className="appStats">
                    <div className="appNums">
                        <div className="acceptReject">
                            <div className="innerNums">
                                <div>#</div>
                                <div>ACCEPTED</div>
                            </div>
                            <div className="innerNums">
                                <div>#</div>
                                <div>REJECTED</div>
                            </div>
                        </div>
                        <div className="deferWait">
                           <div className="innerNums">
                               <div>#</div> 
                               <div>DEFERRED</div>
                            </div> 
                            <div className="innerNums">
                                <div>#</div>
                                <div>WAITING</div> 
                            </div>
                        </div>
                        
                    </div>
                    <div className="appPercent">
                        <div className="innerPercent">
                            24%
                        </div>  
                        <div className="percentText">
                            ACCEPTANCE<br/>RATE
                        </div>
                    </div>
                    <div className="newAppWrap">
                        <div className="newApp">
                            ENTER <br/>NEW APPLICATION
                        </div>
                        <div className="newAppBtn">
                            <i className="far fa-plus-square" onClick={this.toggleNewApp}></i> 
                        </div>
                    </div>
                    
                </div>
                <div className="appsList">
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                </div>

            </div>

        );
    }
}

export default ManageApplications;