var previousSearch="",searchRunning=!1,shouldRefresh=!1,lastOptionSelected=0,firstSearch=!0,upsideDown=!1,options=["Hold on...","Exploring...","Searching...","Diving...","Interesting...","Navigating...","Looking...","Curious?...","Browsing..."];function removeParameter(e,t){var n=e.split("?");if(n.length>=2){for(var r=n.shift(),a=n.join("?"),o=encodeURIComponent(t)+"=",s=a.split(/[&;]/g),i=s.length;i-- >0;)-1!==s[i].lastIndexOf(o,0)&&s.splice(i,1);e=r+"?"+s.join("&")}return e}function clearResults(){$("#results").children(":not(#state)").remove()}function getRandomColor(){var e=16777215*Math.random()|0;return"rgb("+Math.max(e>>16&255,170)+","+Math.max(e>>8&255,170)+","+Math.max(255&e,170)+")"}function setStatusText(e){$("#state").animate({opacity:0},{duration:150,easing:"linear",queue:!1,complete:function(){$(this).text(e).animate({opacity:1},{duration:100,easing:"linear",queue:!1})}})}function setRandomSearchText(){var e;do{e=Math.random()*options.length|0}while(e==lastOptionSelected);setStatusText(options[e])}function onSearchStarted(){$("#state").animate({color:searchRunning?getRandomColor():"#BBBBFF",queue:!1,duration:1e3,easing:"linear",complete:function(){searchRunning&&(setRandomSearchText(),onSearchStarted())}})}function onSearchEnded(){searchRunning=!1,$("#state").animate({color:"#BBBBFF",queue:!1,easing:"linear",duration:900})}function parseResultsFromGoogle(e){var t=$("#results");t.hide(),clearResults();var n=document.getElementsByClassName("gsc-result");if(n.length>0){setStatusText("Page "+e+" (results may vary)");var r=document.createElement("div"),a=n[n.length-1];r.innerHTML=a.innerHTML,t.append(r);var o=$(r);o.find("*").each(function(){$(this).attr("data-cturl",this.href),$(this).attr("data-ctorig",this.href),$(this).attr("onload","")}),o.find(".gs-title").each(function(){$(this).removeClass("gs-title"),$(this).before("<br/>"),$(this).after("<br/>")}),o.find("img").each(function(){$(this).before("<br/>"),$(this).after("<br/>")}),o.find(".gsc-url-bottom").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove(),$(this).before("<p/>"),$(this).after("<p/>")}),o.find(".gsc-url-top").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove()}),o.find(".gs-visibleUrl").each(function(){$(this).removeClass()}),o.find(".gsc-thumbnail-inside").each(function(){$(this).remove()}),o.find(".gsc-url-top").each(function(){$(this).remove()}),o.find(".gs-snippet").each(function(){$(this).replaceWith(function(){return $("<span/>",{html:this.innerHTML})})})}else previousSearch="",shouldRefresh=!0,setStatusText("No results were found");t.slideDown("fast").css("display","inline-block")}function parseResults(e,t,n){var r=$("#results");if(r.hide(),clearResults(),null===e)previousSearch="",shouldRefresh=!0,setStatusText("No results were found.");else{setStatusText("Page "+(10*n+(t/10|0)+1)+" (results may vary)");for(var a=Array.from(e.getElementsByTagName("a")),o=0;o<a.length;o++){var s=a[o].getAttribute("href");s.startsWith("/url?q=")?(s=removeParameter(s=removeParameter(s=removeParameter(s,"sa"),"ved"),"usg"),a[o].href=unescape(s.substring(7)),a[o].target="_blank",a[o].rel="noopener noreferrer"):(a[o].parentNode.removeChild(a[o]),a.splice(o,1),o--)}if(a.length>0){var i=e.innerHTML,c=document.createElement("div");c.innerHTML=i,r.append(c)}for(var l=$("#_nBb"),u=0;u<l.length;u++)l[u].parentNode.removeChild(l[u])}r.slideDown("fast").css("display","inline-block")}function runQuery(e,t){var n=document.getElementById("query").value.trim(),r=$("#results");if(0===n.length)previousSearch="",onSearchEnded(),t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky",location.origin),r.fadeOut("fast");else{if(n===previousSearch)return void onSearchEnded();shouldRefresh?(shouldRefresh=!1,window.location.href=location.origin+"/?search="+escape(n)):t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky - "+n,location.origin+"/?search="+escape(n)),clearResults(),setRandomSearchText(),r.slideDown("fast").css("display","inline-block"),onSearchStarted();var a="https://www.google.com/search?q="+escape(n)+"&num=100&start="+100*e+"&filter=0",o=window.XDomainRequest?new XDomainRequest:new XMLHttpRequest;o.onreadystatechange=function(){if(4===this.readyState)if(200===this.status){var t=document.createElement("html");t.innerHTML=this.responseText;for(var a=t.getElementsByTagName("td"),o=0;o<a.length;o++){var s=a[o].getAttribute("id");null!==s&&""!==s&&a[o].parentNode.removeChild(a[o])}var i=t.getElementsByClassName("g");0===i.length&&e>0?(e--,setTimeout(function(){runQuery(e,!1)},4)):(previousSearch=n,onSearchEnded(),0===i.length?parseResults(null,0,e):parseResults(i[i.length-1],i.length-1,e))}else var c=0,l=!0,u=setInterval(function(){function e(){c<16?c++:(clearInterval(u),previousSearch="",shouldRefresh=!0,l=!0,onSearchEnded(),clearResults(),setStatusText("An error occurred while trying to connect to google.com"),r.slideDown("fast").css("display","inline-block"),c=0)}var t=document.getElementsByClassName("gsc-cursor-page");if(0===t.length)e();else{var a=document.getElementsByClassName("gsc-cursor-current-page");0===a.length||a[0]!==t[t.length-1]?l?(l=!1,t[t.length-1].click()):e():(clearInterval(u),l=!0,setTimeout(function(){previousSearch=n,parseResultsFromGoogle(document.getElementsByClassName("gsc-cursor-current-page")[0].innerText.trim()),onSearchEnded()},2e3),c=0)}},1e3)},o.open("GET","https://allow-any-origin.appspot.com/"+a,!0),o.send(null)}}function startGoogleSearch(){if(google.search.cse.element.getAllElements().standard0.execute(document.getElementById("query").value.trim()),firstSearch){firstSearch=!1;for(var e=0;e<document.styleSheets.length;e++){document.styleSheets[e].href.endsWith("homepage.css")||(document.styleSheets[e].disabled=!0)}}}function startQuery(e){if(!searchRunning){searchRunning=!0,runQuery(8,e);try{startGoogleSearch()}catch(e){var t=0,n=setInterval(function(){try{clearInterval(n),startGoogleSearch(),t=0}catch(e){++t>10&&(clearInterval(n),t=0)}},1e3)}}}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function runQueryFromUrl(){var e=getParameterByName("search");null===e||""===e?(document.getElementById("query").value="",clearResults(),previousSearch="",$("#results").fadeOut("fast")):(document.getElementById("query").value=unescape(e),startQuery(!1))}function throwConfetti(){maxParticleCount=250*Math.random()+5,startConfetti(),setInterval(function(){stopConfetti()},1200)}function cursorFocus(e){var t=window.scrollX,n=window.scrollY;e.focus(),window.scrollTo(t,n)}function changeBackground(){var e=$(".triangles"),t=Trianglify({width:window.innerWidth,height:window.innerHeight,cell_size:75}).canvas();t.setAttribute("class","triangles");var n=$(t);n.css("opacity",0),document.body.insertBefore(t,document.body.firstChild),n.animate({opacity:1},400),e.fadeOut(600,function(){$(this).remove()})}!function(){var e,t,n,r;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),Array.from||(Array.from=(e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},n=Math.pow(2,53)-1,r=function(e){var t,r=(t=Number(e),isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*(0|Math.abs(t)):t);return Math.min(Math.max(r,0),n)},function(e){var n=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var a,o=arguments.length>1?arguments[1]:void 0;if(void 0!==o){if(!t(o))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(a=arguments[2])}for(var s,i=r(n.length),c=t(this)?Object(new this(i)):new Array(i),l=0;l<i;)s=n[l],c[l]=o?void 0===a?o(s,l):o.call(a,s,l):s,l+=1;return c.length=i,c}))}(),$(document).ready(function(){$("h1").css("text-shadow","0em 0em 0.17em rgba(0, 0, 0, 0.8)"),$("#search").click(function(){startQuery(!0)}),$("h1").click(function(e){changeBackground(),e.preventDefault()}),$(".confetti-click").click(function(e){throwConfetti(),e.preventDefault()}),$("#explore").click(function(e){changeBackground(),e.preventDefault()}),$("#easter").click(function(e){upsideDown?$("#container").css("transform","none"):$("#container").css("transform","rotate(180deg)"),upsideDown=!upsideDown,e.preventDefault()}),$("#query").keypress(function(e){13===e.keyCode&&($("#search").focus(),startQuery(!0))}),$(".suggestion").each(function(){$(this).attr("href","javascript:void(0)")}),$(".suggestion").click(function(){document.getElementById("query").value=$(this).text().replace(",","").trim(),startQuery(!0)}),window.onpopstate=function(e){runQueryFromUrl()},cursorFocus($("input")),$("#container").animate({opacity:1},100,"linear",function(){$("*").css("transition","100ms")}),runQueryFromUrl()});