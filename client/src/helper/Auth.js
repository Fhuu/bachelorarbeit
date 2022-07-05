import responseStatus from "./ResponseStatus";

async function checkAuth () {
	let authorization = await fetch('/v1/user', {method: 'GET'});
	
	let onsuccess = async () => {
		return (await authorization.json()).user;		
	}
	 
	let onunauthorized = () => {
		console.log(window.location.pathname);
		if(window.location.pathname != '/login' || window.location.pathname != '/' || window.location.pathname != '/signup') window.location.replace('/');
	
	}
	
	return responseStatus(authorization, onsuccess, onunauthorized);
}

export default checkAuth;