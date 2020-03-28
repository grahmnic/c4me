import React from 'react';
import collegeIMG from '../../assets/images/college.jpg'
import collegeLogo from '../../assets/images/collegelogo.jpg';

import './collegeResult.scss';


class CollegeResult extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Harvard College",
            institution_type: "Private",
            ranking: "1",
            cost: "$60,000",
            admission_rate: "5%",
            population: "23,000",
            avgACT: "31",
            avgSAT: "1400",
            satMath: "770",
            satEBRW: "700",
            debt: "",
            location: "",
            city: "Cambridge",
            state: "MA",
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="collegeResult">
                <div className="collegeResultWrap">
                    <div className="collegeHeading">
                        <img className="collegeImage" src={collegeIMG} alt="College IMG not found"></img>
                        <div className="collegeHeadingText">
                            <div className="collegeLogoWrap">
                                <img className="collegeLogo" src={collegeLogo} alt="LOGO error"></img>
                            </div>
                            <h2 className="collegeTitle">{this.state.name}</h2>
                            <div>{this.state.city}, {this.state.state}</div>
                        </div>                        
                    </div>
                        
                    <div className="collegeDetail">
                        <div className="collegeTypeRateWrap">
                            <div className="collegeTypeRate">{this.state.institution_type} Institution | {this.state.admission_rate} Acceptance Rate</div>
                        </div>
                        <div className="collegeDetailWrap">
                            <div className="collegeDetailText">
                                <div>Ranking: {this.state.ranking}</div>
                                <div>Cost: {this.state.cost}</div>
                                <div>Student Population: {this.state.population}</div>
                            </div>
                            <div className="collegeDetailRank">
                                <p className="collegeRecScore">5</p>
                            </div>
                        </div>    
                    </div>

                    <div className="moreInfo">
                        <div className="popoutLink">>> More info </div>
                    </div>
                    
                </div>
            </div>
            
        );
    }
}

export default CollegeResult;