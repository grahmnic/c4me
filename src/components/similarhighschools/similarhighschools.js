import React from 'react';
import DataList from '../select/datalist.js';
import './similarhighschools.scss';

class SHS extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            highschoolname: "",
            highschools: [],
            highschoolOptions: []
        }
    }

    componentDidMount() {
        this.fetchHS();
    }

    setNameRef = (ref) => {
        this.highschoolname = ref;
    }

    handleHighSchoolName = (e) => {
        this.setState({
            highschoolname: e.target.value
        });
    }

    searchHS = () => {
        this.props.createPopup({
            title: "FINDING SIMILAR HS",
            content: "Calculating similarity scores for highschools."
        });
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                highschool: this.highschoolname.getInstance().getValue() ? this.highschoolname.getInstance().getValue().trim() : null
            })
        };
        fetch('https://chads4us.herokuapp.com/findsimilarhs', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.setState({
                            highschools: data
                        });
                    });
                } else {
                    this.props.createPopup({
                        title: "HIGHSCHOOL SEARCH ERROR",
                        content: "Error in searching for highschools."
                    });
                }
            });
    }

    fetchHS = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallhs', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.setState({
                            highschoolOptions: data
                        });
                    });
                } else {
                    this.props.createPopup({
                        title: "HIGHSCHOOL OPS ERROR",
                        content: "Error in fetching highschool names."
                    });
                }
            });
    }

    render() {
        const highschools = this.state.highschools.map((e, index) => 
            <div key={index} className="highschool" style={{animationDelay: (index * 0.05).toString() + "s"}}>
                
                    <strong>{e.hsname}</strong>
                <div className="highschoolInfo">
                    
                    <div>AVG GPA: {e.hsavggpa}</div>
                    <div>Niche Grade: {e.hsnichegrade}</div>
                    <div>AVG SAT: {e.hsavgsat}</div>
                    <div>AVG ACT: {e.avgact}</div>
                    <div>GRAD RATE: {e.gradrate}</div>
                    <div>HS City: {e.hscity}</div>
                    <div>Recommendation Score: {e.score}</div>

                </div>
                
            </div>
        );

        return(
            <div className="hsPanel">
                <div className="hsInnerPanel">
                    <div className="hsSearch">
                        <div className="hsInputWrapper">
                            <DataList autofill={true} ref={this.setNameRef} options={this.state.highschoolOptions} placeholder="Enter a highschool" fontSize="1.75rem" padding="10px 15px" />
                            <button className="hsBtn" onClick={this.searchHS}>SEARCH</button>
                        </div>
                        <div className={`highschools ${this.state.highschools.length ? "hsDisplay" : null}`}>
                            {highschools}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SHS;