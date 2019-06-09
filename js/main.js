var currentSearch="",shouldRefresh=!1,lastOptionSelected=0,firstSearch=!0,upsideDown=!1,options=["Googling...","Exploring...","Searching...","Diving...","Navigating...","Looking...","Investigating...","Browsing..."];function removeParameter(e,t){var r=e.split("?");if(r.length>=2){for(var n=r.shift(),a=r.join("?"),o=encodeURIComponent(t)+"=",i=a.split(/[&;]/g),s=i.length;s-- >0;)-1!==i[s].lastIndexOf(o,0)&&i.splice(s,1);e=n+"?"+i.join("&")}return e}function clearResults(){$("#results").children(":not(#state)").remove()}function getRandomColor(){var e=16777215*Math.random()|0;return"rgb("+Math.max(e>>16&255,170)+","+Math.max(e>>8&255,170)+","+Math.max(255&e,170)+")"}function setStatusText(e){$("#state").animate({opacity:0},{duration:150,easing:"linear",queue:!1,complete:function(){$(this).text(e).animate({opacity:1},{duration:100,easing:"linear",queue:!1})}})}function setRandomSearchText(){var e;do{e=Math.random()*options.length|0}while(e==lastOptionSelected);setStatusText(options[e])}function onSearchStarted(){$("#state").animate({color:""==currentSearch?"#BBBBFF":getRandomColor(),queue:!1,duration:1e3,easing:"linear",complete:function(){""!=currentSearch&&(setRandomSearchText(),onSearchStarted())}});var e=$("#results");e.is(":visible")||e.is(":animated")||e.slideDown("fast").css("display","inline-block")}function onSearchEnded(){$("#state").animate({color:"#BBBBFF",queue:!1,easing:"linear",duration:900});var e=$("#results");""==getQueryFromUrl()?e.fadeOut("fast"):e.is(":visible")||e.is(":animated")||e.slideDown("fast").css("display","inline-block"),currentSearch=""}function parseResultsFromGoogle(e){var t=$("#results");t.hide(),clearResults();var r=document.getElementsByClassName("gsc-result");if(r.length>0){setStatusText("Page "+e+" (results may vary)");var n=document.createElement("div"),a=r[r.length-1];n.innerHTML=a.innerHTML,t.append(n);var o=$(n);o.find("*").each(function(){$(this).attr("data-cturl",this.href),$(this).attr("data-ctorig",this.href),$(this).attr("onload","")}),o.find(".gs-title").each(function(){$(this).removeClass("gs-title"),$(this).before("<br/>"),$(this).after("<br/>")}),o.find("img").each(function(){$(this).before("<br/>"),$(this).after("<br/>")}),o.find(".gsc-url-bottom").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove(),$(this).before("<p/>"),$(this).after("<p/>")}),o.find(".gsc-url-top").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove()}),o.find(".gs-visibleUrl").each(function(){$(this).removeClass()}),o.find(".gsc-thumbnail-inside").each(function(){$(this).remove()}),o.find(".gsc-url-top").each(function(){$(this).remove()}),o.find(".gs-snippet").each(function(){$(this).replaceWith(function(){return $("<span/>",{html:this.innerHTML})})})}else shouldRefresh=!0,setStatusText("No results were found")}function parseResults(e,t,r){var n=$("#results");if(n.hide(),clearResults(),null===e)shouldRefresh=!0,setStatusText("No results were found");else{setStatusText("Page "+(10*r+(t/10|0)+1)+" (results may vary)");for(var a=Array.from(e.getElementsByTagName("a")),o=0;o<a.length;o++){var i=a[o].getAttribute("href");i.startsWith("/url?q=")?(i=removeParameter(i,"sa"),i=removeParameter(i,"ved"),i=removeParameter(i,"usg"),a[o].href=unescape(i.substring(7)),a[o].target="_blank",a[o].rel="noopener noreferrer"):(a[o].parentNode.removeChild(a[o]),a.splice(o,1),o--)}if(a.length>0){var s=e.innerHTML,c=document.createElement("div");c.innerHTML=s,n.append(c)}for(var u=$("#_nBb"),l=0;l<u.length;l++)u[l].parentNode.removeChild(u[l])}}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}function getQueryFromUrl(){var e=getParameterByName("q");return null==e?"":e}function runQuery(e){getQueryFromUrl();var t=0,r=0,n=setInterval(function(){function e(){t<16?t++:(clearInterval(n),shouldRefresh=!0,r=0,clearResults(),setStatusText("An error occurred while trying to connect to google.com"),onSearchEnded(),t=0)}var a=document.getElementsByClassName("gsc-cursor-page");if(0===a.length)e();else{var o=document.getElementsByClassName("gsc-cursor-current-page");0===o.length||o[0]!==a[a.length-1]?(r%2==0?a[a.length-1].click():e(),r++):(clearInterval(n),r=0,setTimeout(function(){parseResultsFromGoogle(document.getElementsByClassName("gsc-cursor-current-page")[0].innerText.trim()),onSearchEnded()},2e3),t=0)}},1e3)}function startGoogleSearch(){if(google.search.cse.element.getAllElements().standard0.execute(getQueryFromUrl()),firstSearch){firstSearch=!1;for(var e=0;e<document.styleSheets.length;e++){document.styleSheets[e].href.endsWith("homepage.css")||(document.styleSheets[e].disabled=!0)}}onSearchEnded()}function startQuery(e,t){var r=document.getElementById("query").value.trim();if(""===r||currentSearch!=r)if(currentSearch=r,t=void 0!==t&&""!=t?"&"+t:"",0===r.length)e&&!window.location.href.startsWith("file:")&&window.history.pushState(r,"Feeling Unlucky",location.origin+t),onSearchEnded();else{if(e&&r===getQueryFromUrl())return void onSearchEnded();shouldRefresh?(shouldRefresh=!1,window.location.href=location.origin+"/?q="+escape(r)+t):e&&!window.location.href.startsWith("file:")&&window.history.pushState(r,"Feeling Unlucky - "+r,location.origin+"/?q="+escape(r)+t),clearResults(),setRandomSearchText(),onSearchStarted(),runQuery(8),e&&throwConfetti(40,200);try{startGoogleSearch()}catch(e){var n=0,a=setInterval(function(){try{clearInterval(a),startGoogleSearch(),n=0}catch(e){++n>10&&(clearInterval(a),n=0)}},1e3)}}}function runQueryFromUrl(){var e=getQueryFromUrl();""===e?(document.getElementById("query").value="",clearResults(),onSearchEnded()):(document.getElementById("query").value=unescape(e),startQuery(!1))}function cursorFocus(e){var t=window.scrollX,r=window.scrollY;e.focus(),window.scrollTo(t,r)}function changeBackground(){var e=$(".triangles"),t=$(background());t.css("opacity",0),t.animate({opacity:1},400),e.fadeOut(600,function(){$(this).remove()})}function throwConfetti(e,t){confetti&&confetti.start&&confetti.start(1200,e,t)}function startRandomSearch(){$.ajax({url:"/text/"+(9897*Math.random()|0),type:"GET"}).done(function(e,t){document.getElementById("query").value=e,startQuery(!0,"r=1")}).fail(function(e,t){document.getElementById("query").value="Random",startQuery(!0,"r=1")})}!function(){var e,t,r,n;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),Array.from||(Array.from=(e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},r=Math.pow(2,53)-1,n=function(e){var t=function(e){var t=Number(e);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*(0|Math.abs(t)):t}(e);return Math.min(Math.max(t,0),r)},function(e){var r=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var a,o=arguments.length>1?arguments[1]:void 0;if(void 0!==o){if(!t(o))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(a=arguments[2])}for(var i,s=n(r.length),c=t(this)?Object(new this(s)):new Array(s),u=0;u<s;)i=r[u],c[u]=o?void 0===a?o(i,u):o.call(a,i,u):i,u+=1;return c.length=s,c}))}(),$(document).ready(function(){$("h1").css("text-shadow","rgba(0,0,0,0.8) 0em 0em 0.1em"),$("#search").click(function(e){startQuery(!0),e.preventDefault()}),$(".confetti-click").click(function(e){throwConfetti(10,50),e.preventDefault()}),$(".change").click(function(e){changeBackground(),e.preventDefault()}),$("#query").keypress(function(e){13===e.keyCode&&($("#search").focus(),startQuery(!0),e.preventDefault())}),$(".suggestion").each(function(){$(this).attr("href","javascript:void(0)")}),$(".suggestion").click(function(e){var t=$(this).text().replace(",","").trim().toLowerCase();"random"==t.toLowerCase()?startRandomSearch():(document.getElementById("query").value=t,startQuery(!0)),e.preventDefault()}),window.onpopstate=function(e){runQueryFromUrl()},cursorFocus($("input")),$("#container").animate({opacity:1},100,"linear",function(){$("*").css("transition","100ms")}),runQueryFromUrl()});