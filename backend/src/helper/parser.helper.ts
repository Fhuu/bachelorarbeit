export default {
	parseDate : (date) => {
		date = new Date(date);
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        let year = date.getFullYear().toString();
        if(parseInt(day) < 10) day = `0${day}`;
        if(parseInt(month) < 10) month = `0${month}`;

		return `${year}-${month}-${day}`;
	}
}