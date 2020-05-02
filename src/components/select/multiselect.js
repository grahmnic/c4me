import React from 'react';
import onClickOutside from 'react-onclickoutside';
import './multiselect.scss';

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: this.props.options,
            selecting: false,
            selectedValues: [],
            selectedKeys: []
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            options: nextProps.options
        });
    }

    handleClickOutside = (e) => {
        this.setState({
            selecting: false
        });
    }

    toggleSelect = () => {
        this.setState({
            selecting: true
        })
    }

    addValue = (key, val) => {
        if(!this.state.selectedKeys.includes(key)) {
            this.setState({
                selectedKeys: this.state.selectedKeys.concat(key),
                selectedValues: this.state.selectedValues.concat(val)
            });
            if(this.props.changeCallback) {
                this.props.changeCallback(val);
            }
        }
    }

    removeValue = (key, val) => {
        this.setState({
            selectedKeys: this.state.selectedKeys.filter(e => e !== key),
            selectedValues: this.state.selectedValues.filter(e => e !== val)
        });
        if(this.props.changeCallback) {
            this.props.changeCallback(val);
        }
    }

    getValues = () => {
        return this.state.selectedValues;
    }

    render() {
        let options = null;
        if(this.state.selecting) {
            options = this.state.options.map((e) =>
                <div className="option" key={e.value} onClick={() => this.addValue(e.key, e.value)}>{e.key}</div>
            );
        }
        let selected = null;
        if(this.state.selectedKeys.length) {
            selected = this.state.selectedKeys.map((e) => 
                <div className="selectedKey" key={e}>
                    {e}
                <i className="fas fa-times" onClick={() => this.removeValue(e, this.state.options.filter(obj => {
                    return obj.key === e
                })[0].value)}></i>
                </div>
            );
        }
        return(
            <div className="select mselect">
                <div className="selector mselector" onClick={this.toggleSelect}>
                    {selected}
                </div>
                <div className={`moptions ${this.state.selecting ? "selecting" : null}`}>
                    {options}
                </div>
            </div>
        );
    }
}

export default onClickOutside(MultiSelect);