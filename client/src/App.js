import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import React from 'react';

import Navigation from './component/NavigationBar/Navigation';
import Home from './page/home/Index';
import Task from './page/task/Index';
import User from './page/user/Index';
import Auth from './page/auth/Index';
import Note from './page/note/Index';
import NoteEditor from './component/Note/NoteEditor';
import Error from './page/error/Index';
import { addOrUpdate, initiate } from './helper/database';
import {getTime, getDate, getDateBefore} from './helper/Time';

class App extends React.Component {

	componentDidMount() {
		initiate();
	}

	constructor(props) {

		super(props);
		
		this.countdown = null; // Timer countdown interval variable

		this.date = getDate();

		this.state = {
			//#region Timer States
			work : true,
			timer : 1,
			buttontype : 'start',
			workCycle : 25,
			restCycle : 5,
			cycleCount : 0,
			startTime : null,
			timerid : null,
			//#endregion
			//#region OnGoingTask States
			onGoingTask : null,
			doneTasks : [],
			taskCycle : 0,
			//#endregion
		}
	}

	//#region Timer Functions and State Controller
	startCountdown = () => {
		let time = getTime();

		this.setState({
			buttontype : 'interrupt',
			startTime : time,
			cycleCount : this.state.work ? this.state.cycleCount + 1 : this.state.cycleCount,
			doneTasks : [],
		}, () => {

			let onsuccess = id => {
				this.setState({timerid : id});
			}

			addOrUpdate('Sessions', {date : this.date, start : time, onGoingTask : this.state.onGoingTask}, null, null, onsuccess);

			this.countdown = setInterval(() => {
				this.setState({
					timer : this.state.timer - 1
				}, () => {
					if(this.state.timer === 0) {
						this.changeSession();
					}
				});
			}, 1000);

		});
	}

	changeState = (stateChanges, callback = null) => {
		this.setState(stateChanges, () => {if(callback != null) callback()});
	}

	stopCountdown = () => {
		clearInterval(this.countdown);
		this.stopTask();
		addOrUpdate('Sessions', {date: this.date, start: this.state.startTime, end : getTime(), doneTasks : this.state.doneTasks, onGoingTask : this.state.onGoingTask}, this.state.timerid);
	}

	changeSession = () => {
		let onsuccess = id => {
			this.setState({timerid : id});
		}

		// Transition from work to pause
		if(this.state.work) addOrUpdate('Sessions', {date : this.date, start : this.state.startTime, end : getTime() ,doneTasks : this.state.doneTasks, onGoingTask : this.state.onGoingTask}, this.state.timerid);
		// Transition from pause to work
		if(!this.state.work) addOrUpdate('Sessions', {date : this.date, start : getTime(), onGoingTask : this.state.onGoingTask}, null, null, onsuccess);

		this.setState({
			work : !this.state.work,
			doneTasks : []
		}, () => {
			
			if(this.state.work) {
				this.setState({timer : this.state.workCycle * 60, cycleCount : this.state.cycleCount + 1});
				return;
			}

			if(this.state.cycleCount % 4 === 0) {
				this.setState({timer : this.state.restCycle * 3 * 60, doneTasks : []});
				return;
			}

			this.setState({timer: this.state.restCycle * 60, doneTasks : []});


		});
	} 
	//#endregion

	//#region OnGoingTask Functions and State Controller

	startTask = (task) => {
		this.setState({
			onGoingTask : task
		}, () => {
			console.log(this.state.onGoingTask);
		});
	}

	stopTask = () => {
		let doneTasks = this.state.doneTasks;

		if(this.state.onGoingTask != null) {
			doneTasks.push(this.state.onGoingTask);
	
			this.setState({
				doneTasks : doneTasks,
				onGoingTask : null
			}, () => {
				console.log(this.state.doneTasks);
			});
		}
	}

	resetTasks = () => {
		this.setState({
			doneTasks : [],
			onGoingTask : null
		}, () => {
			console.log(`task reset to ${this.state}`);
		})
	}
	//#endregion

	//#region Component render function
	render() {
		return (
			<div className="App">
				<div>
					<Router>
						<Navigation />
						<Switch>
							<Route path="/home" exact>
								<Home 
									//#region timer props
									work={this.state.work} 
									timer={this.state.timer}
									buttontype={this.state.buttontype}
									workCycle={this.state.workCycle}
									restCycle={this.state.restCycle}
									cycleCount={this.state.cycleCount}
									startTime={this.state.startTime}
									changeState={this.changeState}
									startCountdown={this.startCountdown}
									stopCountdown={this.stopCountdown}
									//#endregion

									//#region OnGoingTask props
									onGoingTask={this.state.onGoingTask}
									startTask={this.startTask}
									stopTask={this.stopTask}
									resetTasks={this.resetTasks}
									//#endregion
								/>
							</Route>
							<Route path="/task">
								<Task />
							</Route>
							<Route path={['/login', '/']} exact>
								<Auth path="login" />
							</Route>
							<Route path='/signup'>
								<Auth path="signup" />
							</Route>
							<Route path='/user'> 
								<User />
							</Route>
							<Route path='/note' exact>
								<Note />
							</Route>
							<Route path='/note/:noteID'>
								<NoteEditor />
							</Route>
							<Route path ='/error/:type'>
								<Error />
							</Route>
						</Switch>
					</Router>
				</div>
			</div>
		);
	}
	//#endregion
}

export default App;
