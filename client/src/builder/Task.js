import React from 'react';
import NegativeButton from './NegativeButtonBuilder';
import PositiveButton from './PositiveButtonBuilder';
import './Task.css';

export default class Task extends React.Component {

	componentDidMount() {
		this.checkCompletion();
	}

	componentDidUpdate() {
		this.checkCompletion();
	}

	checkCompletion = () => {
		if(this.props.task.completed) document.getElementById(`${this.props.task._id}-task-completion`).checked = true;
		else document.getElementById(`${this.props.task._id}-task-completion`).checked = false;
	}

	deleteTask = async () => {
		let deleteRequest = await fetch('/v1/task', {
			method: 'DELETE',
			headers : {
				'content-type' : 'application/json'
			},
			body : JSON.stringify({
				_id : this.props.task._id
			})
		});

		if(deleteRequest.status === 200) this.props.refreshTasks();

		this.props.stopTask();
	}

	changeCompletion = async () => {
		if(document.getElementById(`${this.props.task._id}-task-completion`).checked) this.props.stopTask(); 
		let completeRequest = await fetch(`/v1/task/complete/${this.props.task._id}`);

		if(completeRequest.status === 201 || completeRequest.status === 200) this.props.refreshTasks();
	}

	showButtons = () => {
		document.getElementById(`task-button-${this.props.task._id}`).classList.add('active');
	}

	unshowButtons = () => {
		document.getElementById(`task-button-${this.props.task._id}`).classList.remove('active');
	}

	startTask = () => {
		this.props.startTask(this.props.task);
	}

	dragHandler = (event) => {
		console.log(this.props.task);
		event.dataTransfer.setData('task', JSON.stringify(this.props.task));
	}

	render() {
		return(
			<li key={this.props.task._id} className="w-full">
				<div id={`task-${this.props.task._id}`} className="flex items-center w-full" draggable="true" onDragStartCapture={this.dragHandler}>
					<section id="task-container" onMouseOver={this.showButtons} onMouseOut={this.unshowButtons}>
						<input type="checkbox" className="mr-4" id={`${this.props.task._id}-task-completion`} onChange={this.changeCompletion}/>
						<label id="task-label">{this.props.task.title}</label>
						<div className="task-buttons flex gap-0" id={`task-button-${this.props.task._id}`}>
							<PositiveButton style={{backgroundColor : '#0000'}} message="Start" callback={this.startTask}></PositiveButton>
							<NegativeButton message="Delete" callback={this.deleteTask}></NegativeButton>
						</div>
					</section>
				</div>
			</li>
		);
	}
}