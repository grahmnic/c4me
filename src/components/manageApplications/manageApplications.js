import React from 'react';
import './manageApplications.css';
import Application from '../application/application.js';
import AppModal from '../appModal/appModal.js';

class ManageApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newApp: false,
            editApp: false,
            showModal: false,
            modalOps: null,
            modalCallback: null
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateApp = this.updateApp.bind(this);
        this.showNewAppModal = this.showNewAppModal.bind(this);
        this.showEditAppModal = this.showEditAppModal.bind(this);
    }

    componentDidMount() {

    }

    updateApp() {
        console.log("I AM UPDATING APPLICATION");
        /* 
            /editprofile/username and in body { collegename : "", status : "" }
        */
    }

    showModal(ops, callback) {
        this.setState({
            showModal: true,
            modalOps: ops,
            modalCallback: callback
        });
    }

    showNewAppModal(ops, callback) {
        this.setState({
            newApp: true,
            editApp: false,
            showModal: true,
            modalOps: ops,
            modalCallback: callback
        });
    }

    showEditAppModal(ops, callback) {
        this.setState({
            newApp: false,
            editApp: true,
            showModal: true,
            modalOps: ops,
            modalCallback: callback
        });
    }

    closeModal() {
        this.setState({
            newApp: false,
            editApp: false,
            showModal: false
        });
    }

    render() {

        var appModalContent;
        if(this.state.newApp) {
            appModalContent = 
            <div className="appModalForm">
                <div className="newAppSchool">
                    <div className="newAppSchoolText">
                        SCHOOL:
                    </div>
                    <div className="newAppSchoolInput">
                        <input type="text"></input>
                    </div>
                </div>
                <div className="newAppStatus">
                    <div className="newAppStatusText">
                        STATUS:
                    </div>
                    <div className="newAppStatusSelect">
                        <select>
                            <option>ACCEPTED</option>
                            <option>DENIED</option>
                            <option>DEFERRED</option>
                            <option>WAITING</option>
                        </select>
                    </div>
                </div>
            </div>
            
        } else if (this.state.editApp) {
            appModalContent =
            <div className="appModalForm">
                <div className="newAppSchool">
                    <div className="newAppSchoolText">
                        SCHOOL:
                    </div>
                    <div className="newAppSchoolInput">
                        <input type="text"></input>
                    </div>
                </div>
                <div className="newAppStatus">
                    <div className="newAppStatusText">
                        STATUS:
                    </div>
                    <div className="newAppStatusSelect">
                        <select>
                            <option>ACCEPTED</option>
                            <option>DENIED</option>
                            <option>DEFERRED</option>
                            <option>WAITING</option>
                        </select>
                    </div>
                </div>
            </div>
        } else {
            appModalContent = <div></div>
        }

        return(
            <div className="card">
                <AppModal onClose={this.closeModal} show={this.state.showModal} ops={this.state.modalOps} callback={this.state.modalCallback}/>
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
                            <i className="far fa-plus-square" 
                                onClick={() => this.showNewAppModal(
                                    {
                                        title: "NEW APPLICATION",
                                        content: appModalContent
                                    },
                                    this.updateApp
                                )}>
                            </i> 
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