import React from 'react';
import './manageApplications.css';
import Application from '../application/application.js';

class ManageApplications extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>
                <div className="appStats">
                    <div className="appNums">
                        <div className="acceptReject">
                            <div className="innerNums">
                                <div>#</div>
                                <div>ACCEPTED</div>
                            </div>
                            <div className="innerNums">
                                <div>#</div>
                                <div>REJECTED</div>
                            </div>
                        </div>
                        <div className="deferWait">
                           <div className="innerNums">
                               <div>#</div> 
                               <div>DEFERRED</div>
                            </div> 
                            <div className="innerNums">
                                <div>#</div>
                                <div>WAITING</div> 
                            </div>
                        </div>
                        
                    </div>
                    <div className="appPercent">
                        <div className="innerPercent">
                            24%
                        </div>  
                        <div className="percentText">
                            ACCEPTANCE<br/>RATE
                        </div>
                    </div>
                    
                </div>
                <div className="appsList">
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>
                    <div className="application">
                        <Application/>
                    </div>

                </div>
            </div>
        );
    }
}

export default ManageApplications;