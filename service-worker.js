//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function(event) {
	event.waitUntil(caches.open("feelingunlucky").then(function(cache) {
		return cache.addAll([
			"/css/homepage.css",
			"/js/trianglify.js",
			"/js/confetti.js",
			"/js/google-search.js",
			"/js/jquery.js",
			"/js/jquery-color.js",
			"/js/main.js",
			"/js/facebook-header.js",
			"/js/twitter-share.js",
			"/index.html",
			"/favicon.ico"
		]);
	}));
});

self.addEventListener("fetch", function(event) {
	event.respondWith(fetch(event.request).catch(function() {
		return caches.open("feelingunlucky").then(function(cache) {
			console.log("/" + event.request.url.split("?")[0].replace(/^(?:\/\/|[^\/]+)*\//, ""));
			return cache.match("/" + event.request.url.split("?")[0].replace(/^(?:\/\/|[^\/]+)*\//, ""));
		});
	}));
});