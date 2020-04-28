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
            newAppDataStatus: null,
            applicationsList: [],
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createApp = this.createApp.bind(this);
        this.fetchApp = this.fetchApp.bind(this);
    }

    handleNewAppDataSchool = (e) => {
        this.setState({
            newAppDataSchool: e.target.value
        })
    }

    handleNewAppDataStatus = (e) => {
        this.setState({
            newAppDataStatus: e.target.value
        });
    }

    fetchApp() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallapplications/' + localStorage.getItem("user"), requestOptions)
        .then(data => {
            if(data.status !== 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "APPLICATION ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                data.json().then(res => {
                    this.setState({
                        applicationsList: res
                    });
                });
            }
        });

        this.setState({
            newAppDataSchool: null,
            newAppDataStatus: null
        });
    }

    componentDidMount() {
        this.fetchApp()
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
            if(data.status !== 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "APPLICATION ERROR",
                        content: "Error: " + res.error
                    });
                    this.setState({
                        newAppDataSchool: null,
                        newAppDataStatus: null
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
                });
                this.setState({
                    newAppDataSchool: null,
                    newAppDataStatus: null
                });
                // this.fetchApp();
            }
        });        

        this.fetchApp();
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

        // unique keys for applications
        let applications = [];
        let numAccepted = 0;
        let numRejected = 0;
        let numDeferred = 0;
        let numWaiting = 0;

        for (var i = 0; i < this.state.applicationsList.length; i++) {
            applications.push({
                id: i,
                value: this.state.applicationsList[i]
            });
            if (this.state.applicationsList[i].status === "accepted") {
                numAccepted++;
            } else if (this.state.applicationsList[i].status === 'denied') {
                numRejected++;
            } else if (this.state.applicationsList[i].status === 'pending' || this.state.applicationsList[i].status === 'wait-listed')  {
                numWaiting++;
            } else if (this.state.applicationsList[i].status === 'deferred') {
                numDeferred++;
            }
        }

        let acceptanceRate = Math.floor(( numAccepted / applications.length ) * 100);

        let appList = applications.map((e) =>
            <div className="application" key={e.id} style={{ animationDelay: ((e.id % 10) * 0.1).toString() + "s" }}>
                <Application data={e.value} callback={this.fetchApp} createPopup={this.props.createPopup}/>
            </div>
            
        );


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
                        <option value="">CHOOSE A STATUS</option>
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

        return(
            <div className="card">
                <AppModal onClose={this.closeModal} show={this.state.showModal} ops={this.state.modalOps} callback={this.state.modalCallback}/>
                <div className="appStats">
                    <div className="appNums">
                        <div className="acceptReject">
                            <div className="innerNums">
                                <div>{numAccepted}</div>
                                <div>ACCEPTED</div>
                            </div>
                            <div className="innerNums">
                                <div>{numRejected}</div>
                                <div>REJECTED</div>
                            </div>
                        </div>
                        <div className="deferWait">
                           <div className="innerNums">
                               <div>{numDeferred}</div> 
                               <div>DEFERRED</div>
                            </div> 
                            <div className="innerNums">
                                <div>{numWaiting}</div>
                                <div>WAITING</div> 
                            </div>
                        </div>
                        
                    </div>
                    <div className="appPercent">
                        <div className="innerPercent">
                            {acceptanceRate}%
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
                                    this.createApp
                                )}>
                            </i> 
                        </div>
                    </div>
                    
                </div>
                <div className="appsList">
                    {appList}
                </div>

            </div>

        );
    }
}

export default ManageApplications;