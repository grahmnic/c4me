import React from 'react';
import DataList from '../select/datalist.js';
import './similarhighschools.scss';

class SHS extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            highschoolname: "",
            highschools: []
        }
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
        alert(this.highschoolname.getInstance().getValue());
    }

    render() {
        const highschools = [
            "Bronx Science",
            "Stuyveyson",
            "Bayside Highschool",
            "Deez Nuts"
        ];

        return(
            <div className="hsPanel">
                <div className="hsInnerPanel">
                    <div className="hsSearch">
                        <div className="hsInputWrapper">
                            <DataList ref={this.setNameRef} options={highschools} placeholder="Enter a highschool" fontSize="1.75rem" padding="10px 15px" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SHS;