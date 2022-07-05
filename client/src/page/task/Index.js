import { useEffect, useState } from "react";
import { createICS } from "../../helper/Icalendar";
import responseStatus from "../../helper/ResponseStatus";
import { getDate } from "../../helper/Time";
import TaskForm from "../../component/TaskForm/TaskForm";
import PositiveButton from "../../builder/PositiveButtonBuilder";

export default function Task(props) {

	const [date, setDate] = useState(new Date());
	const [tasks, setTasks] = useState(null);

	useEffect(() => {
		if(tasks == null) fetchTasks();
		document.getElementById('calendar').value = getDate(date);
	})

	let fetchTasks = async () => {
		let request = await fetch(process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_HOST}/v1/task/date/${date}` : `/v1/task/date/${date}`, {
			method : 'GET'
		});
		
		let onsuccess = async () => {
			// setTasks(await request.json());
		}
		
		responseStatus(request, onsuccess);

	}

	let getPreviousDate = () => {
		let currentDate = new Date(date);

		currentDate.setDate(currentDate.getDate() - 1);
		
		setDate(currentDate);
		setTasks(null);
	}
	
	let getNextDate = () => {
		let currentDate = new Date(date);
		
		currentDate.setDate(currentDate.getDate() + 1);
		
		setDate(currentDate);
		setTasks(null);
	}

	let dateChangeHandler = (event) => {
		let newDate = event.target.value;
		newDate == null || newDate.length < 1 ? setDate(new Date()) : setDate(new Date(newDate)); 
		setTasks(null); 
	}

	let exportButtonHandler = () => {
		
		if(tasks == null || tasks.length < 1) return;

		let icalendarContent = createICS(tasks);

		let icalendarBlob = new Blob([icalendarContent], {type : 'text/calendar;charset=utf-8'});
		let url = URL.createObjectURL(icalendarBlob);

		let hyperlink = document.createElement('a');
		hyperlink.href = url;
		hyperlink.download = `${getDate(date)}_icalendar.ics`;
		hyperlink.click();
		
		
	}
	
	return(
		<>
			<div className="flex items-center justify-center gap-8">
				<button className="cursor-pointer" onClick={getPreviousDate}>prev</button>
				<div>
					<input type="date" id="calendar" className="text-right" onChange={dateChangeHandler}/> 
				</div>
				<button className="cursor-pointer" onClick={getNextDate}>next</button>
			</div>
			<div className="flex justify-between px-4 mt-8">
				<span></span>
				<PositiveButton message="Export" callback={exportButtonHandler}/>
			</div>
			<TaskForm start_time={date} refreshTasks={fetchTasks}/>
			<div>
				{	
					tasks == null ?
					<p>Loading</p>
					:
					tasks.map(element => {
						return <p key={element.title}>{element.title}</p>
					})
				}
			</div>
		</>
	);
}