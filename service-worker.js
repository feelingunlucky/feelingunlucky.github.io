//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function(event) {
	event.waitUntil(caches.open("feelingunlucky").then(function(cache) {
		return cache.addAll([
			'/css/homepage.css',
			'/js/trianglify.js',
			'/js/confetti.js',
			'/js/google-search.js',
			'/js/jquery.js',
			'/js/jquery-color.js',
			'/js/main.js',
			'/js/facebook-header.js',
			'/js/twitter-share.js',
			'/index.html'
		]);
	}));
});
/*//If any fetch fails, it will show the offline page
self.addEventListener("fetch", function(event) {
	if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin")
		return;
	event.respondWith(fetch(event.request).catch(function(error) {
		return caches.open("home").then(function(cache) {
			return cache.match("index.html");
		});
	}));
});*/

self.addEventListener("fetch", function(event) {
	event.respondWith(fetch(event.request).catch(function(error) {
		return caches.open("feelingunlucky").then(function(cache) {
			console.log("Request: " + JSON.stringify(event.request));
			return cache.match(event.request);
		});
	}));
});