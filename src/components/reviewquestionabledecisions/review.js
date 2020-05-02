import React from 'react';
import './review.scss';

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
            if(data.status !== 200) {
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
            if(data.status !== 200) {
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

    validateDecision = (name, user) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                collegename: name,
                username: user
            })
        };
        fetch('https://chads4us.herokuapp.com/validatedecision/', requestOptions)
        .then(data => {
            if(data.status !== 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "VALIDATION ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                this.props.createPopup({
                    title: "VALIDATED APPLICATION",
                    content: "The application has been accepted."
                });
                this.getApplications();
            }
        });
    }

    render() {
        const applicationList = this.state.applications.map((e) => 
        <div key={e.username + e.collegename} className="application">
            <div style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => this.fetchProfile(e.username)}>{e.username}</div>
            <div>{e.collegename}</div>
            <div>{e.status}</div>
            <button onClick={() => this.validateDecision(e.collegename, e.username)}><i className="fas fa-check"></i></button>
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