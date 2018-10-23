var previousSearch="",searchRunning=!1,shouldRefresh=!1,lastOptionSelected=0,firstSearch=!0,upsideDown=!1,options=["Hold on...","Exploring...","Searching...","Diving...","Interesting...","Navigating...","Looking...","Curious?...","Browsing..."];function removeParameter(e,t){var n=e.split("?");if(n.length>=2){for(var r=n.shift(),o=n.join("?"),a=encodeURIComponent(t)+"=",s=o.split(/[&;]/g),i=s.length;i-- >0;)-1!==s[i].lastIndexOf(a,0)&&s.splice(i,1);e=r+"?"+s.join("&")}return e}function clearResults(){$("#results").children(":not(#state)").remove()}function getRandomColor(){var e=16777215*Math.random()|0;return"rgb("+Math.max(e>>16&255,170)+","+Math.max(e>>8&255,170)+","+Math.max(255&e,170)+")"}function setStatusText(e){$("#state").animate({opacity:0},{duration:150,easing:"linear",queue:!1,complete:function(){$(this).text(e).animate({opacity:1},{duration:100,easing:"linear",queue:!1})}})}function setRandomSearchText(){var e;do{e=Math.random()*options.length|0}while(e==lastOptionSelected);setStatusText(options[e])}function onSearchStarted(){$("#state").animate({color:searchRunning?getRandomColor():"#BBBBFF",queue:!1,duration:1e3,easing:"linear",complete:function(){searchRunning&&(setRandomSearchText(),onSearchStarted())}})}function onSearchEnded(){searchRunning=!1,$("#state").animate({color:"#BBBBFF",queue:!1,easing:"linear",duration:900})}function parseResultsFromGoogle(e){var t=$("#results");t.hide(),clearResults();var n=document.getElementsByClassName("gsc-result");if(n.length>0){setStatusText("Page "+e+" (results may vary)");var r=document.createElement("div"),o=n[n.length-1];r.innerHTML=o.innerHTML,t.append(r);var a=$(r);a.find("*").each(function(){$(this).attr("data-cturl",this.href),$(this).attr("data-ctorig",this.href),$(this).attr("onload","")}),a.find(".gs-title").each(function(){$(this).removeClass("gs-title"),$(this).before("<br/>"),$(this).after("<br/>")}),a.find("img").each(function(){$(this).before("<br/>"),$(this).after("<br/>")}),a.find(".gsc-url-bottom").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove(),$(this).before("<p/>"),$(this).after("<p/>")}),a.find(".gsc-url-top").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove()}),a.find(".gs-visibleUrl").each(function(){$(this).removeClass()}),a.find(".gsc-thumbnail-inside").each(function(){$(this).remove()}),a.find(".gsc-url-top").each(function(){$(this).remove()}),a.find(".gs-snippet").each(function(){$(this).replaceWith(function(){return $("<span/>",{html:this.innerHTML})})})}else previousSearch="",shouldRefresh=!0,setStatusText("No results were found");t.slideDown("fast").css("display","inline-block")}function parseResults(e,t,n){var r=$("#results");if(r.hide(),clearResults(),null===e)previousSearch="",shouldRefresh=!0,setStatusText("No results were found.");else{setStatusText("Page "+(10*n+(t/10|0)+1)+" (results may vary)");for(var o=Array.from(e.getElementsByTagName("a")),a=0;a<o.length;a++){var s=o[a].getAttribute("href");s.startsWith("/url?q=")?(s=removeParameter(s=removeParameter(s=removeParameter(s,"sa"),"ved"),"usg"),o[a].href=unescape(s.substring(7)),o[a].target="_blank",o[a].rel="noopener noreferrer"):(o[a].parentNode.removeChild(o[a]),o.splice(a,1),a--)}if(o.length>0){var i=e.innerHTML,u=document.createElement("div");u.innerHTML=i,r.append(u)}for(var c=$("#_nBb"),l=0;l<c.length;l++)c[l].parentNode.removeChild(c[l])}r.slideDown("fast").css("display","inline-block")}function runQuery(e,t){var n=document.getElementById("query").value.trim(),r=$("#results");if(0===n.length)previousSearch="",onSearchEnded(),t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky",location.origin),r.fadeOut("fast");else{if(n===previousSearch)return void onSearchEnded();shouldRefresh?(shouldRefresh=!1,window.location.href=location.origin+"/?search="+escape(n)):t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky - "+n,location.origin+"/?search="+escape(n)),clearResults(),setRandomSearchText(),r.slideDown("fast").css("display","inline-block"),onSearchStarted();var o="https://www.google.com/search?q="+escape(n)+"&num=100&start="+100*e+"&filter=0",a=window.XDomainRequest?new XDomainRequest:new XMLHttpRequest;a.onreadystatechange=function(){if(4===this.readyState)if(200===this.status){var t=document.createElement("html");t.innerHTML=this.responseText;for(var o=t.getElementsByTagName("td"),a=0;a<o.length;a++){var s=o[a].getAttribute("id");null!==s&&""!==s&&o[a].parentNode.removeChild(o[a])}var i=t.getElementsByClassName("g");0===i.length&&e>0?(e--,setTimeout(function(){runQuery(e,!1)},4)):(previousSearch=n,onSearchEnded(),0===i.length?parseResults(null,0,e):parseResults(i[i.length-1],i.length-1,e))}else var u=0,c=!0,l=setInterval(function(){function e(){u<16?u++:(clearInterval(l),previousSearch="",shouldRefresh=!0,c=!0,onSearchEnded(),clearResults(),setStatusText("An error occurred while trying to connect to google.com"),r.slideDown("fast").css("display","inline-block"),u=0)}var t=document.getElementsByClassName("gsc-cursor-page");if(0===t.length)e();else{var o=document.getElementsByClassName("gsc-cursor-current-page");0===o.length||o[0]!==t[t.length-1]?c?(c=!1,t[t.length-1].click()):e():(clearInterval(l),c=!0,setTimeout(function(){previousSearch=n,parseResultsFromGoogle(document.getElementsByClassName("gsc-cursor-current-page")[0].innerText.trim()),onSearchEnded()},2e3),u=0)}},1e3)},a.open("GET","https://allow-any-origin.appspot.com/"+o,!0),a.send(null)}}function startGoogleSearch(){if(google.search.cse.element.getAllElements().standard0.execute(document.getElementById("query").value.trim()),firstSearch){firstSearch=!1;for(var e=0;e<document.styleSheets.length;e++){document.styleSheets[e].href.endsWith("homepage.css")||(document.styleSheets[e].disabled=!0)}}}function startQuery(e){if(!searchRunning){searchRunning=!0,runQuery(8,e);try{startGoogleSearch()}catch(e){var t=0,n=setInterval(function(){try{clearInterval(n),startGoogleSearch(),t=0}catch(e){++t>10&&(clearInterval(n),t=0)}},1e3)}}}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function runQueryFromUrl(){var e=getParameterByName("search");null===e||""===e?(document.getElementById("query").value="",clearResults(),previousSearch="",$("#results").fadeOut("fast")):(document.getElementById("query").value=unescape(e),startQuery(!1))}function throwConfetti(){maxParticleCount=250*Math.random()+5,startConfetti(),setInterval(function(){stopConfetti()},1200)}function cursorFocus(e){var t=window.scrollX,n=window.scrollY;e.focus(),window.scrollTo(t,n)}!function(){var e,t,n,r;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),Array.from||(Array.from=(e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},n=Math.pow(2,53)-1,r=function(e){var t,r=(t=Number(e),isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*(0|Math.abs(t)):t);return Math.min(Math.max(r,0),n)},function(e){var n=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,a=arguments.length>1?arguments[1]:void 0;if(void 0!==a){if(!t(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(o=arguments[2])}for(var s,i=r(n.length),u=t(this)?Object(new this(i)):new Array(i),c=0;c<i;)s=n[c],u[c]=a?void 0===o?a(s,c):a.call(o,s,c):s,c+=1;return u.length=i,u}))}(),$(document).ready(function(){var e=$("#search");e.click(function(){startQuery(!0)}),e.bind("mouseup touchend",function(){cursorFocus($("input")[0])}),$(".confetti-click").bind("mouseup touchend",function(){throwConfetti()}),$("#explore").bind("mouseup touchend",function(){var e=$(".triangles"),t=Trianglify({width:window.innerWidth,height:window.innerHeight,cell_size:75}).canvas();t.setAttribute("class","triangles");var n=$(t);n.css("opacity",0),document.body.insertBefore(t,document.body.firstChild),n.animate({opacity:1},400),e.fadeOut(600,function(){$(this).remove()})}),$("#easter").bind("mouseup touchend",function(){upsideDown?$("#container").css("transform","none"):$("#container").css("transform","rotate(180deg)"),upsideDown=!upsideDown}),$("#query").keypress(function(e){13===e.keyCode&&startQuery(!0)}),$(".suggestion").each(function(){$(this).attr("href","javascript:void(0)")}),$(".suggestion").click(function(){document.getElementById("query").value=$(this).text().replace(",","").trim(),startQuery(!0)}),window.onpopstate=function(e){runQueryFromUrl()},cursorFocus($("input")),$("#container").animate({opacity:1},200),runQueryFromUrl()});