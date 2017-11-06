var previousSearch = "";
var searchRunning = false;

onLoad();

function onLoad() {
	$("#jserror").hide();
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(searchString, position) {
			return this.substr(position || 0, searchString.length) === searchString;
		};
	}
	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	if (!Array.from) {
		Array.from = (function() {
			var toStr = Object.prototype.toString;
			var isCallable = function(fn) {
				return typeof fn === "function" || toStr.call(fn) === "[object Function]";
			};
			var toInteger = function(value) {
				var number = Number(value);
				if (isNaN(number)) {
					return 0;
				}
				if (number === 0 || !isFinite(number)) {
					return number;
				}
				return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			var maxSafeInteger = Math.pow(2, 53) - 1;
			var toLength = function(value) {
				var len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};
			// The length property of the from method is 1.
			return function from(arrayLike /*, mapFn, thisArg */ ) {
				// 1. Let C be the this value.
				var C = this;
				// 2. Let items be ToObject(arrayLike).
				var items = Object(arrayLike);
				// 3. ReturnIfAbrupt(items).
				if (arrayLike == null) {
					throw new TypeError("Array.from requires an array-like object - not null or undefined");
				}
				// 4. If mapfn is undefined, then let mapping be false.
				var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				var T;
				if (typeof mapFn !== "undefined") {
					// 5. else
					// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
					if (!isCallable(mapFn)) {
						throw new TypeError("Array.from: when provided, the second argument must be a function");
					}
					// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
					if (arguments.length > 2) {
						T = arguments[2];
					}
				}
				// 10. Let lenValue be Get(items, "length").
				// 11. Let len be ToLength(lenValue).
				var len = toLength(items.length);
				// 13. If IsConstructor(C) is true, then
				// 13. a. Let A be the result of calling the [[Construct]] internal method 
				// of C with an argument list containing the single item len.
				// 14. a. Else, Let A be ArrayCreate(len).
				var A = isCallable(C) ? Object(new C(len)) : new Array(len);
				// 16. Let k be 0.
				var k = 0;
				// 17. Repeat, while k < len… (also steps a - h)
				var kValue;
				while (k < len) {
					kValue = items[k];
					if (mapFn) {
						A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
					} else {
						A[k] = kValue;
					}
					k += 1;
				}
				// 18. Let putStatus be Put(A, "length", len, true).
				A.length = len;
				// 20. Return A.
				return A;
			};
		}());
	}
	document.body.insertBefore(Trianglify({
		width: window.innerWidth,
		height: window.innerHeight,
		cell_size: 100
	}).canvas(), document.body.firstChild);
}

(function($) {
	$.fn.configTextScaling = function(compressor, minFontSize, maxFontSize) {
		compressor = compressor * 0.002 || 0.002;
		maxFontSize = maxFontSize || Number.POSITIVE_INFINITY;
		return this.each(function() {
			var $this = $(this);
			function resizer(){
				$this.css('font-size', Math.max(Math.min($this.width() * compressor, maxFontSize), minFontSize) + "em");
			};
			resizer();
			$(window).on('resize.fittext orientationchange.fittext', resizer);
		});
	};
})(jQuery);

function removeParameter(url, parameter) {
	var urlParts = url.split('?');
	if (urlParts.length >= 2) {
		// Get first part, and remove from array
		var urlBase = urlParts.shift();
		// Join it back up
		var queryString = urlParts.join('?');
		var prefix = encodeURIComponent(parameter) + '=';
		var parts = queryString.split(/[&;]/g);
		// Reverse iteration as may be destructive
		for (var i = parts.length; i-- > 0;) {
			// Idiom for string.startsWith
			if (parts[i].lastIndexOf(prefix, 0) !== -1) {
				parts.splice(i, 1);
			}
		}
		url = urlBase + '?' + parts.join('&');
	}
	return url;
}

function clearResults() {
	$("#results").children(":not(#state)").remove();
}

function onSearchStarted() {
	$("#state").animate({
		color: (searchRunning ? ("#" + Math.floor(Math.random() * 0xFFFFFF).toString(16)) : "#BBBBFF"),
		queue: false,
		duration: 1000,
		complete: function() {
				if (searchRunning)
					setTimeout(onSearchStarted, 4);
			}
	});
}

function onSearchEnded() {
	searchRunning = false;
	$("#state").animate({
		color: "#BBBBFF",
		queue: false,
		duration: 1000
	});
}

function parseResults(lastResult, index, page) { //pages are 0-based, and contain max 100 results.
	var resultsDiv = $("#results");
	resultsDiv.hide();
	clearResults();
	if (lastResult === null) {
		$("#state").text("No results were found.");
	} else {
		$("#state").text("Page " + (page * 10 + Math.floor(index / 10) + 1) + " (results may vary)");
		var temp = Array.from(lastResult.getElementsByTagName("a"));
		for (var j = 0; j < temp.length; j++) {
			var url = temp[j].getAttribute("href");
			if (url.startsWith("/url?q=")) {
				url = removeParameter(url, "sa");
				url = removeParameter(url, "ved");
				url = removeParameter(url, "usg");
				temp[j].href = unescape(url.substring(7));
				temp[j].target = "_blank";
			} else {
				temp[j].parentNode.removeChild(temp[j]);
				temp.splice(j, 1);
				j--;
			}
		}
		if (temp.length > 0) {
			var resultHtml = lastResult.innerHTML;
			var div = document.createElement("div");
			div.innerHTML = resultHtml;
			resultsDiv.append(div);
		}
		var cached = $("#_nBb");
		for (var i = 0; i < cached.length; i++) {
			cached[i].parentNode.removeChild(cached[i]);
		}
	}
	resultsDiv.slideDown("fast").css("display", "inline-block");
}

function runQuery(page, pushState) { //pages are 0-based, and contain max 100 results, max is 9.
	var query = document.getElementById("query").value.trim();
	var resultsSection = $("#results");
	if (query.length === 0) {
		previousSearch = "";
		onSearchEnded();
		if (pushState && !window.location.href.startsWith("file:")) {
			window.history.pushState(query, "Feeling Unlucky", location.origin);
		}
		resultsSection.fadeOut("fast");
	} else {
		if (query === previousSearch) {
			onSearchEnded();
			return;
		}
		if (pushState && !window.location.href.startsWith("file:")) {
			window.history.pushState(query, "Feeling Unlucky - " + query, location.origin + "/?search=" + escape(query));
		}
		clearResults();
		$("#state").text("Searching...");
		resultsSection.slideDown("fast").css("display", "inline-block");
		onSearchStarted();
		var url = "http://www.google.com/search?q=" + escape(query) + "&num=100&start=" + (page * 100) + "&filter=0";
		var xhttp = window.XDomainRequest ? new XDomainRequest() : new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					var resultDocument = document.createElement("html");
					resultDocument.innerHTML = this.responseText;
					var tables = resultDocument.getElementsByTagName("td");
					for (var i = 0; i < tables.length; i++) {
						var id = tables[i].getAttribute("id");
						if (!(id === null || id === "")) {
							tables[i].parentNode.removeChild(tables[i]);
						}
					}
					var results = resultDocument.getElementsByClassName("g");
					if (results.length === 0 && page > 0) {
						page--;
						setTimeout(function() {
							runQuery(page, false);
						}, 4);
					} else {
						previousSearch = query;
						onSearchEnded();
						if (results.length === 0) {
							parseResults(null, 0, page);
						} else {
							parseResults(results[results.length - 1], results.length - 1, page);
						}
					}
				} else {
					previousSearch = "";
					onSearchEnded();
					clearResults();
					$("#state").text("An error occurred while trying to connect to google.com.");
					resultsSection.slideDown("fast").css("display", "inline-block");
				}
			}
		};
		xhttp.open("GET", "http://allow-any-origin.appspot.com/" + url, true);
		xhttp.send(null);
	}
}

function startQuery(pushState) {
	if (!searchRunning) {
		searchRunning = true;
		runQuery(8, pushState);
	}
}

function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) {
		return null;
	}
	if (!results[2]) {
		return "";
	}
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function runQueryFromUrl() {
	var searchQuery = getParameterByName("search");
	if (searchQuery === null || searchQuery === "") {
		document.getElementById("query").value = "";
		clearResults();
		previousSearch = "";
		$("#results").fadeOut("fast");
	} else {
		document.getElementById("query").value = unescape(searchQuery);
		startQuery(false);
	}
}

$(document).ready(function() {
	jQuery("h1").configTextScaling(3, 2);
	jQuery("h2").configTextScaling(0.8, 1.5);
	jQuery("h3").configTextScaling(1.1, 2);
	jQuery("h4").configTextScaling(0.5, 1);
	jQuery("h5").configTextScaling(0.7, 1.2);
	jQuery("h6").configTextScaling(0.4, 1.1);
	jQuery("p").configTextScaling(0.45, 1);
	jQuery("a").configTextScaling(0.45, 1);
	jQuery("span").configTextScaling(0.45, 1);
	jQuery("input").configTextScaling(0.45, 1);
	jQuery("cite").configTextScaling(0.45, 1);
	jQuery("button").configTextScaling(0.45, 1);
	var searchButton = $("#search");
	searchButton.click(function() {
		startQuery(true);
	});
	searchButton.mouseup(function() {
		$("input").focus();
	});
	runQueryFromUrl();
	$("#query").keypress(function(e) {
		if (e.keyCode === 13) {
			searchButton.click();
		}
	});
	window.onpopstate = function(event) {
		runQueryFromUrl();
	};
	$("input").focus();
	$("#container").animate({opacity: 1}, 200);
});