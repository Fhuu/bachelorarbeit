import PositiveButtonBuilder from '../../builder/PositiveButtonBuilder';
import responseStatus from '../../helper/ResponseStatus';
import './onDoingTask.css';

export default function onDoingTask(props) {

	let dragOverHandler = (event) => {
		event.preventDefault();

	}
	let dropHandler = (event) => {
		var task = event.dataTransfer.getData('task');
		console.log(task);
		props.startTask(JSON.parse(task));
	}

	let taskDoneHandler = async () => {

		let onsuccess = () => {
			props.refreshTasks();
			props.stopTask();
		}
		
		if (props.onGoingTask.completed) return onsuccess();


		let completeRequest = await fetch(`/v1/task/complete/${props.onGoingTask._id}`);
		responseStatus(completeRequest, onsuccess);
		
	}

	return(
		<div id="on-going-task-container" onDragOver={dragOverHandler} onDrop={dropHandler}>
			<p className="text-left">Doing: </p>
			{
				props.onGoingTask == null ? 
				<section id="hint-message-container">
					<p id="hint-message">Drag the task below and drop here</p> 
				</section>
				: 
				<section id="on-going-task-detail">
					<div id={`task-${props.onGoingTask._id}`} className="flex items-center w-full text-justify pr-4" draggable="true">
						<label id="task-label">{props.onGoingTask.title}</label>
					</div>
					<PositiveButtonBuilder message="done" callback={taskDoneHandler}></PositiveButtonBuilder>
				</section>
			}
		</div>
	);
}