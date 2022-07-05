/**
 * 
 * @param {Request} request  
 * @param {() => any} onsuccess 
 * @param {() => any} onunauthorized 
 * @param {() => any} onservererror 
 * @returns void
 */
export default function responseStatus(request, onsuccess = null, onunauthorized = null, onservererror = null) {
	switch(request.status) {
		case 200 : 
			if(onsuccess != null) return onsuccess();
			return;
		case 201 : 
			if(onsuccess != null) return onsuccess();
			return;
		case 401 : 
			if(onunauthorized == null) return window.location.replace('/login');
			return onunauthorized();
		case 500 : 
			if(onservererror == null) window.location.replace('/error/500'); 
			return onservererror();
		default :
			return window.location.replace('/home');
	}
}