import React from 'react';

import checkAuth from '../../helper/Auth';
import Button from '../../builder/PositiveButtonBuilder';
import StopButton from '../../builder/NegativeButtonBuilder';

import { addOrUpdate, getAll } from '../../helper/database';

import './SessionTimer.css';


export default class SessionTimer extends React.Component {

	saveSession = async () => {
		addOrUpdate('Sessions', {tasksDone : [this.props.tasksDone], tasksDoing : this.props.this.props.onGoingTask});
	}

	reset = () => {
		this.props.changeState({
			work : true,
			timer : 25 * 60,
			buttontype : 'start',
			cycleCount : 1
		});
	}

	startSession = async () => {
		let user = await checkAuth();
		if (user) {
			this.props.startCountdown();
		}

	}

	stopSession = () => {
		this.props.stopCountdown();
		this.props.changeState({
			buttontype : 'start',
			work : true,
			timer : this.props.workCycle * 60,
			cycleCount : 0,
		})
	}

	renderSeconds = () => {
		let seconds = this.props.timer % 60;
		if(seconds <= 9) return `0${seconds}`;
		return seconds;
	}
	
	renderMinutes = () => {
		let minutes = parseInt(this.props.timer / 60);
		if(minutes <= 9) return `0${minutes}`;
		return minutes;
	}

	button = () => {
		if(this.props.buttontype === 'start') return <Button message="Start" callback={this.startSession} />;
		return (
			<>
				<StopButton message="Stop" callback={this.stopSession}></StopButton>
			</>
		);
	}

	createBadges = () => {
		let array = [];
		for(let index = 1; index <= this.props.cycleCount; index++) {
			array.push(index);
		}

		if(array.length < 1) return [''];
		
		return array;
	}
	
	render() {
		return(
			<div className='session-container'>
				<div className='badge-container'>{this.createBadges().reverse().map(element => {return element === '' ? <p key={element} className='badges'></p> : <p key={element} style={{backgroundColor: '#b4b4b4', color: '#2e2e2e'}}className='badges'>{element}</p>})}</div>
				<div className="flex flex-col timer-container">
					{this.props.buttontype !== 'start' ? this.props.work ? <span id="work-time">Time to concenctrate</span> : <span id="pause-time">Take it easy for now</span> : <span className="invisible">invisible</span>}
					<span className="py-8 text-white">{this.renderMinutes()} : {this.renderSeconds()}</span>
					<div className="flex justify-around items-center ">
						{this.button()}
					</div>
				</div>
			</div>
		);
	}
}
