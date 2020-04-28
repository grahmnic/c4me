import React from "react";
import './collegeModal.css';

class CollegeModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.callback = this.callback.bind(this);
    }

    close() {
        this.props.onClose();
    }

    callback() {
        this.props.callback();
        this.props.onClose();
    }

    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="collegemodal">
                <div className="collegemodal-background">
                </div>
                <div className="collegemodal-wrapper">
                
                    <div className="collegemodal-panel">
                        <div className="collegemodal-title">
                            {this.props.ops.title}
                        </div>
                        <div className="collegemodal-content">
                            {this.props.ops.content}
                        </div>
                        <div className="collegemodal-btns">
                            <div className="collegemodal-cancel" onClick={this.close}>
                                X
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CollegeModal;