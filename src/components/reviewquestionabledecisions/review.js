import React from 'react';
import './review.scss';
import profileImage from '../../assets/images/ralph.jpg';

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: []
        }
    }

    componentDidMount() {
        this.getApplications();
    }

    getApplications = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/reviewdecisions', requestOptions)
        .then(data => {
            if(data.status != 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "APPLICATIONS ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                data.json().then(res => {
                    this.setState({
                        applications: res
                    });
                });
            }
        });
    }

    fetchProfile = (username) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/profile/' + username, requestOptions)
        .then(data => {
            if(data.status != 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "PROFILE FETCH",
                        content: "Error: " + res.error
                    });
                });
            } else {
                data.json().then(res => {
                    this.setState({
                        profile: res
                    });
                });
            }
        });
    }

    validateDecision = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({applicationid: id})
        };
        fetch('https://chads4us.herokuapp.com/validatedecision/', requestOptions)
        .then(data => {
            if(data.status != 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "VALIDATION ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                this.props.createPopup({
                    title: "VALIDATED APPLICATION",
                    content: "Application " + id + " has been accepted."
                });
                this.getApplications();
            }
        });
    }

    render() {
        const applicationList = this.state.applications.map((e) => 
        <div key={e.applicationid} className="application" onClick={() => this.fetchProfile(e.username)}>
            <div>{e.applicationid}</div>
            <div>{e.username}</div>
            <div>{e.collegename}</div>
            <div>{e.status}</div>
            <button onClick={() => this.validateDecision(e.applicationid)}><i class="fas fa-check"></i></button>
        </div>
        );

        let profile = null;
        if(this.state.profile) {
            profile = 
            <div>
                <div>USERNAME: {this.state.profile.username}</div>
                <div>GPA: {this.state.profile.gpa ? this.state.profile.gpa : "n/a"}</div>
                <div>SATMATH: {this.state.profile.satmath ? this.state.profile.satmath : "n/a"}</div>
                <div>SATEBRW: {this.state.profile.satebrw ? this.state.profile.satebrw : "n/a"}</div>
                <div>ACTCOMPOSITE: {this.state.profile.actcomposite ? this.state.profile.actcomposite : "n/a"}</div>
            </div>
        }

        return(
            <div className="reviewWrapper">
                <div className="reviewPanel">
                    <div className="applicationsTitle">Review Questionable Decisions</div>
                    <div className="applicationsWrapper">
                        <div className="applicationsPanel">
                            <div className="applicationHeader">
                                <div>ID</div>
                                <div>USER</div>
                                <div>COLLEGE</div>
                                <div>APPLICATION STATUS</div>
                            </div>
                            {applicationList}
                        </div>

                    </div>
                    <div className="profilePanel fadeInLeft">
                        {profile}
                    </div>
                </div>
            </div>
        );
    }
}

export default Review;