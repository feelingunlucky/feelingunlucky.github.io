function onLoad(){$("#jserror").hide(),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),Array.from||(Array.from=function(){var e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},n=function(e){var t=Number(e);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t},r=Math.pow(2,53)-1,a=function(e){var t=n(e);return Math.min(Math.max(t,0),r)};return function(e){var n=this,r=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,i=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof i){if(!t(i))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(o=arguments[2])}for(var u,s=a(r.length),c=t(n)?Object(new n(s)):new Array(s),l=0;s>l;)u=r[l],i?c[l]="undefined"==typeof o?i(u,l):i.call(o,u,l):c[l]=u,l+=1;return c.length=s,c}}()),document.body.insertBefore(Trianglify({width:window.innerWidth,height:window.innerHeight,cell_size:100}).canvas(),document.body.firstChild)}function removeParameter(e,t){var n=e.split("?");if(n.length>=2){for(var r=n.shift(),a=n.join("?"),o=encodeURIComponent(t)+"=",i=a.split(/[&;]/g),u=i.length;u-->0;)-1!==i[u].lastIndexOf(o,0)&&i.splice(u,1);e=r+"?"+i.join("&")}return e}function clearResults(){$("#results").children(":not(#state)").remove()}function onSearchStarted(){$("#state").animate({color:searchRunning?"#"+Math.floor(16777215*Math.random()).toString(16):"#BBBBFF",queue:!1,duration:1e3,complete:function(){searchRunning&&setTimeout(onSearchStarted,4)}})}function onSearchEnded(){searchRunning=!1,$("#state").animate({color:"#BBBBFF",queue:!1,duration:1e3})}function parseResults(e,t,n){var r=$("#results");if(r.hide(),clearResults(),null===e)$("#state").text("No results were found.");else{$("#state").text("Page "+(10*n+Math.floor(t/10)+1)+" (results may vary)");for(var a=Array.from(e.getElementsByTagName("a")),o=0;o<a.length;o++){var i=a[o].getAttribute("href");i.startsWith("/url?q=")?(i=removeParameter(i,"sa"),i=removeParameter(i,"ved"),i=removeParameter(i,"usg"),a[o].href=unescape(i.substring(7)),a[o].target="_blank"):(a[o].parentNode.removeChild(a[o]),a.splice(o,1),o--)}if(a.length>0){var u=e.innerHTML,s=document.createElement("div");s.innerHTML=u,r.append(s)}for(var c=$("#_nBb"),l=0;l<c.length;l++)c[l].parentNode.removeChild(c[l])}r.slideDown("fast").css("display","inline-block")}function runQuery(e,t){var n=document.getElementById("query").value.trim(),r=$("#results");if(0===n.length)previousSearch="",onSearchEnded(),t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky",location.origin),r.fadeOut("fast");else{if(n===previousSearch)return void onSearchEnded();t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky - "+n,location.origin+"/?search="+escape(n)),clearResults(),$("#state").text("Searching..."),r.slideDown("fast").css("display","inline-block"),onSearchStarted();var a="https://www.google.com/search?q="+escape(n)+"&num=100&start="+100*e+"&filter=0",o=window.XDomainRequest?new XDomainRequest:new XMLHttpRequest;o.onreadystatechange=function(){if(4===this.readyState)if(200===this.status){var t=document.createElement("html");t.innerHTML=this.responseText;for(var a=t.getElementsByTagName("td"),o=0;o<a.length;o++){var i=a[o].getAttribute("id");null!==i&&""!==i&&a[o].parentNode.removeChild(a[o])}var u=t.getElementsByClassName("g");0===u.length&&e>0?(e--,setTimeout(function(){runQuery(e,!1)},4)):(previousSearch=n,onSearchEnded(),0===u.length?parseResults(null,0,e):parseResults(u[u.length-1],u.length-1,e))}else previousSearch="",onSearchEnded(),clearResults(),$("#state").text("An error occurred while trying to connect to google.com."),r.slideDown("fast").css("display","inline-block")},o.open("GET","https://allow-any-origin.appspot.com/"+a,!0),o.send(null)}}function startQuery(e){searchRunning||(searchRunning=!0,runQuery(8,e))}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=n.exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}function runQueryFromUrl(){var e=getParameterByName("search");null===e||""===e?(document.getElementById("query").value="",clearResults(),previousSearch="",$("#results").fadeOut("fast")):(document.getElementById("query").value=unescape(e),startQuery(!1))}var previousSearch="",searchRunning=!1;onLoad(),function(e){e.fn.configTextScaling=function(t,n,r){return t=.002*t||.002,r=r||Number.POSITIVE_INFINITY,this.each(function(){function a(){o.css("font-size",Math.max(Math.min(o.width()*t,r),n)+"em")}var o=e(this);a(),e(window).on("resize.fittext orientationchange.fittext",a)})}}(jQuery),$(document).ready(function(){jQuery("h1").configTextScaling(3,2),jQuery("h2").configTextScaling(.8,1.5),jQuery("h3").configTextScaling(1.1,2),jQuery("h4").configTextScaling(.5,1),jQuery("h5").configTextScaling(.7,1.2),jQuery("h6").configTextScaling(.4,1.1),jQuery("p").configTextScaling(.45,1),jQuery("a").configTextScaling(.45,1),jQuery("span").configTextScaling(.45,1),jQuery("input").configTextScaling(.45,1),jQuery("cite").configTextScaling(.45,1),jQuery("button").configTextScaling(.45,1);var e=$("#search");e.click(function(){startQuery(!0)}),e.mouseup(function(){$("input").focus()}),runQueryFromUrl(),$("#query").keypress(function(t){13===t.keyCode&&e.click()}),window.onpopstate=function(e){runQueryFromUrl()},$("input").focus(),$("#container").animate({opacity:1},200)});