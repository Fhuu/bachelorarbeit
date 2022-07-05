/**
 * Initiate indexedDB for the client on first request
 */
export function initiate() {
	let IDBOpenRequest = window.indexedDB.open('ba',1);

	IDBOpenRequest.onsuccess = function (event) {
		console.log('Done initiating database');
	}

	IDBOpenRequest.onerror = function (error) {
		console.log('Error initiating database', error);
	}
	IDBOpenRequest.onupgradeneeded = function(event) {
		let db = event.target.result;
		
		if (!db.objectStoreNames.contains('Notes')) 
			db.createObjectStore('Notes' , {keyPath : 'id'});

		if(!db.objectStoreNames.contains('Sessions'))
			db.createObjectStore('Sessions', {autoIncrement : true});
	}
};

/**
 * 
 * @param {string} storeName name of the store
 * @param {JSON} data object data to save into the store
 * @param {Element} messageholder 
 */
export function addOrUpdate (storeName, data, key = null, messageholder = null, callback = null) {
	let IDBOpenRequest = window.indexedDB.open('ba');

	IDBOpenRequest.onsuccess = function(event) {	
		try {
			let transaction = event.target.result.transaction(storeName, 'readwrite');

			let store = transaction.objectStore(storeName);

			console.log(key);
			
			let request; 
			if(key != null)
				request = store.put(data, key);
			else
				request = store.put(data);

			request.onsuccess = function(event) {
				if(callback != null) callback(request.result);
				if(messageholder != null) messageholder.innerHTML = '<span>Data added to the database</span>';
			}

			request.onerror = function(error) {
				if(messageholder != null) messageholder.innerHTML = '<span>Error when adding data to database</span>';
			}
		}	
		catch (error) {
			console.log(error);
			createObjectStore(storeName);
			addOrUpdate(storeName, data, messageholder);
			
		}
	}
	
	IDBOpenRequest.onerror = function(error) {
		console.log(`error ${error}`)
	};
	
};

/**
 * 
 * @param {string} storeName 
 * @param {string} id 
 * @param {Element} messageholder 
 * @param {() => void} callback 
 */
export function	get (storeName, id, messageholder = null, callback = null) {
	let IDBOpenRequest = window.indexedDB.open('ba');

	IDBOpenRequest.onsuccess = function(event) {
		
		try {
			let transaction = event.target.result.transaction(storeName, 'readonly');

			let store = transaction.objectStore(storeName);

			let request = store.get(id);

			request.onsuccess = function(event) {
				callback(request.result);
				if(request.result)
					messageholder.innerHTML = '<span>Data fetched from the database</span>';
				else 
					messageholder.innerHTML = '<span>New Note created</span>'
			}

			request.onerror = function(error) {
				messageholder.innerHTML = '<span>Error when fetching data to database</span>';
			}
		} catch (error) {
			console.log(error);
			createObjectStore(storeName);
			get(storeName, id, messageholder, callback);
		}

	}
	
	IDBOpenRequest.onerror = function(error) {
		console.log(`error ${error}`)
	};
};

/**
 * 
 * @param {string} storeName 
 * @param {Element} messageholder 
 * @param {() => void} callback 
 */
export function getAll (storeName, messageholder = null, callback = null) {
	let IDBOpenRequest = window.indexedDB.open('ba');

	IDBOpenRequest.onsuccess = function(event) {
		
		try {
			let transaction = event.target.result.transaction(storeName, 'readonly');

			let store = transaction.objectStore(storeName);

			let request = store.getAll();

			request.onsuccess = function(event) {
				if (callback) callback(request.result);
			
				if(messageholder) {

					if(request.result)
						messageholder.innerHTML = '<span>Data fetched from the database</span>';
					else 
						messageholder.innerHTML = '<span>New Note created</span>'
				}
			}

			request.onerror = function(error) {
				if (messageholder) messageholder.innerHTML = '<span>Error when fetching data to database</span>';
			}
		} catch (error) {
			console.log(error);
			createObjectStore(storeName, () => {getAll(storeName, messageholder, callback);});
			
		}
		finally {

		}

	}
	
	IDBOpenRequest.onerror = function(error) {
		console.log(`error ${error}`)
	};
};

/**
 * 
 * @param {string} storeName 
 */
var createObjectStore = (storeName, onsuccess = null) => {
	let IDBOpenRequest = window.indexedDB.open('ba');

	IDBOpenRequest.onsuccess = function(event) {
		console.log(`database opened to create objectstore`);
		console.log(event.target.result.objectStoreNames);

		let newVersion = window.indexedDB.open('ba', parseInt(event.target.result.version) + 1);

		newVersion.onsuccess = function (event) {
			console.log('opened version 2');
			if(onsuccess != null) onsuccess();
		}

		newVersion.onerror = function (error) {
			console.log('error version 2', error);
		}
		newVersion.onupgradeneeded = function(event) {
			let db = event.target.result;

			db.createObjectStore(storeName, getDatabaseOptions(storeName));

			console.log(`created objectstore for ${storeName}`)

			window.location.reload();

		}
		// console.log(event.target, typeof event.target.result.objectStoreNames);
	}

	IDBOpenRequest.onerror = function(error) {
		console.log(`error ${error.target.errorCode}`)
	}
}

/**
 * 
 * @param {string} storeName 
 */
let getDatabaseOptions = (storeName) => {
	console.log(`Getting options for ${storeName} object store.`)
	switch(storeName.toLowerCase()) {
		case 'sessions' : 
			return {
				autoIncrement : true
			}
		default : 
			return {
				keyPath : 'id'
			}
	}
}