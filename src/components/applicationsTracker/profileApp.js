import React from 'react'
import './profileApp.scss';

class ProfileApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    componentDidMount() {

    }
    
    expandCard = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        let moreInfo = null;

        return(
            <div className={`pfCard ${this.state.expanded ? "pfCardE" : null}`} style={{animationDelay: (Math.random(0, 1) * 0.25).toString() + "s" }}>
                <div className={`pfInfo ${this.state.expanded ? "pfInfoE" : null}`}>
                    <div className="pfInfoField">
                        <div className="pfLabel pfUser">{this.props.data.username}</div>
                    </div>
                    <div className="pfInfoField"><div className="pfLabel">RESIDENCE STATE: </div><div className="pfField">{this.props.data.residencestate ? this.props.data.residencestate : "n/a"}</div></div>
                    <div className="pfInfoField">
                        <div className="pfLabel">GPA: </div><div className="pfField">{this.props.data.gpa}</div>
                    </div>
                    <div className="pfInfoField"><div className="pfLabel">COLLEGE CLASS: </div><div className="pfField">{this.props.data.collegeclass}</div></div>
                    <div className="pfInfoField"><div className="pfLabel">MAJOR 1: </div><div className="pfField">{this.props.data.major1}</div></div>
                    <div className="pfInfoField"><div className="pfLabel">MAJOR 2: </div><div className="pfField">{this.props.data.major2 ? this.props.data.major2 : "n/a"}</div></div>
                </div>
                <div className={`pfDivide ${!this.state.expanded ? null : "pfDivideE"}`}></div>      
                <div className={`pfMoreInfo ${this.state.expanded ? "pfMoreInfoE" : null}`}>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT MATH: </div><div className="pfField2 pfField800">{this.props.data.satmath || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT EBRW: </div><div className="pfField2 pfField800">{this.props.data.satebrw || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">ACT ENG: </div><div className="pfField2 pfField32">{this.props.data.actenglish || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">ACT MATH: </div><div className="pfField2 pfField32">{this.props.data.actmath || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">ACT READ: </div><div className="pfField2 pfField32">{this.props.data.actreading || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT SCI: </div><div className="pfField2 pfField32">{this.props.data.actscience || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">ACT COMP: </div><div className="pfField2 pfField32">{this.props.data.actcomposite || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT LIT: </div><div className="pfField2 pfField800">{this.props.data.satliterature || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT USH: </div><div className="pfField2 pfField800">{this.props.data.satushistory || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT WH: </div><div className="pfField2 pfField800">{this.props.data.satworldhistory || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT MATH1: </div><div className="pfField2 pfField800">{this.props.data.satmath1 || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT MATH2: </div><div className="pfField2 pfField800">{this.props.data.satmath2 || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT COBIO: </div><div className="pfField2 pfField800">{this.props.data.satcobio || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT MOLBIO: </div><div className="pfField2 pfField800">{this.props.data.satmolbio || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT CHEM: </div><div className="pfField2 pfField800">{this.props.data.satchem || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2">SAT PHYS: </div><div className="pfField2 pfField800">{this.props.data.satphysics || "n/a"}</div></div>
                    <div className="pfInfoField2"><div className="pfLabel2 pfNotTest">PASSED APS: </div><div className="pfField2">{this.props.data.numpassedaps || "n/a"}</div></div>
                </div>
                <i class={`fas fa-expand-alt expandIcon ${this.state.expanded ? "expandIconE" : null}`} onClick={this.expandCard}></i>
            </div>
        );
    }
}

export default ProfileApp;