import ResponseStatus from '../../helper/ResponseStatus';



export default function error(props) {

	let checkServerAvailability = () => {
		setTimeout(async () => {
			let request = await fetch('/api',{
				method : 'GET'
			});

			 console.log(request.status)
			if(request.status !== 500)
				ResponseStatus(request, () => {window.location.replace('/home')},  () => {window.location.replace('/')});
			else 
				checkServerAvailability();
		
		}, 2000);
	};

	let renderMessage = () => {
		console.log(window.location.pathname.replace('/error/', ''));
		switch(window.location.pathname.replace('/error/', '')) {
			case '404' : 
				return 'Resource not found';
			case '500' :
				checkServerAvailability();
				return 'Server is currently not available';
			default : 
				return;
		}
	}

	return(
		<>
			<p>{renderMessage()}</p>
		</>
	);
}