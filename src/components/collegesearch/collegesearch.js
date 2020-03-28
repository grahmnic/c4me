import React from 'react';
import './collegesearch.scss';
import CollegeResult from '../collegeResult/collegeResult';

class Collegesearch extends React.Component {

    componentDidMount() {

    }

    render() {

        return(
            <div className="searchContent">

                {/* Mobile Sidebar content*/}
                <div className="mobileFilter">
                    <div className="mbFilterWrap">
                        <div className="showRsltsWrap">
                            Showing results...
                        </div>
                        <div className="filterBtnWrap">
                            <button className="filterBtn">Filter and Sort</button>
                        </div>
                    </div>
                    
                </div>

                {/* Sidebar content*/}
                <div className="searchSideBar">   
                    <div className="filterSB">
                        <div className="clear-all">
                            <button>Clear All</button>
                        </div>
                        <div className="location">
                            <div className="headingSB">Location</div>
                            <select className="selectSB">
                                <option value="0">Any Region</option>
                                <option value="West">West</option>
                                <option value="Midwest">Midwest</option>
                                <option value="Northeast">Northeast</option>
                                <option value="South">South</option>
                            </select>
                            <div className="headingSB">State</div>
                            <select className="selectSB" id="stateSelect">
                                <option value="">Any State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">Dist of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div className="institType">
                            <div className="headingSB">Institution Type</div>
                            <li className="check">
                                <input type="checkbox" id="Public" name="Public"></input>
                                <label htmlFor="Public">Public</label>
                            </li>
                            <li className="check">
                                <input type="checkbox" id="Private" name="Private"></input>
                                <label htmlFor="Private">Private</label>
                            </li>
                        </div>
                        <div className="cost">
                            <div className="headingSB">Cost</div>
                            <input className="slider" type="range" min="1000" max="60000"></input>
                        </div>
                        <div className="majors">
                            <div className="headingSB">Majors</div>
                            <select>
                                <option value="">Select Majors</option>
                            </select>
                        </div>
                        <div className="selectivity">
                            <div className="headingSB">Admission Rate</div>
                            <select className="dropdown">
                                <option value="">Select a Range</option>
                                <option value="85">	85% - 100% </option>
                                <option value="65"> 65% - 85%</option>
                                <option value="45"> 45% - 65%</option>
                                <option value="20"> 20% - 45%</option>
                                <option value="0"> &#60; 20% </option>
                            </select>
                        </div>
                        <div className="testScores">
                            <div className="headingSB">Test Scores</div>
                            <div>
                                <p>SAT Composite</p>
                                <input className="slider" type="range"></input>
                            </div>
                            <div>
                                <p>ACT</p>
                                <input className="slider" type="range"></input>
                            </div>
                        </div>
                        <div className="population">
                            <div className="headingSB">Population</div>
                            <select className="dropdown">
                                <option value="">Select a Range</option>
                                <option value="<2000">	&#60; 2,000 </option>
                                <option> 2,000 - 6,000</option>
                                <option> 6,000 - 15,000</option>
                                <option> 15,000 - 30,000</option>
                                <option value=">30000"> 30,000+ </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Where college search results show up */}
                <div className="searchMain">
                    <div className="cardGrid">
                        <div className="collegeCard">
                            <CollegeResult></CollegeResult>
                        </div>
                        <div className="collegeCard">
                            <CollegeResult></CollegeResult>
                        </div>
                        <div className="collegeCard"><CollegeResult></CollegeResult></div>
                        <div className="collegeCard"><CollegeResult></CollegeResult></div>
                        <div className="collegeCard"><CollegeResult></CollegeResult></div>
                        <div className="collegeCard"><CollegeResult></CollegeResult></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Collegesearch;