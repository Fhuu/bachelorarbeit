

export function getAllNote(onsuccessCallback) {
	let IDBOpenRequest = window.indexedDB.open('ba');
	IDBOpenRequest.onsuccess = function(event) {
		let transaction = event.target.result.transaction('Notes', 'readonly');

		let store = transaction.objectStore('Notes');

		let request = store.getAll();

		request.onsuccess = function(event) {
			onsuccessCallback(event.target.result)
		}

		request.onerror = function(error) {
			console.error(error);
		}
	}
}

export function saveNote(data) {
	let IDBOpenRequest = window.indexedDB.open('ba');

	IDBOpenRequest.onsuccess = function(event) {
		let transaction = event.target.result.transaction('Notes', 'readwrite');

		let store = transaction.objectStore('Notes');
		
		let request = store.put(data);

		request.onsuccess = function(event) {
			console.log(event.target.result);
		}

		request.onerror = function(error) {
			console.error(error);
		}
	}
}

export function getNote(id, onsuccessCallback) {
	let IDBOpenRequest = window.indexedDB.open('ba');

	IDBOpenRequest.onsuccess = function(event) {
		let transaction = event.target.result.transaction('Notes', 'readonly');

		let store = transaction.objectStore('Notes');

		let request = store.get(id);

		request.onsuccess = function(event) {
			onsuccessCallback(event.target.result);
		}

		request.onerror = function(error) {
			console.error(error);
		}
	}
}