import React from "react";
import './appModal.css';

class AppModal extends React.Component {
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
            <div className="appmodal">
                <div className="appmodal-background">
                </div>
                <div className="appmodal-wrapper">
                    <div className="appmodal-panel">
                        <div className="appmodal-title">
                            {this.props.ops.title}
                        </div>
                        <div className="appmodal-content">
                            {this.props.ops.content}
                        </div>
                        <div className="appmodal-btns">
                            <div className="appmodal-confirm" onClick={this.callback}>
                                CONFIRM
                            </div>
                            <div className="appmodal-cancel" onClick={this.close}>
                                CANCEL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppModal;