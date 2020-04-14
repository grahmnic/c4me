import React from 'react';
import './select.scss';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.options = this.props.options;

        this.state = {
            selecting: false,
            selectedValue: this.options[0].value,
            selectedKey: this.options[0].key
        }

        this.toggleSelect = this.toggleSelect.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    componentDidMount() {

    }

    toggleSelect() {
        this.setState({
            selecting: !this.state.selecting
        });
    }

    selectValue(key, val) {
        this.setState({
            selecting: false,
            selectedKey: key,
            selectedValue: val
        });
        if(this.props.changeCallback) {
            this.props.changeCallback(val);
        }
    }

    getValue() {
        return this.state.selectedValue;
    }

    render() {
        let options = null;
        if(this.state.selecting) {
            options = this.options.map((e) =>
                <div className="option" key={e.value} onClick={() => this.selectValue(e.key, e.value)}>{e.key}</div>
            );
        }
        return(
            <div className="select">
                <div className="selector" onClick={this.toggleSelect}>
                    {this.state.selectedKey}
                </div>
                <div className={`options ${this.state.selecting ? "selecting" : null}`}>
                    {options}
                </div>
            </div>
        );
    }
}

export default Select;