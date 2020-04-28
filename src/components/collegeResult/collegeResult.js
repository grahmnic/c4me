import React from 'react';

import Progress from '../profile/progress/progress.js';
import './collegeResult.scss';


class CollegeResult extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
    }

    componentDidMount() {

    }

    render() {
        const score = this.props.data.score ?                          
        <div className="collegeDetailRank">
            <Progress radius={50} stroke={5} strokeColor="white" colorScale={true} progress={this.props.data.score} />
            <div className="collegeRecScore">{this.props.data.score}</div>
        </div> : null;

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
                            <div className="collegeTypeRate"><strong>Institution Type:</strong> {this.props.data.institutiontype ? this.props.data.institutiontype : "n/a"}
                            </div>
                            <div><strong>Admission Rate:</strong> {this.props.data.admissionrate ? (this.props.data.admissionrate * 100) + "%" : "n/a"}</div>
                        </div>
                        <div className="collegeDetailWrap">
                            <div className="collegeDetailText">
                                <div><strong>Ranking:</strong> {this.props.data.ranking}</div>
                                <div><strong>Cost in-state:</strong> {this.props.data.costofattendanceinstate ? this.props.data.costofattendanceinstate : 'n/a'}</div>
                                <div><strong>Cost out-of-state:</strong> {this.props.data.costofattendanceoutofstate ? this.props.data.costofattendanceoutofstate : 'n/a'}</div>
                                <div><strong>Student Population:</strong> {this.props.data.size ? this.props.data.size : 'n/a'}</div>
                                <a className="popoutLink">>> More info </a> 
                            </div>
                            {score}
                        </div>   
                    </div>                   
                </div>
            </div>
            
        );
    }
}

export default CollegeResult;