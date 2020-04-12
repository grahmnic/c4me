import React from 'react';

import './collegeResult.scss';


class CollegeResult extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="collegeResult">
                <div className="collegeResultWrap">
                    <div className="collegeHeading">
                        
                        {/* <div className="collegeHeadingText">
                            <div className="collegeLogoWrap">
                                <img className="collegeLogo" src={collegeLogo} alt="LOGO error"></img>
                            </div>
                        </div>                         */}
                    </div>
                    <div className="separator"></div>
                    <div className="collegeDetail">
                        <h2 className="collegeTitle">{this.props.data.collegename}</h2>
                        {this.props.data.city ? <div>{this.props.data.city}, {this.props.data.state}</div> : null}
                        <div className="collegeTypeRateWrap">
                            <div className="collegeTypeRate">{this.props.data.institutiontype ? this.props.data.institutiontype + "Institution" : null}
                            </div>
                            <div>{this.props.data.admission_rate ? this.props.data.admission_rate + " Acceptance Rate" : null}</div>
                        </div>
                        <div className="collegeDetailWrap">
                            <div className="collegeDetailText">
                                <div>Ranking: {this.props.data.ranking}</div>
                                <div>Cost: {this.props.data.costofattendanceinstate}$</div>
                                <div>Student Population: {this.props.data.population ? this.props.data.population : 'n/a'}</div>
                                <a className="popoutLink">>> More info </a> 
                            </div>
                            <div className="collegeDetailRank">
                                <p className="collegeRecScore">50</p>
                            </div>
                        </div>   
                    </div>                   
                </div>
            </div>
            
        );
    }
}

export default CollegeResult;