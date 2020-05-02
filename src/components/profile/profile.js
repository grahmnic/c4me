import React from 'react';
import './profile.css';
import { Redirect } from 'react-router-dom';
import Progress from './progress/progress.js';
import profileImage from '../../assets/images/ralph.jpg';
import ManageApplications from '../manageApplications/manageApplications.js';
import DataList from '../select/datalist.js';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.errorStr = "";

        this.state = {
            userInfo: {},
            old_userInfo: {},
            gpa_progress: 0,
            satmath_progress: 0,
            satebrw_progress: 0,
            actcomposite_progress: 0,
            editingInfo: false,
            editingStats: false,
            new_password: null,
            viewStats: true,
            manageApps: false,
            highschoolOptions: []
        }

        this.handleCollegeClass = this.handleCollegeClass.bind(this);
        this.handleMajor1 = this.handleMajor1.bind(this);
        this.handleMajor2 = this.handleMajor2.bind(this);
        this.handleResidenceState = this.handleResidenceState.bind(this);
        this.handleHighschoolName = this.handleHighschoolName.bind(this);
        this.handleHighschoolCity = this.handleHighschoolCity.bind(this);
        this.handleHighschoolState = this.handleHighschoolState.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.saveEdits = this.saveEdits.bind(this);
        this.toggleEditStats = this.toggleEditStats.bind(this);

        this.handleACTENG = this.handleACTENG.bind(this);
        this.handleACTMATH = this.handleACTMATH.bind(this);
        this.handleACTREAD = this.handleACTREAD.bind(this);
        this.handleACTSCI = this.handleACTSCI.bind(this);
        this.handleSATLIT = this.handleSATLIT.bind(this);
        this.handleSATUSH = this.handleSATUSH.bind(this);
        this.handleSATWH = this.handleSATWH.bind(this);
        this.handleSATMATHI = this.handleSATMATHI.bind(this);
        this.handleSATMATHII = this.handleSATMATHII.bind(this);
        this.handleSATECOB = this.handleSATECOB.bind(this);
        this.handleSATMOLB = this.handleSATMOLB.bind(this);
        this.handleSATCHEM = this.handleSATCHEM.bind(this);
        this.handleSATPHY = this.handleSATPHY.bind(this);
        this.handleAPS = this.handleAPS.bind(this);
        this.handleGPA = this.handleGPA.bind(this);
        this.handleSATMATH = this.handleSATMATH.bind(this);
        this.handleSATEBRW = this.handleSATEBRW.bind(this);
        this.handleACTCOMP = this.handleACTCOMP.bind(this);

        this.toggleViewStats = this.toggleViewStats.bind(this);
        this.toggleManageApps = this.toggleManageApps.bind(this);
        this.checkInfo = this.checkInfo.bind(this);
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
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        if (localStorage.getItem("user")) {
            
            fetch('https://chads4us.herokuapp.com/profile/' + localStorage.getItem("user"), requestOptions)
            .then(data => {
                if(data.status !== 200) {
                    data.json().then(res => {
                        this.props.createPopup({
                            title: "PROFILE ERROR",
                            content: "No such user exists."
                        });
                    });
                } else {
                    data.json().then(res => {
                        this.setState({
                            userInfo: res,
                            old_userInfo: res
                        });
                    });
                }
            });
        }

        fetch('https://chads4us.herokuapp.com/getallhs/', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.setState({
                            highschoolOptions: data
                        });
                    });
                } else {
                    this.props.createPopup({
                        title: "High School Name Error",
                        content: "Error in getting high school name."
                    });
                }
            });
    }

    setHSNameRef = (ref) => {
        this.highschoolname = ref;
    }

    checkInfo() {
        let hasError = false;
        let errorString = "Your profile has errors: \n";
        if (this.state.userInfo.gpa != null && (this.state.userInfo.gpa > 4.0 || this.state.userInfo.gpa < 0)) {
            errorString += "Your GPA value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satmath != null && (this.state.userInfo.satmath > 800 || this.state.userInfo.satmath < 0)) {
            errorString += "Your SAT Math value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satebrw != null && (this.state.userInfo.satebrw > 800 || this.state.userInfo.satebrw < 0)) {
            errorString += "Your SAT EBRW value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satmath != null && (this.state.userInfo.actcomposite > 32 || this.state.userInfo.actcomposite < 0)) {
            errorString += "Your ACT Composite value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.actenglish != null && (this.state.userInfo.actenglish > 75 || this.state.userInfo.actenglish < 0)) {
            errorString += "Your ACT English value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.actmath != null && (this.state.userInfo.actmath > 60 || this.state.userInfo.actmath < 0)) {
            errorString += "Your ACT Math value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.actreading != null && (this.state.userInfo.actreading > 40 || this.state.userInfo.actreading < 0)) {
            errorString += "Your ACT Reading value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.actscience != null && (this.state.userInfo.actscience > 40 || this.state.userInfo.actscience < 0)) {
            errorString += "Your ACT Science value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satliterature != null && (this.state.userInfo.satliterature > 800 || this.state.userInfo.satliterature < 0)) {
            errorString += "Your SAT Literature value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.satushistory != null && (this.state.userInfo.satushistory > 800 || this.state.userInfo.satushistory < 0)) {
            errorString += "Your SAT US History value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satworldhistory != null && (this.state.userInfo.satworldhistory > 800 || this.state.userInfo.satmath < 0)) {
            errorString += "Your SAT World History value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.satmath1 != null && (this.state.userInfo.satmath1 > 800 || this.state.userInfo.satmath1 < 0)) {
            errorString += "Your SAT Math I value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satmath2 != null && (this.state.userInfo.satmath2 > 800 || this.state.userInfo.satmath2 < 0)) {
            errorString += "Your SAT Math II value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.satecobio != null && (this.state.userInfo.satecobio > 800 || this.state.userInfo.satecobio < 0)) {
            errorString += "Your SAT Ecological Biology value is invalid. \n";
            hasError = true;
        } 
        if (this.state.userInfo.satmolbio != null && (this.state.userInfo.satmolbio > 800 || this.state.userInfo.satmolbio < 0)) {
            errorString += "Your SAT Molecular Biology value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.satchem != null && (this.state.userInfo.satchem > 800 || this.state.userInfo.satchem < 0)) {
            errorString += "Your SAT Chemistry value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.satphysics != null && (this.state.userInfo.satphysics > 800 || this.state.userInfo.satphysics < 0)) {
            errorString += "Your SAT Physics value is invalid. \n";
            hasError = true;
        }
        if (this.state.userInfo.numpassedaps != null && (this.state.userInfo.numpassedaps > 20 || this.state.userInfo.numpassedaps < 0)) {
            errorString += "Your 'Number of APs' value is invalid.\n";
            hasError = true;
        }
        if (this.state.userInfo.collegeclass != null && (parseInt(this.state.userInfo.collegeclass) > 2030 || parseInt(this.state.userInfo.collegeclass) < 2016)) {
            errorString += "Your College Class value is invalid.\n";
            hasError = true;
        }

        if ((this.state.userInfo.highschoolname === "" || this.state.userInfo.highschoolname === null) && (this.state.userInfo.gpa != null)) {
            errorString += "Cannot have gpa with no highschool.\n";
            hasError = true;
        }

        if (hasError) {
            this.errorStr = errorString;
            return true;
        }

        return false;
        
    }


    saveEdits(editReason) {

        if(JSON.stringify(this.state.userInfo) !== JSON.stringify(this.state.old_userInfo)) {

            //check for errors first

            if(!this.checkInfo()) {
                this.props.createPopup({
                    title: "SAVING EDITS",
                    content: "Your profile edits are being saved."
                });
                var userInfo = this.state.userInfo;
                userInfo.password = this.state.new_password;
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(userInfo)
                };
                console.log(requestOptions);
    
                fetch('https://chads4us.herokuapp.com/editprofile/' + localStorage.getItem("user"), requestOptions)
                .then(data => {
                    if(data.status !== 200) {
                        data.json().then(res => {
                            this.props.createPopup({
                                title: "PROFILE ERROR",
                                content: "Error: " + res.error
                            });
                        });
                    } else {
                        this.props.createPopup({
                            title: "PROFILE UPDATED",
                            content: "Your " + editReason + " has been successfully updated."
                        });
                    }
                });
            } else {
                console.log(this.state);

                this.props.createPopup({
                    title: "Error",
                    content: this.errorStr
                });
            }
            
        }
    }

    toggleEditMode() {
        if(this.state.editingInfo) {
            this.saveEdits("profile information");
        }
        this.setState({
            editingInfo: !this.state.editingInfo
        });
    }

    toggleEditStats() {
        if(this.state.editingStats) {
            this.saveEdits("academic information");
        }
        this.setState({
            editingStats: !this.state.editingStats
        });
    }

    toggleViewStats() {
        console.log(this.state);
        this.setState({
            viewStats: true,
            manageApps: false
        });
    }

    toggleManageApps() {
        console.log(this.state);
        this.setState({
            viewStats: false,
            manageApps: true
        });
    }

    handleCollegeClass(e) {
        this.setState({ userInfo: { ...this.state.userInfo, collegeclass: e.target.value} });
    }

    handleMajor1(e) {
        this.setState({ userInfo: { ...this.state.userInfo, major1: e.target.value}})
    }

    handleMajor2(e) {
        this.setState({ userInfo: { ...this.state.userInfo, major2: e.target.value}})
    }

    handleHighschoolName(e) {
        this.setState({ userInfo: { ...this.state.userInfo, highschoolname: e.target.value}})
    }
    handleHighschoolCity(e) {
        this.setState({ userInfo: { ...this.state.userInfo, highschoolcity: e.target.value}})
    }
    handleHighschoolState(e) {
        this.setState({ userInfo: { ...this.state.userInfo, highschoolstate: e.target.value}})
    }
    handleResidenceState(e) {
        this.setState({ userInfo: { ...this.state.userInfo, residencestate: e.target.value}})
    }

    handleACTENG(e) {this.setState({ userInfo: { ...this.state.userInfo, actenglish: e.target.value}})}
    handleACTMATH(e) {this.setState({ userInfo: { ...this.state.userInfo, actmath: e.target.value}})}
    handleACTREAD(e) {this.setState({ userInfo: { ...this.state.userInfo, actreading: e.target.value}})}
    handleACTSCI(e) {this.setState({ userInfo: { ...this.state.userInfo, actscience: e.target.value}})}
    handleSATLIT(e) {this.setState({ userInfo: { ...this.state.userInfo, satliterature: e.target.value}})}
    handleSATUSH(e) {this.setState({ userInfo: { ...this.state.userInfo, satushistory: e.target.value}})}
    handleSATWH(e) {this.setState({ userInfo: { ...this.state.userInfo, satworldhistory: e.target.value}})}
    handleSATMATHI(e) {this.setState({ userInfo: { ...this.state.userInfo, satmath1: e.target.value}})}
    handleSATMATHII(e) {this.setState({ userInfo: { ...this.state.userInfo, satmath2: e.target.value}})}
    handleSATECOB(e) {this.setState({ userInfo: { ...this.state.userInfo, satecobio: e.target.value}})}
    handleSATMOLB(e) {this.setState({ userInfo: { ...this.state.userInfo, satmolbio: e.target.value}})}
    handleSATCHEM(e) {this.setState({ userInfo: { ...this.state.userInfo, satchem: e.target.value}})}
    handleSATPHY(e) {this.setState({ userInfo: { ...this.state.userInfo, satphysics: e.target.value}})}
    handleAPS(e) {this.setState({ userInfo: { ...this.state.userInfo, numpassedaps: e.target.value}})}
    handleGPA(e) {this.setState({ userInfo: { ...this.state.userInfo, gpa: e.target.value}})}
    handleSATMATH(e) {this.setState({ userInfo: { ...this.state.userInfo, satmath: e.target.value}})}
    handleSATEBRW(e) {this.setState({ userInfo: { ...this.state.userInfo, satebrw: e.target.value}})}
    handleACTCOMP(e) {this.setState({ userInfo: { ...this.state.userInfo, actcomposite: e.target.value}})}

    render() {
        if(!localStorage.getItem("user")) {
            return (
                <Redirect to="/login" />
            );
        } else {
            var infoSection =                 
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
            </div>;
            if(this.state.editingInfo) {
                infoSection = 
                <div className="user-info">
                    <div>
                        <div>COLLEGE CLASS</div>
                        <input value={this.state.userInfo.collegeclass} type="text" onChange={this.handleCollegeClass}/>
                    </div>
                    <div>
                        <div>MAJORS</div>
                        <input value={this.state.userInfo.major1} type="text" onChange={this.handleMajor1}/>
                        <input value={this.state.userInfo.major2} type="text" onChange={this.handleMajor2}/>
                    </div>
                    <div>
                        <div>STATE</div>
                        <input value={this.state.userInfo.residencestate} type="text" onChange={this.handleResidenceState}/>
                    </div>
                    <div>
                        <div>HIGHSCHOOL</div>
                        {/* <input value={this.state.userInfo.highschoolname} type="text" onChange={this.handleHighschoolName}/> */}
                        <DataList autofill={false} ref={this.setHSNameRef} options={this.state.highschoolOptions}
                            placeholder="High School Name"
                            fontSize="1rem"
                            padding="2px"> 
                        </DataList>
                    </div>
                    <div>
                        <div>H.S. LOCATION</div>
                        <input value={this.state.userInfo.highschoolcity} type="text" onChange={this.handleHighschoolCity}/>
                        <input value={this.state.userInfo.highschoolstate} type="text" onChange={this.handleHighschoolState}/>
                    </div>
                </div>;
            }
            var statRows = 
            <div className="stat-table">
                <div className="stat-row"> 
                    <div>ACT ENGLISH</div>
                    <div>{this.state.userInfo.actenglish}</div>
                </div>
                <div className="stat-row">
                    <div>ACT MATH</div>
                    <div>{this.state.userInfo.actmath}</div>
                </div>
                <div className="stat-row">
                    <div>ACT READING</div>
                    <div>{this.state.userInfo.actreading}</div>
                </div>
                <div className="stat-row">
                    <div>ACT SCIENCE</div>
                    <div>{this.state.userInfo.actscience}</div>
                </div>
                <div className="stat-row">
                    <div>SAT LITERATURE</div>
                    <div>{this.state.userInfo.satliterature}</div>
                </div>
                <div className="stat-row">
                    <div>SAT U.S. HISTORY</div>
                    <div>{this.state.userInfo.satushistory}</div>
                </div>
                <div className="stat-row">
                    <div>SAT WORLD HISTORY</div>
                    <div>{this.state.userInfo.satworldhistory}</div>
                </div>
                <div className="stat-row">
                    <div>SAT MATH I</div>
                    <div>{this.state.userInfo.satmath1}</div>
                </div>
                <div className="stat-row">
                    <div>SAT MATH II</div>
                    <div>{this.state.userInfo.satmath2}</div>
                </div>
                <div className="stat-row">
                    <div>SAT ECOLOGICAL BIOLOGY</div>
                    <div>{this.state.userInfo.satecobio}</div>
                </div>
                <div className="stat-row">
                    <div>SAT MOLECULAR BIOLOGY</div>
                    <div>{this.state.userInfo.satmolbio}</div>
                </div>
                <div className="stat-row">
                    <div>SAT CHEMISTRY</div>
                    <div>{this.state.userInfo.satchem}</div>
                </div>
                <div className="stat-row">
                    <div>SAT PHYSICS</div>
                    <div>{this.state.userInfo.satphysics}</div>
                </div>
                <div className="stat-row">
                    <div>NUMBER OF PASSED APs</div>
                    <div>{this.state.userInfo.numpassedaps}</div>
                </div>
            </div>;

            var progressRow = 
            <div className="progress-flex">
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
            </div>;


            if(this.state.editingStats) {
                statRows = 
                <div className="stat-table">
                <div className="stat-row"> 
                    <div>ACT ENGLISH</div>
                    <input type="number" value={this.state.userInfo.actenglish} onChange={this.handleACTENG}/>
                </div>
                <div className="stat-row">
                    <div>ACT MATH</div>
                    <input type="number" value={this.state.userInfo.actmath} onChange={this.handleACTMATH}/>
                </div>
                <div className="stat-row">
                    <div>ACT READING</div>
                    <input type="number" value={this.state.userInfo.actreading} onChange={this.handleACTREAD}/>
                </div>
                <div className="stat-row">
                    <div>ACT SCIENCE</div>
                    <input type="number" value={this.state.userInfo.actscience} onChange={this.handleACTSCI}/>
                </div>
                <div className="stat-row">
                    <div>SAT LITERATURE</div>
                    <input type="number" value={this.state.userInfo.satliterature} onChange={this.handleSATLIT}/>
                </div>
                <div className="stat-row">
                    <div>SAT U.S. HISTORY</div>
                    <input type="number" value={this.state.userInfo.satushistory} onChange={this.handleSATUSH}/>
                </div>
                <div className="stat-row">
                    <div>SAT WORLD HISTORY</div>
                    <input type="number" value={this.state.userInfo.satworldhistory} onChange={this.handleSATWH}/>
                </div>
                <div className="stat-row">
                    <div>SAT MATH I</div>
                    <input type="number" value={this.state.userInfo.satmath1} onChange={this.handleSATMATHI}/>
                </div>
                <div className="stat-row">
                    <div>SAT MATH II</div>
                    <input type="number" value={this.state.userInfo.satmath2} onChange={this.handleSATMATHII}/>
                </div>
                <div className="stat-row">
                    <div>SAT ECOLOGICAL BIOLOGY</div>
                    <input type="number" value={this.state.userInfo.satecobio} onChange={this.handleSATECOB}/>
                </div>
                <div className="stat-row">
                    <div>SAT MOLECULAR BIOLOGY</div>
                    <input type="number" value={this.state.userInfo.satmolbio} onChange={this.handleSATMOLB}/>
                </div>
                <div className="stat-row">
                    <div>SAT CHEMISTRY</div>
                    <input type="number" value={this.state.userInfo.satchem} onChange={this.handleSATCHEM}/>
                </div>
                <div className="stat-row">
                    <div>SAT PHYSICS</div>
                    <input type="number" value={this.state.userInfo.satphysics} onChange={this.handleSATPHY}/>
                </div>
                <div className="stat-row">
                    <div>NUMBER OF PASSED APs</div>
                    <input type="number" value={this.state.userInfo.numpassedaps} onChange={this.handleAPS}/>
                </div>
            </div>;

            progressRow =
            <div className="progress-flex">
                <div className="gpa">
                    <Progress radius={60} stroke={10} progress={this.state.gpa_progress} />
                    <input className="gpa-num" value={this.state.userInfo.gpa} onChange={this.handleGPA}/>
                    <div className="stat-title">GPA</div>
                </div>
                <div className="gpa">
                    <Progress radius={60} stroke={10} progress={this.state.satmath_progress} />
                    <input className="gpa-num" value={this.state.userInfo.satmath} onChange={this.handleSATMATH}/>
                    <div className="stat-title">SATMATH</div>
                </div>
                <div className="gpa">
                    <Progress radius={60} stroke={10} progress={this.state.satebrw_progress} />
                    <input className="gpa-num" value={this.state.userInfo.satebrw} onChange={this.handleSATEBRW}/>
                    <div className="stat-title">SATEBRW</div>
                </div>
                <div className="gpa">
                    <Progress radius={60} stroke={10} progress={this.state.actcomposite_progress} />
                    <input className="gpa-num" value={this.state.userInfo.actcomposite} onChange={this.handleACTCOMP}/>
                    <div className="stat-title">ACTCOMP</div>
                </div>
            </div>;
            }

            if (this.state.viewStats) {
                var content = 
                <div className="content-card">
                    <div className="progress-section">
                        <div className="progress-title">
                            <div className="progress-title-content">
                                <div className="statsTab">
                                    <div onClick={this.toggleViewStats}>YOUR STATISTICS</div>
                                </div>
                                <div className="manageAppsTab" onClick={this.toggleManageApps}>MANAGE APPLICATIONS</div>
                            </div>
                            
                        </div>
                        <div className="progress-stats">
                        {progressRow}
                    </div>
                    </div>
                    <div className="divider"></div>
                    <div className="stats">
                        <div className="editStats">
                            <i className="far fa-edit" onClick={this.toggleEditStats}></i>
                        </div>
                        {statRows}
                    </div>
                </div>
            } else if (this.state.manageApps) {
                content =
                <div className="content-card">
                    <div className="progress-title-content">
                        <div className="statsTab">
                            <div onClick={this.toggleViewStats}>YOUR STATISTICS</div>
                        </div>
                        <div className="manageAppsTab" onClick={this.toggleManageApps}>MANAGE APPLICATIONS</div>
                    </div>
                    <ManageApplications createPopup={this.props.createPopup}/>
                </div>
            }
            
            return(
                <div className="profile">
                    <div className="profile-content">
                        <div className="side-card">
                            <div className="info-card">
                                <div className="info-banner">
                                    <div className="info-edit">
                                        <i className="fas fa-user-edit" onClick={this.toggleEditMode}></i>
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
                                    {infoSection}
                                </div>
                            </div>
                            <div className="menu-card">

                            </div>
                        </div>
                        
                       {content}
                    </div>
                </div>
            );
        }
    }
}

export default Profile;