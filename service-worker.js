self.addEventListener("install",function(e){if("only-if-cached"!==e.request.cache||"same-origin"===e.request.mode){var n=new Request("/index.html");e.waitUntil(fetch(n).then(function(e){return caches.open("feelingunlucky-offline").then(function(t){return t.put(n,e)})}))}}),self.addEventListener("fetch",function(e){"only-if-cached"===e.request.cache&&"same-origin"!==e.request.mode||e.respondWith(fetch(e.request).catch(function(e){return caches.open("feelingunlucky-offline").then(function(e){return e.match("/index.html")})}))}),self.addEventListener("refreshOffline",function(e){return caches.open("feelingunlucky-offline").then(function(n){return n.put(offlinePage,e)})});