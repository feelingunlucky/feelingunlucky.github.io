var currentSearch="",shouldRefresh=!1,lastOptionSelected=0,firstSearch=!0,upsideDown=!1,options=["Googling...","Exploring...","Searching...","Diving...","Navigating...","Looking...","Investigating...","Browsing..."];function removeParameter(e,t){var n=e.split("?");if(n.length>=2){for(var r=n.shift(),a=n.join("?"),o=encodeURIComponent(t)+"=",i=a.split(/[&;]/g),s=i.length;s-- >0;)-1!==i[s].lastIndexOf(o,0)&&i.splice(s,1);e=r+"?"+i.join("&")}return e}function clearResults(){$("#results").children(":not(#state)").remove()}function getRandomColor(){var e=16777215*Math.random()|0;return"rgb("+Math.max(e>>16&255,170)+","+Math.max(e>>8&255,170)+","+Math.max(255&e,170)+")"}function setStatusText(e){$("#state").animate({opacity:0},{duration:150,easing:"linear",queue:!1,complete:function(){$(this).text(e).animate({opacity:1},{duration:100,easing:"linear",queue:!1})}})}function setRandomSearchText(){var e;do{e=Math.random()*options.length|0}while(e==lastOptionSelected);setStatusText(options[e])}function onSearchStarted(){$("#state").animate({color:""==currentSearch?"#BBBBFF":getRandomColor(),queue:!1,duration:1e3,easing:"linear",complete:function(){""!=currentSearch&&(setRandomSearchText(),onSearchStarted())}});var e=$("#results");e.is(":visible")||e.is(":animated")||e.slideDown("fast").css("display","inline-block")}function onSearchEnded(){$("#state").animate({color:"#BBBBFF",queue:!1,easing:"linear",duration:900});var e=$("#results");""==getQueryFromUrl()?e.fadeOut("fast"):e.is(":visible")||e.is(":animated")||e.slideDown("fast").css("display","inline-block"),currentSearch=""}function parseResultsFromGoogle(e){var t=$("#results");t.hide(),clearResults();var n=document.getElementsByClassName("gsc-result");if(n.length>0){setStatusText("Page "+e+" (results may vary)");var r=document.createElement("div"),a=n[n.length-1];r.innerHTML=a.innerHTML,t.append(r);var o=$(r);o.find("*").each(function(){$(this).attr("data-cturl",this.href),$(this).attr("data-ctorig",this.href),$(this).attr("onload","")}),o.find(".gs-title").each(function(){$(this).removeClass("gs-title"),$(this).before("<br/>"),$(this).after("<br/>")}),o.find("img").each(function(){$(this).before("<br/>"),$(this).after("<br/>")}),o.find(".gsc-url-bottom").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove(),$(this).before("<p/>"),$(this).after("<p/>")}),o.find(".gsc-url-top").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove()}),o.find(".gs-visibleUrl").each(function(){$(this).removeClass()}),o.find(".gsc-thumbnail-inside").each(function(){$(this).remove()}),o.find(".gsc-url-top").each(function(){$(this).remove()}),o.find(".gs-snippet").each(function(){$(this).replaceWith(function(){return $("<span/>",{html:this.innerHTML})})})}else shouldRefresh=!0,setStatusText("No results were found")}function parseResults(e,t,n){var r=$("#results");if(r.hide(),clearResults(),null===e)shouldRefresh=!0,setStatusText("No results were found");else{setStatusText("Page "+(10*n+(t/10|0)+1)+" (results may vary)");for(var a=Array.from(e.getElementsByTagName("a")),o=0;o<a.length;o++){var i=a[o].getAttribute("href");i.startsWith("/url?q=")?(i=removeParameter(i,"sa"),i=removeParameter(i,"ved"),i=removeParameter(i,"usg"),a[o].href=unescape(i.substring(7)),a[o].target="_blank",a[o].rel="noopener noreferrer"):(a[o].parentNode.removeChild(a[o]),a.splice(o,1),o--)}if(a.length>0){var s=e.innerHTML,c=document.createElement("div");c.innerHTML=s,r.append(c)}for(var u=$("#_nBb"),l=0;l<u.length;l++)u[l].parentNode.removeChild(u[l])}}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function getQueryFromUrl(){var e=getParameterByName("q");return null==e?"":e}function runQuery(e){var t=getQueryFromUrl(),n="https://www.google.com/search?q="+escape(t)+"&num=100&start="+100*e+"&filter=0",r=window.XDomainRequest?new XDomainRequest:new XMLHttpRequest;r.onreadystatechange=function(){if(4===this.readyState)if(200===this.status){var t=document.createElement("html");t.innerHTML=this.responseText;for(var n=t.getElementsByTagName("td"),r=0;r<n.length;r++){var a=n[r].getAttribute("id");null!==a&&""!==a&&n[r].parentNode.removeChild(n[r])}var o=t.getElementsByClassName("g");0===o.length&&e>0?(e--,setTimeout(function(){runQuery(e)},4)):(0===o.length?parseResults(null,0,e):parseResults(o[o.length-1],o.length-1,e),onSearchEnded())}else var i=0,s=!0,c=setInterval(function(){function e(){i<16?i++:(clearInterval(c),shouldRefresh=!0,s=!0,clearResults(),setStatusText("An error occurred while trying to connect to google.com"),onSearchEnded(),i=0)}var t=document.getElementsByClassName("gsc-cursor-page");if(0===t.length)e();else{var n=document.getElementsByClassName("gsc-cursor-current-page");0===n.length||n[0]!==t[t.length-1]?s?(s=!1,t[t.length-1].click()):e():(clearInterval(c),s=!0,setTimeout(function(){parseResultsFromGoogle(document.getElementsByClassName("gsc-cursor-current-page")[0].innerText.trim()),onSearchEnded()},2e3),i=0)}},1e3)},r.open("GET","https://allow-any-origin.appspot.com/"+n,!0),r.send(null)}function startGoogleSearch(){if(google.search.cse.element.getAllElements().standard0.execute(getQueryFromUrl()),firstSearch){firstSearch=!1;for(var e=0;e<document.styleSheets.length;e++){document.styleSheets[e].href.endsWith("homepage.css")||(document.styleSheets[e].disabled=!0)}}onSearchEnded()}function startQuery(e,t){var n=document.getElementById("query").value.trim();if(""===n||currentSearch!=n)if(currentSearch=n,t=void 0!==t&&""!=t?"&"+t:"",0===n.length)e&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky",location.origin+t),onSearchEnded();else{if(e&&n===getQueryFromUrl())return void onSearchEnded();shouldRefresh?(shouldRefresh=!1,window.location.href=location.origin+"/?q="+escape(n)+t):e&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky - "+n,location.origin+"/?q="+escape(n)+t),clearResults(),setRandomSearchText(),onSearchStarted(),runQuery(8),e&&throwConfetti(40,200);try{startGoogleSearch()}catch(e){var r=0,a=setInterval(function(){try{clearInterval(a),startGoogleSearch(),r=0}catch(e){++r>10&&(clearInterval(a),r=0)}},1e3)}}}function runQueryFromUrl(){var e=getQueryFromUrl();""===e?(document.getElementById("query").value="",clearResults(),onSearchEnded()):(document.getElementById("query").value=unescape(e),startQuery(!1))}function throwConfetti(e,t){confetti.maxCount=Math.random()*(t-e)+e|0,confetti.start(),setInterval(function(){confetti.stop()},1200)}function cursorFocus(e){var t=window.scrollX,n=window.scrollY;e.focus(),window.scrollTo(t,n)}function changeBackground(){var e=$(".triangles"),t=Trianglify({width:window.innerWidth,height:window.innerHeight,cell_size:75}).canvas();t.setAttribute("class","triangles");var n=$(t);n.css("opacity",0),document.body.insertBefore(t,document.body.firstChild),n.animate({opacity:1},400),e.fadeOut(600,function(){$(this).remove()})}function startRandomSearch(){var e=window.XDomainRequest?new XDomainRequest:new XMLHttpRequest;e.onreadystatechange=function(){var e;4===this.readyState&&(e=200===this.status||0===this.status?this.responseText:"Random",document.getElementById("query").value=e,startQuery(!0,"r=1"))},e.open("GET","/text/"+(9897*Math.random()|0),!0),e.send(null)}!function(){var e,t,n,r;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),Array.from||(Array.from=(e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},n=Math.pow(2,53)-1,r=function(e){var t=function(e){var t=Number(e);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*(0|Math.abs(t)):t}(e);return Math.min(Math.max(t,0),n)},function(e){var n=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var a,o=arguments.length>1?arguments[1]:void 0;if(void 0!==o){if(!t(o))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(a=arguments[2])}for(var i,s=r(n.length),c=t(this)?Object(new this(s)):new Array(s),u=0;u<s;)i=n[u],c[u]=o?void 0===a?o(i,u):o.call(a,i,u):i,u+=1;return c.length=s,c}))}(),$(document).ready(function(){$("h1").css("text-shadow","0em 0em 0.17em rgba(0, 0, 0, 0.8)"),$("#search").click(function(e){startQuery(!0),e.preventDefault()}),$(".confetti-click").click(function(e){throwConfetti(10,50),e.preventDefault()}),$(".change").click(function(e){changeBackground(),e.preventDefault()}),$("#easter").click(function(e){upsideDown?$("#container").css("transform","none"):$("#container").css("transform","rotate(180deg)"),upsideDown=!upsideDown,e.preventDefault()}),$("#query").keypress(function(e){13===e.keyCode&&($("#search").focus(),startQuery(!0),e.preventDefault())}),$(".suggestion").each(function(){$(this).attr("href","javascript:void(0)")}),$(".suggestion").click(function(e){var t=$(this).text().replace(",","").trim();"random"==t.toLowerCase()?startRandomSearch():(document.getElementById("query").value=t,startQuery(!0)),e.preventDefault()}),window.onpopstate=function(e){runQueryFromUrl()},cursorFocus($("input")),$("#container").animate({opacity:1},100,"linear",function(){$("*").css("transition","100ms")}),runQueryFromUrl()});