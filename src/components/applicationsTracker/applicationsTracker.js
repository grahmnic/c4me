import React from 'react';
import './applicationsTracker.scss';
import RangeSlider from '../slider/slider';
import Select from '../select/select.js';
import ProfileApp from './profileApp.js';
import MultiSelect from '../select/multiselect.js';

class ApplicationsTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strict: false,
            collegename: "",
            toggleCollegeRange: false,
            collegeRange: [2014,2018],
            sorting: null,
            isAscending: false,
            highSchoolOptions: [],
            profiles: []
        }

        this.highSchoolList = React.createRef();
        this.applicationInput = React.createRef();
    }

    componentDidMount() {
        this.fetchHS();
    }

    handleStrict = () => {
        this.setState({
            strict: !this.state.strict
        });
    }

    handleCollegeName = (e) => {
        this.setState({
            collegename: e.target.value
        });
    }

    toggleCollegeRange = () => {
        this.setState({ toggleCollegeRange: !this.state.toggleCollegeRange });
    }

    handleCollegeRange = (update) => {
        this.setState({ collegeRange: update });
    }

    fetchHS = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallhs', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error in fetching data');
                }
            }).then(data => {
                let data_arr = [];
                for(var i = 0; i < data.length; i++) {
                    data_arr.push({key: data[i], value: data[i]});
                }
                this.setState({
                    highSchoolOptions: data_arr
                });
            }).catch(error => {
                this.props.createPopup({
                    title: "HIGHSCHOOL ERROR",
                    content: "Error: " + error
                });
            });
    }

    fetchProfiles = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                isStrict: this.state.strict,
                collegename: this.state.collegename,
                lowcollegeclass: this.state.collegeRange[0],
                highcollegeclass: this.state.collegeRange[1],
                highschools: this.highSchoolList.current.value,
                appstatuses: this.applicationInput.current.value
            }
        };
        fetch('https://chads4us.herokuapp.com/apptracker', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error in fetching data');
                }
            }).then(data => {
                this.setState({
                    highSchoolOptions: data
                });
            }).catch(error => {
                this.props.createPopup({
                    title: "APPLICATION TRACKER ERROR",
                    content: "Error: " + error
                });
            });
    }

    toggleScatterplot = () => {
        this.setState({ scatterplot: !this.state.scatterplot });
    }

    render() {
        const applicationOptions = [
            {key: "Accepted", value: "accepted"},
            {key: "Denied", value: "denied"},
            {key: "Pending", value: "pending"},
            {key: "Deferred", value: "deferred"},
            {key: "Withdrawn", value: "withdrawn"},
            {key: "Waitlisted", value: "wait-listed"}
        ];

        let profiles = [];
        for(var i = 0; i < this.state.profiles.length; i++) {
            profiles.push({
                id: i,
                value: this.state.profiles[i]
            });
        }

        let profileList = profiles.map((e) =>
            <div className="profileCard" key={e.id} style={{ animationDelay: (e.id * 0.05).toString() + "s"}}>
                <ProfileApp data={e.value}/>
            </div>
        );

        return(
            <div className="atWrapperWrapper">
                <div className="atWrapper">
                    <div className="atPanel">
                        <div className="atFilter">
                            <div className="atHeaderWrapper">
                                <div className="atHeader">
                                    Applications Tracker
                                </div>
                                <div className="toggleWrapper ">
                                    <div className="strictTitle">STRICT MODE</div>
                                    <label className="switch strictSwitch">'
                                        <input type="checkbox"  defaultChecked={this.state.strict}  onChange={this.handleStrict}/>
                                        <span className="toggle atToggle round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="atH1">College Name</div>
                            <div className="atFilterInput">
                                <input className="nameInput" type="text" value={this.state.collegename} onChange={this.handleCollegeName} placeholder="College Name"/>
                            </div>
                            <div className="atH1">College Class</div>
                            <div className={`atRange range ${this.state.toggleCollegeRange ? "" : "atdisabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleCollegeRange ? "" : "atdisabledRangeInput"}`}>
                                    <div className="atRangeHeader">{this.state.collegeRange[0]} - {this.state.collegeRange[1]}</div>
                                    <RangeSlider onUpdate={this.handleCollegeRange} ops={{
                                        defaultValues: [2014,2018],
                                        min: 2000,
                                        max: 2020,
                                        mode: 2,
                                        step: 1,
                                        ticks: 5
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleCollegeRange}></i></div>
                            </div>
                            <div className="atH1">High Schools</div>
                            <MultiSelect ref={this.highSchoolInput} options={this.state.highSchoolOptions} />
                            <div className="atH1">Application Status</div>
                            <MultiSelect ref={this.applicationInput} options={applicationOptions} />
                        </div>
                        <div className="atGrid">
                            {profileList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationsTracker;