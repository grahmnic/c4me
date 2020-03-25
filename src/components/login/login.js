import React from 'react';
import './login.css';
import LoginLogoTop from '../../assets/images/college.png';
import LoginLogoBot from '../../assets/images/book.png';
import HandLogo from '../../assets/images/women_hand.png';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: true,
            starWidths: ["", "", ""],
            starAngles: ["", "", ""]
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateStar);
        this.updateStar();
    }

    shift = () => {
        this.setState({
            showLogin: !this.state.showLogin
        })
    }

    updateStar = () => {
        var stars = document.getElementsByClassName("shooting-star");
        var starWidths = [];
        var starAngles = [];
        for (var i = 0; i < stars.length; i++) {
            var w = stars[i].offsetWidth;
            var h = stars[i].offsetHeight;
            var d = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
            var a = 90 - Math.acos(h/d) * (180 / Math.PI);
            starWidths.push((d*0.9).toString() + "px");
            starAngles.push(a.toString() + "deg")
        }
        this.setState({
            starWidths: starWidths,
            starAngles: starAngles
        });
    }

    render() {
        const showLeft = this.state.showLogin ? 'showing' : '';
        const showInfo = this.state.showLogin ? 'showingInfo' : '';
        const showStar1 = this.state.showLogin ? 'showingStar-1' : '';
        const showStar2 = this.state.showLogin ? 'showingStar-2' : '';
        const showStar3 = this.state.showLogin ? 'showingStar-3' : '';
        const showRight = this.state.showLogin ? '' : 'showing';
        const showLogo = this.state.showLogin ? '' : 'showingLogo';
        return(
            <div className="login-container">
                <div className={`login-left ${showLeft}`}>
                    <div className="star-show">
                        <div className="stars">
                            <div className={`shooting-star star-1 ${showStar1}`}>
                                <div className="trail" style={{width: this.state.starWidths[0], transform: `rotate(${this.state.starAngles[0]})`}}>
                                </div>
                                <i className="fas fa-star star"></i>
                            </div>
                            <div className={`shooting-star star-2 ${showStar2}`}>
                                <div className="trail" style={{width: this.state.starWidths[1], transform: `rotate(${this.state.starAngles[1]})`}}>
                                </div>
                                <i className="fas fa-star star"></i>
                            </div>
                            <div className={`shooting-star star-3 ${showStar3}`}>
                                <div className="trail" style={{width: this.state.starWidths[2], transform: `rotate(${this.state.starAngles[2]})`}}>
                                </div>
                                <i className="fas fa-star star"></i>
                            </div>
                        </div>
                    </div>
                    <div className={`main ${showInfo}`}>
                        <div className="login-subtitle-2">
                            YOUR DREAM COLLEGE
                        </div>
                        <div className="login-info">
                            ONE SEARCH AT A TIME
                        </div>
                        <div className="sign-up">
                            <div className="sign-up-field-top sign-up-top-ovr">
                                USERNAME
                                <br />
                                <input className="sign-up-input" />
                            </div>
                            <div className="sign-up-field">
                                PASSWORD
                                <br />
                                <input type="password" className="sign-up-input" />
                            </div>
                            <div className="sign-up-field">
                                CONFIRM PASSWORD
                                <br />
                                <input type="password" className="sign-up-input" />
                            </div>
                        </div>
                        <div className="sign-up-subtitle-top subtitle">
                            WHAT AM I SIGNING UP FOR&nbsp;
                            <i className="fas fa-angle-right"></i>
                            <i className="fas fa-angle-right"></i>
                        </div>
                        <div className="sign-up-subtitle-bottom subtitle">
                            ASK US ANYTHING&nbsp;
                            <i className="fas fa-angle-right"></i>
                            <i className="fas fa-angle-right"></i>
                        </div>
                        <div className="btn-subtitle">
                            <span>CONTINUE YOUR JOURNEY&nbsp;</span>
                            <i className="fas fa-angle-right"></i>
                            <i className="fas fa-angle-right"></i>
                            <i className="fas fa-angle-right"></i>
                        </div>
                        <div className="sign-up-btn">SIGN UP</div>
                    </div>
                    <div className="login-logo">
                        <img className={`login-logo-img-top ${showLogo}`} alt="login" src={LoginLogoTop} />
                        <img className={`login-logo-img-bottom ${showLogo}`} alt="login" src={LoginLogoBot} />
                    </div>
                    <div className={`land ${showInfo}`}>
                        <img alt="hand" src={HandLogo} />
                    </div>
                    <div className={`login-footer ${showInfo}`}>
                        <div className="login-footer-wide">
                            <i className="far fa-copyright"></i> CHADS
                        </div>
                        <div className="login-footer-thin">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="login-footer-thin">
                            <i className="fab fa-twitter"></i>
                        </div>
                        <div className="login-footer-thin">
                            <i className="fab fa-instagram"></i>
                        </div>
                    </div>
                </div>
                <div className="login-shift">
                    <div className="shift-btn" onClick={this.shift}>
                        <i className="shift-icon fas fa-leaf"></i>
                    </div>
                </div>
                <div className={`login-right ${showRight}`}>

                </div>
            </div>
        );
    }
}

export default Login;