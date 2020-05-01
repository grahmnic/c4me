import React from 'react';
import './collegesearch.scss';
import CollegeResult from '../collegeResult/collegeResult';
import '../collegeModal/collegeModal.css';
import Select from '../select/select.js';
import MultiSelect from '../select/multiselect.js';

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
            actRange: [26, 32],
            costRange: [16000,48000],
            rankingRange: [50, 250],
            popRange: [6000, 14000],
            strict: false,
            sorting: 'ranking',
            isAscending: false,
            collegename: null,
            major1: null,
            major2: null,
            toggleAdmissionsRange: false,
            toggleSatmRange: false,
            toggleSateRange: false,
            toggleActRange: false,
            toggleCostRange: false,
            toggleRankingRange: false,
            togglePopRange: false,
            toggleScoreSort: false,
            toggleLocation: true,
            readyModal: false,
            showModal: false,
            modalOps: null,
            modalCallback: null,
            indivCollegeInfo: null
        }
        
        this.handlePage = this.handlePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);

        this.locationInput = React.createRef();
        this.sortInput = React.createRef();
        this.handleLocationInput = this.handleLocationInput.bind(this);
        this.handleAdmissionRange = this.handleAdmissionRange.bind(this);
        this.handleMoreInfo = this.handleMoreInfo.bind(this);

        this.closeModal = this.closeModal.bind(this);
    }

    setStateRef = (ref) => {
        this.stateRef = ref;
    }

    handleCollegeName = (e) => {
        this.setState({
            collegename: e.target.value
        });
    }

    handleMajor1 = (e) => {
        this.setState({
            major1: e.target.value
        });
    }

    handleToggleLocation = () => {
        this.setState({ toggleLocation: !this.state.toggleLocation})
    }

    handleMajor2 = (e) => {
        this.setState({
            major2: e.target.value
        })
    }

    handleLocationInput() {
        alert(this.locationInput.current.getValue());
    }

    sortList = (val) => {
        this.setState({
            collegeData: this.sortCollegeData(val, this.state.isAscending),
            sorting: val
        });
    }

    handleAdmissionRange(update) {
        this.setState({
            admissionsRange: update
        })
    }

    toggleAdmissionRange = ()  => {
        this.setState({
            toggleAdmissionsRange: !this.state.toggleAdmissionsRange
        })
    }

    handleCostRange = (update) => {
        this.setState({
            costRange: update
        })
    }

    toggleCostRange = ()  => {
        this.setState({
            toggleCostRange: !this.state.toggleCostRange
        })
    }
    

    handleSATMRange = (update) => {
        this.setState({
            satmRange: update
        })
    }

    toggleSatmRange = ()  => {
        this.setState({
            toggleSatmRange: !this.state.toggleSatmRange
        })
    }

    handleSATERange = (update) => {
        this.setState({
            sateRange: update
        })
    }

    toggleSateRange = ()  => {
        this.setState({
            toggleSateRange: !this.state.toggleSateRange
        })
    }

    handleACTRange = (update) => {
        this.setState({
            actRange: update
        })
    }

    toggleActRange = ()  => {
        this.setState({
            toggleActRange: !this.state.toggleActRange
        })
    }

    handleRankingRange = (update) => {
        this.setState({
            rankingRange: update
        })
    }

    toggleRankingRange = ()  => {
        this.setState({
            toggleRankingRange: !this.state.toggleRankingRange
        })
    }

    handlePopRange = (update) => {
        this.setState({
            popRange: update
        })
    }

    togglePopRange = ()  => {
        this.setState({
            togglePopRange: !this.state.togglePopRange
        })
    }

    //get college info from individual result and display modal

    handleMoreInfo(collegeinfo) {
        console.log(collegeinfo);
        this.setState({
            showModal: true,
            indivCollegeInfo: collegeinfo
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
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

    calculateScore = () => {
        this.props.createPopup({
            title: "CALCULATING SCORES",
            content: "Calculating college recommendation scores for current college search."
        });
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('https://chads4us.herokuapp.com/collegerecommender/' + localStorage.getItem("user"), requestOptions)
        .then(data => {
            if(data.status !== 200) {
                data.json().then(res => {
                    this.props.createPopup({
                        title: "SCORE ERROR",
                        content: "Error: " + res.error
                    });
                });
            } else {
                data.json().then(data => {
                    this.props.createPopup({
                        title: "SCORES APPLIED",
                        content: "College recommendation scores have been calculated."
                    });
                    let collegeList = this.state.collegeData
                    for(let x = 0; x < collegeList.length; x++) {
                        collegeList[x].score = data[collegeList[x].collegename];
                    }
                    this.setState({
                        collegeData: collegeList,
                        toggleScoreSort: true
                    });
                    console.log(this.state.collegeData);
                })
            }
        });
    }

    searchColleges = () => {
        this.props.createPopup({
            title: "INITIATING SEARCH",
            content: "Fetching results for your search."
        });
        console.log(this.stateRef.getInstance());
        console.log(this.locationInput.current.getValue());
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: localStorage.getItem("user"),
                isStrict: this.state.strict,
                collegename: this.state.collegename,
                lowadmissionrate: this.state.toggleAdmissionsRange ? this.state.admissionsRange[0] : null,
                highadmissionrate: this.state.toggleAdmissionsRange ? this.state.admissionsRange[1] : null,
                costofattendance: this.state.toggleCostRange ? this.state.costRange[1] : null,
                isRegion: this.state.toggleLocation,
                location: this.state.toggleLocation ? (this.locationInput.current.getValue() || null) : this.stateRef.getInstance().getValues(),
                major1: this.state.major1,
                major2: this.state.major2,
                lowranking: this.state.toggleRankingRange ? this.state.rankingRange[0] : null,
                highranking: this.state.toggleRankingRange ? this.state.rankingRange[1] : null,
                lowsize: this.state.togglePopRange ? this.state.popRange[0] : null,
                highsize: this.state.togglePopRange ? this.state.popRange[1] : null,
                lowsatmath: this.state.toggleSatmRange ? this.state.satmRange[0] : null,
                highsatmath: this.state.toggleSatmRange ? this.state.satmRange[1] : null,
                lowsatebrw: this.state.toggleSateRange ? this.state.sateRange[0] : null,
                highsatebrw: this.state.toggleSateRange ? this.state.sateRange[1] : null,
                lowactcomposite: this.state.toggleActRange ? this.state.actRange[0] : null,
                highactcomposite: this.state.toggleActRange ? this.state.actRange[1] : null
            })
        };
        console.log(requestOptions.body)
        fetch('https://chads4us.herokuapp.com/searchcolleges', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.props.createPopup({
                        title: "SEARCH ERROR",
                        content: "Error: " + response.error
                    })
                }
            }).then(data => {
                console.log(data)
                this.handleRef();
                this.setState({
                    collegeData: data,
                    page: 1,
                    toggleScoreSort: false,
                    isLoading: false
                });
            }).catch(error => {
                this.props.createPopup({
                    title: "SEARCH ERROR",
                    content: "Error: " + error
                })
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

    componentDidUpdate() {
        
    }

    toggleSorting = () => {
        this.setState({
            collegeData: this.sortCollegeData(this.state.sorting, !this.state.isAscending),
            isAscending: !this.state.isAscending
        });
    }

    sortCollegeData = (category, isAscending) => {
        let collegeData = this.state.collegeData;
        if(isAscending) {
            collegeData.sort((a,b) => a[category] > b[category] ? 1 : -1);
        } else {
            collegeData.sort((a,b) => a[category] < b[category] ? 1 : -1);
        }
        return collegeData;
    }

    handleStrict = (e) => {
        this.setState({
            strict: e.target.checked
        });
    }

    handleRef = () => {
        if(this.state.collegeData.length > 0) {
            let e = document.getElementById("top");
            e.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    nextPage() {
        this.handleRef();
        if(this.state.page * this.state.pageLimit < this.state.collegeData.length) {
            this.setState({page: this.state.page + 1});
        }
    }

    prevPage() {
        this.handleRef();
        if(this.state.page > 1) {
            this.setState({page: this.state.page - 1});
        }
    }

    changePageLimit(e) {
        this.handleRef();
        this.setState({pageLimit: e.target.value})
    }

    handlePage(page) {
        this.handleRef();
        this.setState({page: page});
    }

    render() {

        var colleges = [];
        let pageStart = (this.state.page - 1) * this.state.pageLimit;
        for(var i = pageStart; i < (this.state.collegeData.length < pageStart + this.state.pageLimit ? this.state.collegeData.length : pageStart + this.state.pageLimit); i++) {
            colleges.push({
                id: i,
                value: this.state.collegeData[i]
            });
        }

        let collegeList = colleges.map((e) =>
            <div id={!(e.id % 10) ? "top" : null} className="collegeCard" key={e.id} style={{ animationDelay: ((e.id % 10) * 0.1).toString() + "s"}}>
                <CollegeResult data={e.value} callback={this.handleMoreInfo}/>
            </div>
        );

        let pageView = [];
        if (collegeList.length === 0) {
            pageView = [1];
            collegeList = <div className="emptySearch">We were unable to find any matching colleges for your search. ;(</div>;
        } else {
            if(this.state.page < 3 || Math.ceil(this.state.collegeData.length/this.state.pageLimit) < 6) {
                pageView = [1,2,3,4,5]
                pageView = pageView.slice(0, Math.ceil(this.state.collegeData.length/this.state.pageLimit));
            } else if (this.state.page + 2 >= Math.ceil(this.state.collegeData.length/this.state.pageLimit)) {
                let limit = Math.ceil(this.state.collegeData.length/this.state.pageLimit);
                pageView = [limit-4, limit-3, limit-2, limit-1, limit];
            } else {
                let curr = this.state.page;
                pageView = [curr-2, curr-1, curr, curr+1, curr+2];
            }
        }

        let renderMiddle1 = <div className="middle"></div>  ;
        if(pageView.length >= 0) {
            renderMiddle1 = <div onClick={() => this.handlePage(pageView[0])} className={`middle ${pageView[0] === this.state.page ? 'active': ''}`}><div>{pageView[0]}</div></div>;
        }

        let renderMiddle2 = <div className="middle"></div>;
        if (pageView.length > 1) {
            renderMiddle2 = <div onClick={() => this.handlePage(pageView[1])} className={`middle ${pageView[1] === this.state.page ? 'active': ''}`}><div>{pageView[1]}</div></div>;
        }

        let renderMiddle3 = <div className="middle"></div>;
        if (pageView.length > 2) {
            renderMiddle3 = <div onClick={() => this.handlePage(pageView[2])} className={`middle ${pageView[2] === this.state.page ? 'active': ''}`}><div>{pageView[2]}</div></div>
        }

        let renderMiddle4 = <div className="middle"></div>;
        if (pageView.length > 3) {
            renderMiddle4 = <div onClick={() => this.handlePage(pageView[3])} className={`middle ${pageView[3] === this.state.page ? 'active': ''}`}><div>{pageView[3]}</div></div>
        }

        let renderMiddle5 = <div className="middle"></div>;
        if (pageView.length > 4) {
            renderMiddle5 = <div onClick={() => this.handlePage(pageView[4])} className={`middle ${pageView[4] === this.state.page ? 'active': ''}`}><div>{pageView[4]}</div></div>;
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

        const sortingOptions = [
            {key:"Name", value: "collegename"},
            {key:"Cost of Attendance", value: "costofattendance"},
            {key:"Ranking", value: "ranking"},
            {key:"Admission Rate", value: "admissionrate"},
            {key:"Recommendation Score", value: "score"}
        ];

        
        const stateOptions = [
            {key: "Alabama", value: "AL"},
            {key: "Alaska", value: "AK"},
            {key: "Arizona", value: "AZ"},
            {key: "Arkansas", value: "AR"},
            {key: "California", value: "CA"},
            {key: "Colorado", value: "CO"},
            {key: "Connecticut", value: "CT"},
            {key: "Delaware", value: "DE"},
            {key: "Florida", value: "FL"},
            {key: "Georgia", value: "GA"},
            {key: "Hawaii", value: "HI"},
            {key: "Idaho", value: "ID"},
            {key: "Illinois", value: "IL"},
            {key: "Indiana", value: "IN"},
            {key: "Iowa", value: "IA"},
            {key: "Kansas", value: "KS"},
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

        let modal;
        if(this.state.showModal) {

            let majorsList = [];
            for (i = 0; i < this.state.indivCollegeInfo.majors.length; i++) {
                majorsList.push({
                    id: i,
                    value: this.state.indivCollegeInfo.majors[i]
                });
            }

            console.log(majorsList);

            let majors = majorsList.map((e) => 
                <div key={e.id}>
                    {e.value}
                </div>
            );

            let gpa;
            if (this.state.indivCollegeInfo.gpa == null) {
                gpa = "N/A";
            } else {
                gpa = this.state.indivCollegeInfo.gpa;
            }

            console.log(majors);

            modal = 
            <div>
                <div className="collegemodal">
                    <div className="collegemodal-background">
                    </div>
                    <div className="collegemodal-wrapper">

                        <div className="collegemodal-panel">
                            <div className="collegemodal-title">
                                {this.state.indivCollegeInfo.collegename}
                            </div>
                            <div className="collegemodal-content">
                                
                                Rank: {this.state.indivCollegeInfo.ranking} <br/>
                                Institution Type: {this.state.indivCollegeInfo.institutiontype} <br/>
                                Cost In-State: {this.state.indivCollegeInfo.costofattendanceinstate} <br/>
                                Cost Out-State: {this.state.indivCollegeInfo.costofattendanceoutstate} <br/>
                                Population: {this.state.indivCollegeInfo.size} <br/>
                                Region: {this.state.indivCollegeInfo.region} <br/>
                                State: {this.state.indivCollegeInfo.state} <br/>
                                Admission Rate: {this.state.indivCollegeInfo.admissionrate * 100}% <br/>
                                Completion Rate: {this.state.indivCollegeInfo.completionrate}% <br/> <br/>
                                Supported Majors:  <div className="majorsList"> {majors} </div> <br/>

                                Average Scores: <br/>
                                GPA: {gpa} <br/>

                                SAT EBRW: {this.state.indivCollegeInfo.satebrw} <br/>
                                SAT MATH: {this.state.indivCollegeInfo.satmath} <br/>
                                ACT COMPOSITE: {this.state.indivCollegeInfo.actcomposite}
                                
                            </div>
                            <div className="collegemodal-btns">
                                <div className="collegemodal-cancel" onClick={this.closeModal}>
                                    X
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } 
            
        
    
        return(
            
            <div className="searchContent">
                
                {modal}

                {/* Mobile Sidebar content*/}
                <div className="mobileFilter">
                    <div className="mbFilterWrap">
                        <div className="showRsltsWrap">
                            Showing results...
                        </div>
                        <div className="filterBtnWrap">
                            <button className="filterBtn" onClick={this.searchColleges}>Refresh Search</button>
                        </div>
                    </div>
                    
                </div>

                {/* Sidebar content*/}
                <div className="searchSideBar">   
                    <Scrollbars renderThumbVertical={this.renderThumb} className="filterSB">
                        <div className="filterSB">
                            <div className="filterHeader">
                                <div className="titleSB">College Search</div>
                                <div className="toggleWrapper">
                                    <div>STRICT MODE</div>
                                    <label className="switch strictSwitch">'
                                        <input type="checkbox"  defaultChecked={this.state.strict}  onChange={this.handleStrict}/>
                                        <span className="toggle round"></span>
                                    </label>
                                </div>

                            </div>
                            <div className="headingSep">SORT BY</div>
                            <div className="sorting">
                                <Select ref={this.sortInput} changeCallback={this.sortList} options={sortingOptions} />
                                <div className="sortingOp" onClick={this.toggleSorting}>
                                    <i className={`fas fa-sort-up ${this.state.isAscending ? "sortToggle" : ""}`}></i>
                                    <i className={`fas fa-sort-down ${!this.state.isAscending ? "sortToggle" : ""}`}></i>
                                </div>
                            </div>
                            <div className="hr"></div>
                            <div className="nameFilter">
                                    <input className="nameInput" type="text" value={this.state.collegename} onChange={this.handleCollegeName} placeholder="Name"/>
                            </div>
                            <div className="location">
                                <div className={`locationWrapper ${this.state.toggleLocation ? null : "disabledLocationInput"}`}>
                                    <div className="headingSB">Region</div>
                                    <Select ref={this.locationInput} options={regions} />
                                </div>
                                <div className="toggleLocation"><i className="fas fa-check" onClick={this.handleToggleLocation}></i></div>
                            </div>

                            <div className="location">
                                <div className={`locationWrapper ${!this.state.toggleLocation ? null : "disabledLocationInput"}`}>
                                    <div className="headingSB">States</div>
                                    <MultiSelect ref={this.setStateRef} options={stateOptions} />
                                </div>
                                <div className="toggleLocation"><i className="fas fa-check" onClick={this.handleToggleLocation}></i></div>
                            </div>

                            <div className={`range ${this.state.toggleCostRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleCostRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">COST <span className="rates">{this.state.costRange[0]}$ - {this.state.costRange[1]}$</span></div>
                                    <RangeSlider onUpdate={this.handleCostRange} ops={{
                                        defaultValues: [0,48000],
                                        min: 0,
                                        max: 100000,
                                        mode: 2,
                                        step: 1000,
                                        ticks: 5
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleCostRange}></i></div>
                            </div>

                            <div className={`range ${this.state.toggleRankingRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleRankingRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">Ranking<span className="rates">{this.state.rankingRange[0]} - {this.state.rankingRange[1]}</span></div>
                                    <RangeSlider onUpdate={this.handleRankingRange} ops={{
                                        defaultValues: [50,250],
                                        min: 1,
                                        max: 601,
                                        mode: 2,
                                        step: 1,
                                        ticks: 6
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleRankingRange}></i></div>
                            </div>

                            <div className="majors">
                                <div className="nameFilter">
                                        <input className="nameInput" type="text" value={this.state.major1} onChange={this.handleMajor1} placeholder="Major 1"/>
                                </div>
                                <div className="section"></div>
                                <div className="nameFilter">
                                        <input className="nameInput" type="text" value={this.state.major2} onChange={this.handleMajor2} placeholder="Major 2"/>
                                </div>
                            </div>

                            <div className={`range ${this.state.toggleAdmissionsRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleAdmissionsRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">Admission Rate<span className="rates">{this.state.admissionsRange[0]}% - {this.state.admissionsRange[1]}%</span></div>
                                    <RangeSlider onUpdate={this.handleAdmissionRange} ops={{
                                        defaultValues: [25,75],
                                        min: 1,
                                        max: 100,
                                        mode: 2,
                                        step: 1,
                                        ticks: 10
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleAdmissionRange}></i></div>
                            </div>


                            <div className={`range ${this.state.toggleSatmRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleSatmRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">SAT MATH<span className="rates">{this.state.satmRange[0]} - {this.state.satmRange[1]}</span></div>
                                    <RangeSlider onUpdate={this.handleSATMRange} ops={{
                                        defaultValues: [400,600],
                                        min: 100,
                                        max: 800,
                                        mode: 2,
                                        step: 1,
                                        ticks: 5
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleSatmRange}></i></div>
                            </div>

                            
                            <div className={`range ${this.state.toggleSateRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleSateRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">SAT EBRW<span className="rates">{this.state.sateRange[0]} - {this.state.sateRange[1]}</span></div>
                                    <RangeSlider onUpdate={this.handleSATERange} ops={{
                                        defaultValues: [400,600],
                                        min: 100,
                                        max: 800,
                                        mode: 2,
                                        step: 1,
                                        ticks: 5
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleSateRange}></i></div>
                            </div>
                            <div className={`range ${this.state.toggleActRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleActRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">ACT COMPOSITE <span className="rates">{this.state.actRange[0]} - {this.state.actRange[1]}</span></div>
                                    <RangeSlider onUpdate={this.handleACTRange} ops={{
                                        defaultValues: [26,32],
                                        min: 5,
                                        max: 36,
                                        mode: 2,
                                        step: 1,
                                        ticks: 9
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleActRange}></i></div>
                            </div>

                            <div className={`range ${this.state.togglePopRange ? "" : "disabledRange"}`}>
                                <div className={`rangeInput ${this.state.togglePopRange ? "" : "disabledRangeInput"}`}>
                                    <div className="headingSB">POPULATION <span className="rates">{this.state.popRange[0]} - {this.state.popRange[1]}</span></div>
                                    <RangeSlider onUpdate={this.handlePopRange} ops={{
                                        defaultValues: [6000,14000],
                                        min: 100,
                                        max: 80000,
                                        mode: 2,
                                        step: 1,
                                        ticks: 10
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.togglePopRange}></i></div>
                            </div>

                            <div className="filterBtns">
                                <button className="searchBtn" onClick={this.searchColleges}>Search</button>
                                <div className="filterSep"></div>
                                <button className="searchBtn" onClick={this.calculateScore}>Recommendations</button>
                            </div>
                        </div>
                                               
                    </Scrollbars>
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
                            {renderMiddle1}
                            {renderMiddle2}
                            {renderMiddle3}
                            {renderMiddle4}
                            {renderMiddle5}
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