// const cacheName = 'cache-v1';
// const resourcesToPreCache = [
// 	'/',
// 	'index.html',
// 	'./*'
// ]

// self.addEventListener('install', event => {
// 	console.log('Install event');
// 	event.waitUntil(
// 		caches.open(cacheName)
// 		.then(cache => {
// 			return cache.addAll(resourcesToPreCache);
// 		})
// 	)
// })

// self.addEventListener('activate', event => {
// 	console.log('Activate event');
// })

// self.addEventListener('fetch', event => {
// 	console.log('Fetch intercepted for:', event.request.url);
// })