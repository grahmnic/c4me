import React from 'react';
import './application.css';

class Application extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

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

    render() {



        return(
            <div className="applicationWrap">
                <div className="applicationLogo"></div>
                <div className="appNameStatusWrap">
                    <div className="appSchoolName">{this.props.data.collegename}</div>
                    <div className="appStatusWrap">
                        <div className="appStatus" style={{color: this.stringColorString(this.props.data.status)}}> 
                            {this.props.data.status.toUpperCase()}
                        </div>
                        <div className="appStatusFlag">
                            <i className="fas fa-flag"></i>
                        </div>
                    </div>
                    
                </div>
                <div className="editAppLogo">
                    <i className="far fa-edit" ></i>
                </div>
            </div>
        );
    }
}

export default Application;