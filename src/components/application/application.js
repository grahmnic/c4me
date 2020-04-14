import React from 'react';
import './application.css';

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editApp: false,
            editAppSchool: null,
            editAppStatus: null
        }

        this.toggleSubmit = this.toggleSubmit.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);

    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            editAppStatus: this.props.data.status
        })
    }

    stringColorString(status) {
        let color = "black";
        switch (status) {
            case "accepted":
                color = "#00b300";
                break;
            case "denied":
                color = "#b30000";
                break;
            case "withdrawn":
                color = "black";
                break;
            default:
                color = "#ff6600";
                break;
        }

        return color;
    }

    handleEditAppStatus = (e) => {
        this.setState({
            editAppStatus: e.target.value
        });
    }

    toggleEditMode() {
        this.setState({
            editApp: true,
            editAppSchool: this.props.data.collegename
        });
    }

    toggleSubmit() {
        this.props.createPopup({
            title: "REQUEST SENT",
            content: "The system is processing your application request."
        });

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                collegename: this.state.editAppSchool,
                status: this.state.editAppStatus
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
                });
            } else {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "APPLICATION UPDATED",
                        content: "Your application has been successfully updated."
                    });
                    this.setState({
                        editApp: false,
                        editAppStatus: "",
                        editAppSchool: null,
                    });
                    this.props.callback();
                }
                );
            }
        });
    }



    render() {

        let flag;

        if (this.props.data.questionable) {
            flag = <i className="fas fa-flag"></i>
        } else {
            flag = <div></div>
        }

        let editAppWrap;
        let editOrSubmit;

        if (!this.state.editApp) {
            editAppWrap = 
                <div className="appNameStatusWrap">
                    <div className="appSchoolName">{this.props.data.collegename}</div>
                    <div className="appStatusWrap">
                        <div className="appStatus" style={{color: this.stringColorString(this.props.data.status)}}> 
                            {this.props.data.status.toUpperCase()}
                        </div>
                        <div className="appStatusFlag">
                            {flag}
                        </div>
                    </div>
                </div>
            
            editOrSubmit = 
                <div className="editAppLogo">
                    <i className="far fa-edit" onClick={this.toggleEditMode}></i>
                </div>
        } else {
            editAppWrap = 
                <div className="appNameStatusWrap">
                    <div className="appSchoolName">{this.props.data.collegename}</div>
                    <div className="editStatus">
                        <select onChange={this.handleEditAppStatus} value={this.state.editAppStatus}>
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

            editOrSubmit = 
                <div className="editAppLogo">
                    <i className="far fa-check-square" onClick={this.toggleSubmit}></i>
                </div>
        }

        return(
            <div className="applicationWrap">
                <div className="applicationLogo"></div>
                {editAppWrap}
                {editOrSubmit}
            </div>
        );
    }
}

export default Application;