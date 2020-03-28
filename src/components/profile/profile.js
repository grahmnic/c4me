import React from 'react';
import './profile.css';
import { Redirect } from 'react-router-dom';
import Progress from './progress/progress.js';
import profileImage from '../../assets/images/ralph.jpg';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            gpa_progress: 0,
            satmath_progress: 0,
            satebrw_progress: 0,
            actcomposite_progress: 0
        }
    }

    componentDidUpdate() {
        setTimeout(function() {
            this.setState({
                gpa_progress: ((this.state.userInfo.gpa / 4) * 100),
                satmath_progress: ((this.state.userInfo.satmath / 800) * 100),
                satebrw_progress: ((this.state.userInfo.satebrw / 800) * 100),
                actcomposite_progress: ((this.state.userInfo.actcomposite / 36) * 100)
            })
        }.bind(this), 500);
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            };
            fetch('https://chads4us.herokuapp.com/profile/' + localStorage.getItem("user"), requestOptions)
            .then(data => {
                if(data.status != 200) {
                    data.json().then(res => {
                        this.props.createPopup({
                            title: "PROFILE ERROR",
                            content: "No such user exists."
                        });
                    });
                } else {
                    data.json().then(res => {
                        this.setState({
                            userInfo: res
                        });
                    });
                }
            });
        }
    }

    toggleEditMode() {
        
    }

    render() {
        if(!localStorage.getItem("user")) {
            return (
                <Redirect to="/login" />
            );
        } else {
            return(
                <div className="profile">
                    <div className="profile-content">
                        <div className="side-card">
                            <div className="info-card">
                                <div className="info-banner">
                                    <div className="info-edit">
                                        <i class="fas fa-user-edit"></i>
                                    </div>
                                </div>
                                <div className="info-img">
                                    <div className="profile-image-wrapper">
                                        <img className="profile-image" alt="profile-image" src={profileImage}/>
                                    </div>
                                    
                                </div>
                                <div className="info-content">
                                    <div className="user-title">
                                        {this.state.userInfo.username}
                                    </div>
                                    <div className="user-info">
                                        <div>
                                            <div>COLLEGE CLASS</div>
                                            <div>{this.state.userInfo.collegeclass ? this.state.userInfo.collegeclass : "n/a"}</div>
                                        </div>
                                        <div>
                                            <div>MAJORS</div>
                                            <div>{this.state.userInfo.major1}{this.state.userInfo.major2 ? ", " + this.state.userInfo.major2 : ""}</div>
                                        </div>
                                        <div>
                                            <div>STATE</div>
                                            <div>{this.state.userInfo.residencestate ? this.state.userInfo.residencestate : "n/a"}</div>
                                        </div>
                                        <div>
                                            <div>HIGHSCHOOL</div>
                                            <div>{this.state.userInfo.highschoolname}</div>
                                        </div>
                                        <div>
                                            <div>H.S. LOCATION</div>
                                            <div>{this.state.userInfo.highschoolcity ? this.state.userInfo.highschoolcity + ", " + this.state.userInfo.highschoolstate : "n/a"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-card">

                            </div>
                        </div>
                        
                        <div className="content-card">
                            <div className="progress-stats">
                                <div className="gpa">
                                    <Progress radius={60} stroke={10} progress={this.state.gpa_progress} />
                                    <div className="gpa-num">{this.state.userInfo.gpa}</div>
                                    <div className="stat-title">GPA</div>
                                </div>
                                <div className="gpa">
                                    <Progress radius={60} stroke={10} progress={this.state.satmath_progress} />
                                    <div className="gpa-num">{this.state.userInfo.satmath}</div>
                                    <div className="stat-title">SATMATH</div>
                                </div>
                                <div className="gpa">
                                    <Progress radius={60} stroke={10} progress={this.state.satebrw_progress} />
                                    <div className="gpa-num">{this.state.userInfo.satebrw}</div>
                                    <div className="stat-title">SATEBRW</div>
                                </div>
                                <div className="gpa">
                                    <Progress radius={60} stroke={10} progress={this.state.actcomposite_progress} />
                                    <div className="gpa-num">{this.state.userInfo.actcomposite}</div>
                                    <div className="stat-title">ACTCOMP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;