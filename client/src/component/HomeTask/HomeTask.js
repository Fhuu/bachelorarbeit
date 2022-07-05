import React from 'react';

import TaskList from '../TaskList/TaskList';
import TaskForm from '../TaskForm/TaskForm';
import OnDoingTask from '../OnDoingTask/OnDoingTask';

import { parseDate } from '../../helper/DateParser';
import responseStatus from '../../helper/ResponseStatus';

export default class HomeTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks : []
		}
	}

	async componentDidMount () {
 		this.refreshTasks();
	}

	refreshTasks = async () => {
		let tasksRequest = await fetch(`/v1/task/date/${parseDate(new Date())}`, {
			method : 'GET'
		});

		let onsuccess = async() => {
			let tasks = await tasksRequest.json();
	
			this.setState({
				tasks : tasks
			});
		};

		responseStatus(tasksRequest, onsuccess);
		
	}

	dragOverHandler = (event) => {
		event.preventDefault();
	}

	render() {
		return(
			<div style={{background: '#444', padding : '1rem'}}>
				<OnDoingTask startTask={this.props.startTask} onGoingTask={this.props.onGoingTask} stopTask={this.props.stopTask} refreshTasks={this.refreshTasks} />
				<TaskForm refreshTasks={this.refreshTasks} />
				<TaskList refreshTasks={this.refreshTasks} tasks={this.state.tasks} startTask={this.props.startTask} stopTask={this.props.stopTask} />
			</div>
		);
	}
}