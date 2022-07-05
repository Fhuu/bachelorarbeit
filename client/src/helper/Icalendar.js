import { v4 } from 'uuid';
import { getDate } from './Time';

export function createICS(eventCollection) {
	let issueDate = createDate(new Date());
	
	console.log(issueDate);

	let events = [];
	
	for(let index in eventCollection) {
		events.push(createEvent(issueDate, eventCollection[index]));
	}

	return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:BA-Prototype\n${events.join('\n')}\nEND:VCALENDAR`;

}

function createEvent(issueDate, event) {
	let start = getDate(new Date(event.start_time)).split('-').join('');

	return `BEGIN:VEVENT\nUID:${v4()}\nDTSTAMP:${issueDate}\nDTSTART;VALUE=DATE:${start}\nSUMMARY:${event.title}\nEND:VEVENT`;
}

let createDate = (dateObj) => {
	let year = dateObj.getFullYear();
	let month = dateObj.getMonth() + 1;
	month = month < 10 ? `0${month}` : month;
	let date = dateObj.getDate();
	date = date < 10 ? `0${date}` : date;
	
	let hour = dateObj.getHours();
	hour = hour < 10 ? `0${hour}` : hour;
	let minute = dateObj.getMinutes();
	minute = minute < 10 ? `0${minute}` : minute;
	let second = dateObj.getSeconds();
	second = second < 10 ? `0${second}` : second;

	return `${year}${month}${date}T${hour}${minute}${second}`;
}