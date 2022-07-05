import React from 'react';
import Task from '../../builder/Task';

export default function TaskPage(props) {

	return(
		<div className="flex justify-center items-center">
			<ul className="flex flex-col justify-center items-start w-full">
				{
					props.tasks.map(task => {
						return (<Task key={task._id} task={task} refreshTasks={props.refreshTasks} startTask={props.startTask} stopTask={props.stopTask}></Task>)
					})
				}
			</ul>
		</div>
	);
}