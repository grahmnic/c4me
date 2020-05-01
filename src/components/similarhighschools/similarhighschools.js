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

    fetchHS = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallhs', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    response.json().then((data) => {
                        this.setState({
                            highschoolOptions: data
                        });
                    });
                } else {
                    this.props.createPopup({
                        title: "HIGHSCHOOL OPS ERROR",
                        content: "Error in fetching highschool names"
                    });
                }
            });
    }

    render() {

        console.log(this.state.highschoolOptions);
        return(
            <div className="hsPanel">
                <div className="hsInnerPanel">
                    <div className="hsSearch">
                        <div className="hsInputWrapper">
                            <DataList ref={this.setNameRef} options={this.state.highschoolOptions} placeholder="Enter a highschool" fontSize="1.75rem" padding="10px 15px" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SHS;