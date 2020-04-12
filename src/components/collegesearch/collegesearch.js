import React from 'react';
import './collegesearch.scss';
import CollegeResult from '../collegeResult/collegeResult';
import Select from '../select/select.js';

import {Slider, Handles, Tracks} from 'react-compound-slider';
import {Scrollbars} from 'react-custom-scrollbars';
import RangeSlider from '../slider/slider';
import { thisTypeAnnotation } from '@babel/types';
import { white } from 'color-name';

class Collegesearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collegeData: [],
            isLoading: false,
            error: null,
            page: 1,
            pageLimit: 10,
            admissionsRange: [25, 75],
            satmRange: [400, 600],
            sateRange: [400, 600],
            actRange: [400, 600],
            costRange: [16000,48000],
            rankingRange: [50, 250]
        }
        
        this.handlePage = this.handlePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);

        this.locationInput = React.createRef();
        this.stateInput = React.createRef();
        this.admissionRange = React.createRef();
        this.handleLocationInput = this.handleLocationInput.bind(this);
        this.handleAdmissionRange = this.handleAdmissionRange.bind(this);
    }

    handleLocationInput() {
        alert(this.locationInput.current.getValue());
        alert(this.stateInput.current.getValue());
    }

    handleAdmissionRange(update) {
        this.setState({
            admissionsRange: update
        })
    }

    handleCostRange = (update) => {
        this.setState({
            costRange: update
        })
    }

    handleSATMRange = (update) => {
        this.setState({
            satmRange: update
        })
    }

    handleSATERange = (update) => {
        this.setState({
            sateRange: update
        })
    }

    handleACTRange = (update) => {
        this.setState({
            actRange: update
        })
    }

    handleCostRange = (update) => {
        this.setState({
            costRange: update
        })
    }

    handleRankingRange = (update) => {
        this.setState({
            rankingRange: update
        })
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallcolleges', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error in fetching data');
                }
            }).then(data => {
                this.setState({
                    collegeData: data,
                    isLoading: false
                });
            }).catch(error => {
                this.setState({
                    error: error,
                    loading: false
                });
            });
    }

    renderThumb = () => {
        return (
            <div
                style={{ backgroundColor: `rgba(256,256,256,0.4)` }}/>
        );
    }

    componentWillUnmount() {
        
    }

    nextPage() {
        if(this.state.page * this.state.pageLimit < this.state.collegeData.length) {
            this.setState({page: this.state.page++});
        }
    }

    prevPage() {
        if(this.state.page > 1) {
            this.setState({page: this.state.page--});
        }
    }

    increasePageLimit(e) {
        this.setState({pageLimit: e.target.value})
    }

    handlePage(page) {
        this.setState({page: page});
    }

    render() {

        var colleges = [];
        let pageStart = (this.state.page - 1) * this.state.pageLimit;
        for(var i = pageStart; i < (this.state.collegeData.length < pageStart + this.state.pageLimit ? this.state.collegeData.length : pageStart + this.state.pageLimit); i++) {
            colleges.push({
                id: i,
                value: this.state.collegeData[i]
            })
        }

        console.log(colleges);

        let collegeList = colleges.map((e) =>
            <div className="collegeCard" key={e.id} style={{ animationDelay: ((e.id % 10) * 0.1).toString() + "s"}}>
                <CollegeResult data={e.value}/>
            </div>
        );

        let pageView = [];
        if(this.state.page < 3) {
            pageView = [1,2,3,4,5]
        } else if (this.state.page + 2 >= Math.ceil(this.state.collegeData.length/this.state.pageLimit)) {
            let limit = Math.ceil(this.state.collegeData.length/this.state.pageLimit);
            pageView = [limit-4, limit-3, limit-2, limit-1, limit];
        } else {
            let curr = this.state.page;
            pageView = [curr-2, curr-1, curr, curr+1, curr+2];
        }

        let renderFirstFade = null;
        if(this.state.page > 3) {
            renderFirstFade = <div className="fade">...</div>;
        }

        let renderLastFade = null;
        if(this.state.page + 3 < Math.ceil(this.state.collegeData.length/this.state.pageLimit) ) {
            renderLastFade = <div className="fade">...</div>;
        }

        let renderFirst = null
        if(this.state.page > 3) {
            renderFirst = <div className="first" onClick={() => this.handlePage(1)}><div>1</div></div>;
        }

        let renderLast = null;
        if(this.state.page + 2 < Math.ceil(this.state.collegeData.length/this.state.pageLimit)) {
            renderLast = <div className="last" onClick={() => this.handlePage(Math.ceil(this.state.collegeData.length/this.state.pageLimit))}><div>{Math.ceil(this.state.collegeData.length / this.state.pageLimit)}</div></div>;
        }

        const regions = [
            {key: "Any Region", value: 0},
            {key: "West", value: "West"},
            {key: "Midwest", value: "Midwest"}, 
            {key: "Northeast", value: "Northeast"}, 
            {key: "South", value: "South"}
        ];

        const states = [
            {key: "Any State", value: ""},
            {key: "Alabama", value: "AL"},
            {key: "Alaska", value: "AK"},
            {key: "Arizona", value: "AZ"},
            {key: "Arkansas", value: "AR"},
            {key: "California", value: "CA"},
            {key: "Colorado", value: "CO"},
            {key: "Connecticut", value: "CT"},
            {key: "Delaware", value: "DE"},
            {key: "Dist of Columbia", value: "DC"},
            {key: "Florida", value: "FL"},
            {key: "Georgia", value: "GA"},
            {key: "Hawaii", value: "HI"},
            {key: "Idaho", value: "ID"},
            {key: "Illinois", value: "IL"},
            {key: "Indiana", value: "IN"},
            {key: "Iowa", value: "IA"},
            {key: "Kansas", value: "KA"},
            {key: "Kentucky", value: "KY"},
            {key: "Louisiana", value: "LA"},
            {key: "Maine", value: "ME"},
            {key: "Maryland", value: "MD"},
            {key: "Massachusetts", value: "MA"},
            {key: "Michigan", value: "MI"},
            {key: "Minnesota", value: "MN"},
            {key: "Mississippi", value: "MS"},
            {key: "Missouri", value: "MO"},
            {key: "Montana", value: "MT"},
            {key: "Nebraska", value: "NE"},
            {key: "Nevada", value: "NV"},
            {key: "New Hampshire", value: "NH"},
            {key: "New Jersey", value: "NJ"},
            {key: "New Mexico", value: "NM"},
            {key: "New York", value: "NY"},
            {key: "North Carolina", value: "NC"},
            {key: "North Dakota", value: "ND"},
            {key: "Ohio", value: "OH"},
            {key: "Oklahoma", value: "OK"},
            {key: "Oregon", value: "OR"},
            {key: "Pennsylvania", value: "PA"},
            {key: "Rhode Island", value: "RI"},
            {key: "South Carolina", value: "SC"},
            {key: "South Dakota", value: "SD"},
            {key: "Tennessee", value: "TN"},
            {key: "Texas", value: "TX"},
            {key: "Utah", value: "UT"},
            {key: "Vermont", value: "VT"},
            {key: "Virginia", value: "VA"},
            {key: "Washington", value: "WA"},
            {key: "West Virginia", value: "WV"},
            {key: "Wisconsin", value: "WI"},
            {key: "Wyoming", value: "WY"}
        ];

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
                        <div className="titleSB">College Search</div>
                        <div className="nameFilter">
                                <input className="nameInput" type="text" name="name" placeholder="Name"/>
                        </div>
                        <div className="location">
                            <div className="locationWrapper">
                                <div className="headingSB">Region</div>
                                <Select ref={this.locationInput} options={regions} />
                            </div>
                            <div></div>
                            <div className="locationWrapper">
                                <div className="headingSB">State</div>
                                <Select ref={this.stateInput} options={states} />
                            </div>

                        </div>
                        <div className="headingSB">COST <span className="rates">{this.state.costRange[0]}$ - {this.state.costRange[1]}$</span></div>
                        <RangeSlider onUpdate={this.handleCostRange} ops={{
                            defaultValues: [16000,48000],
                            min: 0,
                            max: 100000,
                            mode: 2,
                            step: 1000,
                            ticks: 5
                        }}/>
                        <div className="headingSB">Ranking<span className="rates">{this.state.rankingRange[0]} - {this.state.rankingRange[1]}</span></div>
                        <RangeSlider onUpdate={this.handleRankingRange} ops={{
                            defaultValues: [50,250],
                            min: 0,
                            max: 601,
                            mode: 2,
                            step: 1,
                            ticks: 6
                        }}/>
                        <div className="nameFilter">
                                <input className="nameInput" type="text" placeholder="Major 1"/>
                        </div>
                        <div className="nameFilter">
                                <input className="nameInput" type="text" placeholder="Major 2"/>
                        </div>
                        <div className="headingSB">Admission Rate<span className="rates">{this.state.admissionsRange[0]}% - {this.state.admissionsRange[1]}%</span></div>
                        <RangeSlider onUpdate={this.handleAdmissionRange} ops={{
                            defaultValues: [25,75],
                            min: 0,
                            max: 100,
                            mode: 2,
                            step: 5,
                            ticks: 10
                        }}/>
                        <div className="headingSB">SAT MATH<span className="rates">{this.state.satmRange[0]} - {this.state.satmRange[1]}</span></div>
                        <RangeSlider onUpdate={this.handleSATMRange} ops={{
                            defaultValues: [400,600],
                            min: 0,
                            max: 800,
                            mode: 2,
                            step: 25,
                            ticks: 10
                        }}/>
                        <div className="headingSB">SAT EBRW<span className="rates">{this.state.sateRange[0]} - {this.state.sateRange[1]}</span></div>
                        <RangeSlider onUpdate={this.handleSATERange} ops={{
                            defaultValues: [400,600],
                            min: 0,
                            max: 800,
                            mode: 2,
                            step: 25,
                            ticks: 10
                        }}/>
                        <div className="headingSB">ACT COMPOSITE <span className="rates">{this.state.actRange[0]} - {this.state.actRange[1]}</span></div>
                        <RangeSlider onUpdate={this.handleACTRange} ops={{
                            defaultValues: [400,600],
                            min: 0,
                            max: 800,
                            mode: 2,
                            step: 25,
                            ticks: 10
                        }}/>
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
                        <button>Search</button>
                    </div>
                </div>

                {/* Where college search results show up */}
                <div className="searchMain">
                    <Scrollbars renderThumbVertical={this.renderThumb} className="cardGrid">
                        {collegeList}
                    </Scrollbars>
                    <div className="paginationWrapper">
                        <div className="pagination">
                            <div className="end"><i className="fas fa-caret-left" onClick={this.prevPage}></i></div>
                            {renderFirst}
                            {renderFirstFade}
                            <div onClick={() => this.handlePage(pageView[0])} className={`middle ${pageView[0] == this.state.page ? 'active': ''}`}><div>{pageView[0]}</div></div>
                            <div onClick={() => this.handlePage(pageView[1])} className={`middle ${pageView[1] == this.state.page ? 'active': ''}`}><div>{pageView[1]}</div></div>
                            <div onClick={() => this.handlePage(pageView[2])} className={`middle ${pageView[2] == this.state.page ? 'active': ''}`}><div>{pageView[2]}</div></div>
                            <div onClick={() => this.handlePage(pageView[3])} className={`middle ${pageView[3] == this.state.page ? 'active': ''}`}><div>{pageView[3]}</div></div>
                            <div onClick={() => this.handlePage(pageView[4])} className={`middle ${pageView[4] == this.state.page ? 'active': ''}`}><div>{pageView[4]}</div></div>
                            {renderLastFade}
                            {renderLast}
                            <div className="end"><i className="fas fa-caret-right" onClick={this.nextPage}></i></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Collegesearch;