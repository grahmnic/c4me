import React from 'react';
import './applicationsTracker.scss';
import RangeSlider from '../slider/slider';
import Select from '../select/select.js';
import ProfileApp from './profileApp.js';
import MultiSelect from '../select/multiselect.js';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import DataList from '../select/datalist.js';

//IMPORTED LIBRARIES
import {Scrollbars} from 'react-custom-scrollbars';

class ApplicationsTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strict: false,
            collegeOptions: [],
            toggleCollegeRange: false,
            collegeRange: [2014,2018],
            sorting: null,
            isAscending: false,
            highSchoolOptions: [],
            profiles: [],
            scatterplot: false,
            xField: "SAT (MATH+EBRW)"
        }

        this.scatterplotInput = React.createRef();
    }

    setNameRef = (ref) => {
        this.collegename = ref;
    }

    getApps = (ref) => {
        this.applicationRef = ref;
    }

    getHighschools = (ref) => {
        this.highSchoolRef = ref;
    }

    componentDidMount() {
        this.fetchHS();
        this.fetchColleges();
    }

    fetchColleges = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallcollegenames', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.setState({
                            collegeOptions: data
                        });
                    });
                } else {
                    this.props.createPopup({
                        title: "COLLEGE OPS ERROR",
                        content: "Error in fetching college names."
                    });
                }
            });
    }

    handleScatterplot = (val) => {
        this.setState({
            xField: val
        });
    }

    handleStrict = () => {
        this.setState({
            strict: !this.state.strict
        });
    }

    handleCollegeName = (e) => {
        this.setState({
            collegename: e.target.value
        });
    }

    toggleCollegeRange = () => {
        this.setState({ toggleCollegeRange: !this.state.toggleCollegeRange });
    }

    handleCollegeRange = (update) => {
        this.setState({ collegeRange: update });
    }

    fetchHS = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://chads4us.herokuapp.com/getallhs', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error in fetching data');
                }
            }).then(data => {
                let data_arr = [];
                for(var i = 0; i < data.length; i++) {
                    data_arr.push({key: data[i], value: data[i]});
                }
                this.setState({
                    highSchoolOptions: data_arr
                });
            }).catch(error => {
                this.props.createPopup({
                    title: "HIGHSCHOOL ERROR",
                    content: "Error: " + error
                });
            });
    }

    fetchProfiles = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                isStrict: this.state.strict,
                collegename: this.collegename.getInstance().getValue(),
                lowcollegeclass: this.state.toggleCollegeRange ? this.state.collegeRange[0] : null,
                highcollegeclass: this.state.toggleCollegeRange ? this.state.collegeRange[1] : null,
                highschools: this.highSchoolRef.getInstance().getValues(),
                appstatuses: this.applicationRef.getInstance().getValues()
            })
        };

        // console.log(this.state);
        // console.log(this.highSchoolInput.current.value);
        fetch('https://chads4us.herokuapp.com/apptracker', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        const determineOrder = (x) => {
                            switch(x) {
                                case "accepted":
                                    return 0;
                                case "denied":
                                    return 1;
                                case "pending":
                                    return 5;
                                case "deferred":
                                    return 2;
                                case "withdrawn":
                                    return 4;
                                case "wait-listed":
                                    return 3;
                                default:
                                    return null;
                            }
                        }
                        data.sort((a,b) => determineOrder(a.status) > determineOrder(b.status));
                        this.setState({
                            profiles: data
                        });
                    });
                } else {
                    this.props.createPopup({
                        title: "APPLICATION TRACKER ERROR",
                        content: "Error in searching for applications."
                    });
                }
            });
    }

    onScatterplot = () => {
        this.setState({
            scatterplot: true
        });
    }

    offScatterplot = () => {
        this.setState({
            scatterplot: false
        });
    }

    renderThumb = () => {
        return (
            <div
                style={{ backgroundColor: `rgba(221,221,221,0.4)` }}/>
        );
    }

    render() {
        const scatterPlotOptions = [
            {key: "SAT (Math+EBRW)", value: "SAT (MATH+EBRW)"},
            {key: "ACT Composite", value: "ACT Composite"},
            {key: "Average Scores", value: "Average Scores"}
        ];

        const applicationOptions = [
            {key: "Accepted", value: "accepted"},
            {key: "Denied", value: "denied"},
            {key: "Pending", value: "pending"},
            {key: "Deferred", value: "deferred"},
            {key: "Withdrawn", value: "withdrawn"},
            {key: "Waitlisted", value: "wait-listed"}
        ];

        let profiles = [];
        for(var m = 0; m < this.state.profiles.length; m++) {
            profiles.push({
                id: m,
                value: this.state.profiles[m]
            });
        }

        let profileList = null;
        let appInfo = null;
        if(this.state.scatterplot) {
            let data = [{
                "id": "accepted",
                "data": []
            },
            {
                "id": "denied",
                "data": []
            },
            {
                "id": "pending",
                "data": []
            },
            {
                "id": "deferred",
                "data": []
            },
            {
                "id": "withdrawn",
                "data": []
            },
            {
                "id": "waitlisted",
                "data": []
            }
        ];

        const isTest = (test) => {
            switch(test) {
                case "satliterature":
                    return true;
                case "satushistory":
                    return true;
                case "satworldhistory":
                    return true;
                case "satmath1":
                    return true;
                case "satmath2":
                    return true;
                case "satecobio":
                    return true;
                case "satmolbio":
                    return true;
                case "satchem":
                    return true;
                case "satphysics":
                    return true;
                default:
                    return false;
            }
        }

        let meanGPA = 0;
        let meanXField = 0;
        let counter = 0;
        let counter2 = 0;

            for(var i = 0; i < this.state.profiles.length; i++) {
                if(this.state.profiles[i].gpa && this.state.profiles[i].satmath && this.state.profiles[i].gpa >= 0 && this.state.profiles[i].satmath >= 0) {
                    let xField = 0;
                    let index = 0;
                    counter++;
                    switch(this.state.profiles[i].status) {
                        case "accepted":
                            break;
                        case "denied":
                            index = 1;
                            break;
                        case "pending":
                            index = 2;
                            break;
                        case "deferred":
                            index = 3;
                            break;
                        case "withdrawn":
                            index = 4;
                            break;
                        case "wait-listed":
                            index = 5;
                            break;
                        default:
                            break;
                    }
                    if (this.state.xField === 'SAT (MATH+EBRW)') {
                        counter2++;
                        xField = this.state.profiles[i].satmath + this.state.profiles[i].satebrw;
                    } else if (this.state.xField === 'ACT Composite') {
                        counter2++;
                        xField = this.state.profiles[i].actcomposite;
                    } else {
                        counter2++;
                        let obj = this.state.profiles[i];
                        let numTests = 0;
                        var prop;
                        for (prop in obj) {
                            if(isTest(prop)) {
                                numTests++;
                                xField += (obj[prop]/800) * 0.05;
                            }
                        }
                        let weight = 1 - (numTests * 0.05);
                        if(obj.satmath && obj.satebrw && obj.actcomposite) {
                            xField += ((obj.satmath + obj.satebrw) / 1600) * (weight/2);
                            xField += ((obj.actcomposite) / 36) * (weight/2);
                        } else if (obj.actcomposite) {
                            xField += ((obj.actcomposite) / 36) * weight;
                        } else {
                            xField += ((obj.satmath + obj.satebrw) / 1600) * weight;
                        }
                    }
                    data[index].data.push({
                        "y": this.state.profiles[i].gpa,
                        "x": xField,
                        "z": this.state.profiles[i].username
                    });
                    meanGPA += this.state.profiles[i].gpa;
                    meanXField += xField;
                }
            }

            meanGPA = (meanGPA / counter).toFixed(2);
            meanXField = (meanXField / counter2).toFixed(2);

            const theme = {
                textColor: '#DDDDDD',
                fontFamily: "Roboto Condensed, monospace",
                fontSize: "0.9rem",
                axis: {
                    legend: {
                        text: {
                            fontSize: '1rem'
                        }
                    }
                },
                grid: {
                  stroke: '#888',
                  strokeWidth: 1
                },
                tooltip: {
                    container: {
                        background: '#222',
                        color: 'white',
                        fontSize: '0.8rem',
                        borderRadius: '0px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)'
                    }
                }
              };

            const colors = {
                'accepted': '#2ECC71',
                'deferred': '#F39C12',
                'waitlisted': '#884EA0',
                'pending': '#F1C40F',
                'withdrawn': '#D0D3D4',
                'denied': '#A93226'
            }
            const getColor = node => 
            {
                return colors[node.serieId]
            };

            profileList = 
            <div className="scatterplotArea">
                <div className="graph">
                    <ResponsiveScatterPlot                    
                        data={data}
                        margin={{ top: 60, right: 120, bottom: 70, left: 90 }}
                        xScale={{ type: 'linear', min: 0, max: 'auto' }}
                        xFormat={function(e){return e;}}
                        yScale={{ type: 'linear', min: 0, max: 'auto' }}
                        yFormat={function(e){return e;}}
                        blendMode="lighten"
                        colors={getColor}
                        axisTop={null}
                        axisRight={null}
                        theme={theme}
                        tooltip={({node}) => {
                        return (                        
                            <div>
                                <div
                                    style={{
                                        color: '#DDDDDD',
                                        background: '#333',
                                        padding: '12px 16px',
                                        fontFamily: 'Roboto Condensed, monospace',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <strong>
                                        {node.data.z}
                                    </strong>
                                    <div style={{width: "1rem", height: "1rem", backgroundColor: node.style.color, float: 'right'}}></div>
                                    <br />
                                    {`GPA: ${node.data.formattedY}, `}
                                    {`${this.state.xField}: ${node.data.formattedX}`}
                                </div>
                            </div>
                        )}
                    }
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: this.state.xField,
                            legendPosition: 'middle',
                            legendOffset: 46
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'GPA',
                            legendPosition: 'middle',
                            legendOffset: -60
                        }}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 130,
                                translateY: 0,
                                itemWidth: 100,
                                itemHeight: 12,
                                itemsSpacing: 5,
                                itemDirection: 'left-to-right',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                itemTextColor: "#DDDDDD",
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>;

            appInfo =                
            <div className="graphInfo">
                <div className="graphField">
                    <div className="graphVal">{meanGPA}</div>
                    <div className="graphLabel">MEAN GPA</div>
                </div>
                <div className="graphField">
                    <div className="graphVal">{meanXField}</div>
                    <div className="graphLabel">MEAN {this.state.xField}</div>
                </div>
                <div className="graphField">
                    <Select ref={this.scatterplotInput} options={scatterPlotOptions} changeCallback={this.handleScatterplot} />
                    <div className="graphLabel">X-AXIS</div>
                </div>
            </div>;


        } else {
            profileList = profiles.map((e) =>
                <ProfileApp data={e.value} className="profileCard" key={e.id} style={{ animationDelay: (e.id * 0.05).toString() + "s"}}>
                </ProfileApp>
            );

            let meanGPA = 0;
            let meanSATM = 0;
            let meanSATE = 0;
            let meanACT = 0;
            let numGPA = 0;
            let numSATM = 0;
            let numSATE = 0;
            let numACT = 0;
            for(var index = 0; index < this.state.profiles.length; index++) {
                meanGPA += this.state.profiles[index].gpa;  
                meanSATM += this.state.profiles[index].satmath;
                meanSATE += this.state.profiles[index].satebrw;
                meanACT += this.state.profiles[index].actcomposite;
                numGPA++;
                numSATM++;
                numSATE++;
                numACT++;
            }

            appInfo = 
            <div className="graphInfo">
                <div className="graphField">
                    <div className="graphVal">{(meanGPA/numGPA).toFixed(2)}</div>
                    <div className="graphLabel">MEAN GPA</div>
                </div>
                <div className="graphField">
                    <div className="graphVal">{(meanSATM/numSATM).toFixed(2)}</div>
                    <div className="graphLabel">MEAN SAT MATH</div>
                </div>
                <div className="graphField">
                    <div className="graphVal">{(meanSATE/numSATE).toFixed(2)}</div>
                    <div className="graphLabel">MEAN SAT EBRW</div>
                </div>
                <div className="graphField">
                    <div className="graphVal">{(meanACT/numACT).toFixed(2)}</div>
                    <div className="graphLabel">MEAN ACT COMP.</div>
                </div>
            </div>

            if (!profileList.length) {
                profileList = <div className="atEmpty">Sorry, there seems to be no matching searches. ;(</div>
            }
        }

        return(
            <div className="atWrapperWrapper">
                <div className="atWrapper">
                    <div className="atPanel">
                        <div className="atFilter">
                            <div className="atHeaderWrapper">
                                <div className="atHeader">
                                    Applications Tracker
                                </div>
                                <div className="toggleWrapper ">
                                    <div className="strictTitle">STRICT MODE</div>
                                    <label className="switch strictSwitch">'
                                        <input type="checkbox"  defaultChecked={this.state.strict}  onChange={this.handleStrict}/>
                                        <span className="toggle atToggle round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="atH1">College Name</div>
                            <div className="atDataList">
                                <DataList autofill={true} ref={this.setNameRef} options={this.state.collegeOptions} placeholder="Enter a college name" fontSize="1rem" padding="5px 10px"/>
                            </div>
                            <div className="atH1">College Class</div>
                            <div className={`atRange range ${this.state.toggleCollegeRange ? "" : "atdisabledRange"}`}>
                                <div className={`rangeInput ${this.state.toggleCollegeRange ? "" : "atdisabledRangeInput"}`}>
                                    <div className="atRangeHeader">{this.state.collegeRange[0]} - {this.state.collegeRange[1]}</div>
                                    <RangeSlider onUpdate={this.handleCollegeRange} ops={{
                                        defaultValues: [2014,2018],
                                        min: 2000,
                                        max: 2030,
                                        mode: 2,
                                        step: 1,
                                        ticks: 5
                                    }}/>
                                </div>
                                <div className="toggleRange"><i className="fas fa-check" onClick={this.toggleCollegeRange}></i></div>
                            </div>
                            <div className="atH1">High Schools</div>
                            <MultiSelect ref={this.getHighschools} options={this.state.highSchoolOptions} />
                            <div className="atH1">Application Status</div>
                            <MultiSelect ref={this.getApps} options={applicationOptions} />
                            <div className="atBtns">
                                    <button className="atBtn" onClick={this.fetchProfiles}>
                                        Search
                                    </button>
                                    <div className="section"></div>
                                    <div className="afToggle">
                                        SCATTERPLOT
                                        <div className="afSwitch">
                                            <div className={`afSwitchBtn ${this.state.scatterplot || "afActive"}`} onClick={this.onScatterplot}>ON</div>
                                            <div className={`afSwitchBtn ${!this.state.scatterplot || "afActive"}`} onClick={this.offScatterplot}>OFF</div>
                                        </div>
                                    </div>
                            </div>
                            <div className="appInfo">
                                {appInfo}
                            </div>
                        </div>
                        <Scrollbars renderThumbVertical={this.renderThumb} renderThumbHorizontal={this.renderThumb} className="atGrid">
                            {profileList}
                        </Scrollbars>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationsTracker;