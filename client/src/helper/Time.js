export function getTime(date = null) {
	if (!date) date = new Date();

	let hour = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
	let minutes = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
	let seconds = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;

	return `${hour}${minutes}${seconds}`;
}

export function getDate(dateObj = null) {
	if(!dateObj) dateObj = new Date();

	let year = dateObj.getFullYear();
	let month = dateObj.getMonth() + 1;
	let date = dateObj.getDate();
	
	month = month > 9 ? `${month}` : `0${month}`;
	date = date > 9 ? `${date}` : `0${date}`;

	return `${year}-${month}-${date}`;
}

export function getDateBefore(dateObj = null) {
	if(!dateObj) dateObj = new Date();

	dateObj.setDate(dateObj.getDate() - 1);

	let year = dateObj.getFullYear();
	let month = dateObj.getMonth() + 1;
	let date = dateObj.getDate();

	// if(date < 1) month = month - 1;
	// if(month < 1) year = year - 1;
	
	month = month > 9 ? `${month}` : `0${month}`;
	date = date > 9 ? `${date}` : `0${date}`;

	return `${year}-${month}-${date}`;
}