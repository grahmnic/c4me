import React from 'react';
import './datalist.scss';
import onClickOutside from 'react-onclickoutside';

class DataList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || null,
            displayedValues: this.props.options,
            toggleDisplayedValues: false
        }
    }

    onFocus = () => {
        this.setState({
            toggleDisplayedValues: true
        });
    }

    handleClickOutside = (e) => {
        if(this.props.autofill) {
            let val = this.state.value;
            val = this.state.value || "";
            val = this.state.displayedValues.indexOf(val) !== -1 ? val : this.state.displayedValues[0];
            this.setState({
                value: val,
                toggleDisplayedValues: false
            });
        } else {
            this.setState({
                toggleDisplayedValues: false
            });
        }

    }

    filterValues = (e) => {
        let filter = e.target.value.toUpperCase();
        let filteredValues = [];
        for(var i = 0; i < this.props.options.length; i++) {
            if(this.props.options[i].toUpperCase().indexOf(filter) > -1) {
                filteredValues.push(this.props.options[i]);
            }
        }

        this.setState({
            displayedValues: filteredValues,
            value: e.target.value
        });
    }

    selectValue = (e) => {
        this.setState({
            toggleDisplayedValues: false,
            value: e.currentTarget.innerText
        });
    }

    getValue = () => {
        return this.state.value;
    }

    render() {
        

        const displayedValues = this.state.displayedValues.map((e) => 
            <div className="dlOp" onClick={this.selectValue} style={{fontSize: `calc(${this.props.fontSize}/1.5)`, padding: this.props.padding}} key={e}>{e}</div>
        );
        return(
            <div className="datalist">
                <input onChange={this.filterValues} onFocus={this.onFocus} style={{fontSize: this.props.fontSize, padding: this.props.padding}} className="dlInput" type="text" value={this.state.value || ""} placeholder={this.props.placeholder}/>
                <div className="dlOptions" >
                    {!this.state.toggleDisplayedValues || displayedValues}
                </div>
            </div>            
        );
    }
}

export default onClickOutside(DataList);