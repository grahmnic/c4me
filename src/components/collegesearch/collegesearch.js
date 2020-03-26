import React from 'react';
import './collegesearch.scss';

class Collegesearch extends React.Component {

    componentDidMount() {

    }

    render() {
        return(
            <div>

                <div className="mobileFilter">

                </div>

                <div className="searchSideBar">
                    
                    <div className="filterSB">
                        <div className="clear-all">
                            Clear All
                        </div>
                        <div className="location">
                            <div className="headingSB">Location</div>
                            <select>
                                <option value="0">Select Region</option>
                                <option value="West">West</option>
                                <option value="Midwest">Midwest</option>
                                <option value="Northeast">Northeast</option>
                                <option value="South">South</option>
                            </select>
                            <div className="headingSB">State</div>
                            <input list="states"></input>
                            <datalist className="stateSelect" id="states">
                                <option value="Alabama"></option>
                                <option value="Alaska"></option>
                                <option value="Arizona"></option>
                                <option value="Arkansas"></option>
                                <option value="California"></option>
                                <option value="Colorado"></option>
                                <option value="Connecticut"></option>
                                <option value="Delaware"></option>
                                <option value="Florida"></option>
                                <option value="Georgia"></option>
                                <option value="Hawaii"></option>
                                <option value="Idaho"></option>
                                <option value="Illinois"></option>
                                <option value="Iowa"></option>
                                <option value="Kansas"></option>
                                <option value="Kentucky"></option>
                                <option value="Louisiana"></option>
                                <option value="Maine"></option>
                                <option value="Maryland"></option>
                                <option value="Massachusetts"></option>
                                <option value="Michigan"></option>
                                <option value="Minnesota"></option>
                                <option value="Mississippi"></option>
                                <option value="Missouri"></option>
                                <option value="Montana"></option>
                                <option value="Nebraska"></option>
                                <option value="Nevada"></option>
                                <option value="New Hampshire"></option>
                                <option value="New Jersey"></option>
                                <option value="New Mexico"></option>
                                <option value="New York"></option>
                                <option value="North Carolina"></option>
                                <option value="North Dakota"></option>
                                <option value="Ohio"></option>
                                <option value="Oklahoma"></option>
                                <option value="Oregon"></option>
                                <option value="Pennsylvania"></option>
                                <option value="Rhode Island"></option>
                                <option value="South Carolina"></option>
                                <option value="South Dakota"></option>
                                <option value="Tennessee"></option>
                                <option value="Texas"></option>
                                <option value="Utah"></option>
                                <option value="Vermont"></option>
                                <option value="Virginia"></option>
                                <option value="Washington"></option>
                                <option value="West Virginia"></option>
                                <option value="Wisconsin"></option>
                                <option value="Wyoming"></option>
                            </datalist>

                        </div>
                        <div className="institType">
                            <div className="headingSB">Institution Type</div>
                            <li className="check">
                                <input type="checkbox" name="Public"></input>
                                <label for="Public">Public</label>
                            </li>
                            <li className="check">
                                <input type="checkbox" name="Private"></input>
                                <label for="Private">Private</label>
                            </li>
                        </div>
                        <div className="cost">
                            <div className="headingSB">Cost</div>
                            <input className="slider" type="range" min="1000" max="60000"></input>
                        </div>
                        <div className="majors">
                            <div className="headingSB">Majors</div>
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

                <div className="searchMain">
                    This is searchmain
                </div>
            </div>
        );
    }
}

export default Collegesearch;