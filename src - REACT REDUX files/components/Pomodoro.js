    // 25 + 5 Project //
// © Created by Caviar9045 //

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { statusTimer, setTime, addTime, subTime, addBreakTime, subBreakTime } from '../actions';
import moment from 'moment';

import alertFX from '../sounds/wooduialert-1jump.mp3'
import alertBreakFX from '../sounds/uialert-sfx.mp3'

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: props.time,
            breakRemaning: props.breakLength,
            buttonHandlerLabel: 'Start',
            sessionStarted: false,
            isBreak: false,
            sessionTitle: 'Initial Timer:'
        };
    }

    componentDidMount() {
        if (this.props.init) {
            this.Timer();
        }
        else { }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handlePlayPauseButton = () => {
        if (this.state.sessionStarted) {
            this.setState({ buttonHandlerLabel: 'Start', sessionStarted: false });
            this.handlePauseButton();
        }
        else {
            this.setState({ buttonHandlerLabel: 'Pause', sessionStarted: true });
            this.handlePlayButton();
        }
    }

    handlePlayButton = () => {
        if (this.props.init) { }
        else {
            this.props.status(1);
            this.Timer();
        }
    }

    handlePauseButton = () => {
        this.props.status(0);
        clearInterval(this.interval);
    }

    handleResetButton = () => {
        this.props.status(0);
        clearInterval(this.interval);
        this.setState({ timeRemaining: this.props.time });
        this.handleStopSound();
    }

    handleBreakUpButton = () => {
        this.props.addbreaktime();
    }

    handleBreakDownButton = () => {
        this.props.subbreaktime();
    }

    handleUpButton = () => {
        this.props.addtime();
        this.setState({ timeRemaining: this.props.time + 60 });
        clearInterval(this.interval);
    }

    handleDownButton = () => {
        this.props.subtime();
        this.setState({ timeRemaining: this.props.time - 60 });
        clearInterval(this.interval);
    }

    handlePlaySound = () => {
        if (this.state.isBreak) {
            const audio = document.querySelector('#beep-break');
            audio.currentTime = 0;
            audio.play();
        }
        else {
            const audio = document.querySelector('#beep')
            audio.currentTime = 0;
            audio.play();
        }
    }

    handleStopSound = () => {
        if (this.state.isBreak) {
            const audio = document.querySelector('#beep-break');
            audio.pause();
            audio.currentTime = 0;
        }
        else {
            const audio = document.querySelector('#beep')
            audio.pause();
            audio.currentTime = 0;
        }
    }

    Timer = () => {
        this.interval = setInterval(() => {
            const timeRemaining = this.state.timeRemaining - 1;
            this.setState({ timeRemaining });
            if (timeRemaining === 0) {
                this.handlePlaySound();
                clearInterval(this.interval);
                if (this.state.isBreak) {
                    this.setState({ timeRemaining: this.props.time, sessionTitle: 'Focus Mode 🎯' });
                    this.state.isBreak = false;
                    this.Timer();
                }
                else {
                    this.setState({ timeRemaining: this.props.breakLength, sessionTitle: 'Break Time ☕' });
                    this.state.isBreak = true;
                    this.Timer();
                }
            }
        }, 1000);
    }

    render() {
        const { timeRemaining } = this.state;
        const formattedTime = moment.utc(timeRemaining * 1000).format('mm:ss');
        return (
            <div className='wrapper'>
                <div className='title'><h1>🍅 Pomodoro Timer 🍅</h1></div>
                <div className='session'>
                    <h2 id="timer-label">{this.state.sessionTitle}</h2>
                    <h2 id="time-left">{formattedTime}</h2>
                    <button onClick={this.handlePlayPauseButton} id="start_stop">{this.state.buttonHandlerLabel}</button>
                    <button onClick={this.handleResetButton} id="reset">Reset</button>
                    <audio src={alertFX} id="beep"></audio>
                    <audio src={alertBreakFX} id="beep-break"></audio>
                </div>
                <div className='opts'>
                    <div className='session-opt'>
                        <h2 id="session-label">Session Length</h2>
                        <p id="session-length">{moment.utc(this.props.time * 1000).format('mm:ss')}</p>
                        <button onClick={this.handleUpButton} id="session-increment">Up</button>
                        <button onClick={this.handleDownButton} id="session-decrement">Down</button>
                    </div>
                    <div className='break-opt'>
                        <h2 id="break-label">Break Length</h2>
                        <p id="break-length">{moment.utc(this.props.breakLength * 1000).format('mm:ss')}</p>
                        <button onClick={this.handleBreakUpButton} id="break-increment">Up</button>
                        <button onClick={this.handleBreakDownButton} id="break-decrement">Down</button>
                    </div>
                </div>
                <div className="footer">
                    <p className="footer-by">© Created by<a id="footer-a" href="https://github.com/Caviar9045" target="_blank"> Caviar9045 <i className="fa fa-github"></i></a></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    time: state.time,
    init: state.init,
    breakLength: state.breakLength
});

const mapDispatchToProps = dispatch => {
    return {
        status: sts => dispatch(statusTimer(sts)),
        set: (tm) => dispatch(setTime(tm)),
        addtime: () => dispatch(addTime()),
        subtime: () => dispatch(subTime()),
        addbreaktime: () => dispatch(addBreakTime()),
        subbreaktime: () => dispatch(subBreakTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);