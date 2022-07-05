import React from 'react';

import PositiveButton from '../../builder/PositiveButtonBuilder';
import responseStatus from '../../helper/ResponseStatus';

import './TaskForm.css';

export default class TaskForm extends React.Component {

	constructor(props) {
		super(props);
	}

	submitFormHandler = async () => {

		let title = document.getElementById('task-title').value;

		if(title.length < 1) return;
		
		let taskRequest = await fetch('/v1/task', {
			method: 'POST',
			headers : {
				'content-type' : 'application/json'
			},
			body : JSON.stringify({
				title : title,
				start_time : this.props.start_time == null ? new Date() : new Date(this.props.start_time)
			})
		})

		let onsuccess = () => {
			this.props.refreshTasks();
			document.getElementById('task-title').value = '';
		}
		
		responseStatus(taskRequest, onsuccess);
	}

	taskForm = () => {
		return(
			<>
				<form className="container items-center">
					<div></div>
					<input type="text" id="task-title" placeholder="Task Title" className="text-center py-1 w-full" />
					<PositiveButton message="Add" callback={this.submitFormHandler}>
						<svg xmlns="http://www.w3.org/2000/svg" width="56" height="28" fill="#2229" className="bi bi-plus-circle bg-white p-1 rounded-full mx-auto" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
						</svg>
					</PositiveButton>
				</form>
			</>
		);
	}

	render() {
		return(
			<>
				{this.taskForm()}
			</>
		);
	}
}