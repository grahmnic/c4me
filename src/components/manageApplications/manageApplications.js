import React from 'react';
import './manageApplications.css';
import Application from '../application/application.js';
import AppModal from '../appModal/appModal.js';

class ManageApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalOps: null,
            modalCallback: null,
            newAppDataSchool: null,
            newAppDataStatus: null
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateApp = this.updateApp.bind(this);
    }

    handleNewAppDataSchool = (e) => {
        this.setState({
            newAppDataSchool: e.target.value
        })
    }

    handleNewAppDataStatus = (e) => {
        this.setState({
            newAppDataStatus: e.target.value
        })
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getapplications/' + localStorage.getItem("user"), requestOptions)
        .then(data => {
            if(data.status != 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "APPLICATION ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                
            }
        });    
    }

    createApp() {
        this.props.createPopup({
            title: "REQUEST SENT",
            content: "The system is processing your application request."
        });
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                collegename: this.state.newAppDataSchool,
                status: this.state.newAppDataStatus
            })
        };
        fetch('https://chads4us.herokuapp.com/editapplication/' + localStorage.getItem("user"), requestOptions)
        .then(data => {
            if(data.status != 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "APPLICATION ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                data.json().then(res => {
                    if(res.isNew) {
                        this.props.createPopup({
                            title: "APPLICATION CREATED",
                            content: "Your application has been successfully created."
                        });
                    } else {
                        this.props.createPopup({
                            title: "APPLICATION UPDATED",
                            content: "Your applcation has been successfully updated."
                        });
                    }
                })
            }
        });        
    }

    showModal(ops, callback) {
        this.setState({
            showModal: true,
            modalOps: ops,
            modalCallback: callback
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render() {

        const newModalContent = 
        <div className="appModalForm">
            <div className="newAppSchool">
                <div className="newAppSchoolText">
                    SCHOOL:
                </div>
                <div className="newAppSchoolInput">
                    <input type="text" onChange={this.handleNewAppDataSchool} value={this.state.newAppDataSchool}></input>
                </div>
            </div>
            <div className="newAppStatus">
                <div className="newAppStatusText">
                    STATUS:
                </div>
                <div className="newAppStatusSelect">
                    <select onChange={this.handleNewAppDataStatus} value={this.state.newAppDataStatus}>
                        <option value="accepted">ACCEPTED</option>
                        <option value="denied">DENIED</option>
                        <option value="pending">PENDING</option>
                        <option value="deferred">DEFERRED</option>
                        <option value="withdrawn">WITHDRAWN</option>
                        <option value="wait-listed">WAITLISTED</option>
                    </select>
                </div>
            </div>
        </div>
            
        const editModalContent =
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
                                onClick={() => this.showModal(
                                    {
                                        title: "NEW APPLICATION",
                                        content: newModalContent
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