function removeParameter(e,t){var n=e.split("?");if(n.length>=2){for(var r=n.shift(),a=n.join("?"),i=encodeURIComponent(t)+"=",o=a.split(/[&;]/g),s=o.length;s-->0;)-1!==o[s].lastIndexOf(i,0)&&o.splice(s,1);e=r+"?"+o.join("&")}return e}function clearResults(){$("#results").children(":not(#state)").remove()}function getRandomColor(){var e=16777215*Math.random()|0,t=Math.max(e>>16&255,170),n=Math.max(e>>8&255,170),r=Math.max(255&e,170);return"rgb("+t+","+n+","+r+")"}function setStatusText(e){$("#state").animate({opacity:0},{duration:150,easing:"linear",queue:!1,complete:function(){$(this).text(e).animate({opacity:1},{duration:100,easing:"linear",queue:!1})}})}function setRandomSearchText(){var e;do e=Math.random()*options.length|0;while(e==lastOptionSelected);setStatusText(options[e])}function onSearchStarted(){$("#state").animate({color:searchRunning?getRandomColor():"#BBBBFF",queue:!1,duration:1e3,easing:"linear",complete:function(){searchRunning&&(setRandomSearchText(),onSearchStarted())}})}function onSearchEnded(){searchRunning=!1,$("#state").animate({color:"#BBBBFF",queue:!1,easing:"linear",duration:900})}function parseResultsFromGoogle(e){var t=$("#results");t.hide(),clearResults();var n=document.getElementsByClassName("gsc-result");if(n.length>0){setStatusText("Page "+e+" (results may vary)");var r=document.createElement("div"),a=n[n.length-1];r.innerHTML=a.innerHTML,t.append(r);var i=$(r);i.find("*").each(function(){$(this).attr("data-cturl",this.href),$(this).attr("data-ctorig",this.href),$(this).attr("onload","")}),i.find(".gs-title").each(function(){$(this).removeClass("gs-title"),$(this).before("<br/>"),$(this).after("<br/>")}),i.find("img").each(function(){$(this).before("<br/>"),$(this).after("<br/>")}),i.find(".gsc-url-bottom").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove(),$(this).before("<p/>"),$(this).after("<p/>")}),i.find(".gsc-url-top").each(function(){var e=$(this).find(">:first-child");null!==e&&e.remove()}),i.find(".gs-visibleUrl").each(function(){$(this).removeClass()}),i.find(".gsc-thumbnail-inside").each(function(){$(this).remove()}),i.find(".gsc-url-top").each(function(){$(this).remove()}),i.find(".gs-snippet").each(function(){$(this).replaceWith(function(){return $("<span/>",{html:this.innerHTML})})})}else setStatusText("No results were found.");t.slideDown("fast").css("display","inline-block")}function parseResults(e,t,n){var r=$("#results");if(r.hide(),clearResults(),null===e)setStatusText("No results were found.");else{setStatusText("Page "+(10*n+(t/10|0)+1)+" (results may vary)");for(var a=Array.from(e.getElementsByTagName("a")),i=0;i<a.length;i++){var o=a[i].getAttribute("href");o.startsWith("/url?q=")?(o=removeParameter(o,"sa"),o=removeParameter(o,"ved"),o=removeParameter(o,"usg"),a[i].href=unescape(o.substring(7)),a[i].target="_blank",a[i].rel="noopener noreferrer"):(a[i].parentNode.removeChild(a[i]),a.splice(i,1),i--)}if(a.length>0){var s=e.innerHTML,c=document.createElement("div");c.innerHTML=s,r.append(c)}for(var l=$("#_nBb"),u=0;u<l.length;u++)l[u].parentNode.removeChild(l[u])}r.slideDown("fast").css("display","inline-block")}function runQuery(e,t){var n=document.getElementById("query").value.trim(),r=$("#results");if(0===n.length)previousSearch="",onSearchEnded(),t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky",location.origin),r.fadeOut("fast");else{if(n===previousSearch)return void onSearchEnded();t&&!window.location.href.startsWith("file:")&&window.history.pushState(n,"Feeling Unlucky - "+n,location.origin+"/?search="+escape(n)),clearResults(),setRandomSearchText(),r.slideDown("fast").css("display","inline-block"),onSearchStarted();var a="https://www.google.com/search?q="+escape(n)+"&num=100&start="+100*e+"&filter=0",i=window.XDomainRequest?new XDomainRequest:new XMLHttpRequest;i.onreadystatechange=function(){if(4===this.readyState)if(200===this.status){var t=document.createElement("html");t.innerHTML=this.responseText;for(var a=t.getElementsByTagName("td"),i=0;i<a.length;i++){var o=a[i].getAttribute("id");null!==o&&""!==o&&a[i].parentNode.removeChild(a[i])}var s=t.getElementsByClassName("g");0===s.length&&e>0?(e--,setTimeout(function(){runQuery(e,!1)},4)):(previousSearch=n,onSearchEnded(),0===s.length?parseResults(null,0,e):parseResults(s[s.length-1],s.length-1,e))}else var c=0,l=!0,u=setInterval(function(){function e(){16>c?c++:(clearInterval(u),previousSearch="",l=!0,onSearchEnded(),clearResults(),setStatusText("An error occurred while trying to connect to google.com."),r.slideDown("fast").css("display","inline-block"),c=0)}var t=document.getElementsByClassName("gsc-cursor-page");if(0===t.length)e();else{var a=document.getElementsByClassName("gsc-cursor-current-page");0===a.length||a[0]!==t[t.length-1]?l?(l=!1,t[t.length-1].click()):e():(clearInterval(u),l=!0,setTimeout(function(){previousSearch=n,parseResultsFromGoogle(document.getElementsByClassName("gsc-cursor-current-page")[0].innerText.trim()),onSearchEnded()},2e3),c=0)}},1e3)},i.open("GET","https://allow-any-origin.appspot.com/"+a,!0),i.send(null)}}function startGoogleSearch(){var e=google.search.cse.element.getAllElements().standard0;if(e.execute(document.getElementById("query").value.trim()),firstSearch){firstSearch=!1;for(var t=0;t<document.styleSheets.length;t++){var n=document.styleSheets[t].href;n.endsWith("bootstrap.css")||n.endsWith("homepage.css")||(document.styleSheets[t].disabled=!0)}}}function startQuery(e){if(!searchRunning){searchRunning=!0,runQuery(8,e);try{startGoogleSearch()}catch(t){var n=0,r=setInterval(function(){try{clearInterval(r),startGoogleSearch(),n=0}catch(e){n++,n>10&&(clearInterval(r),n=0)}},1e3)}}}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=n.exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}function runQueryFromUrl(){var e=getParameterByName("search");null===e||""===e?(document.getElementById("query").value="",clearResults(),previousSearch="",$("#results").fadeOut("fast")):(document.getElementById("query").value=unescape(e),startQuery(!1))}var previousSearch="",searchRunning=!1,lastOptionSelected=0,firstSearch=!0,options=["Hold on...","Exploring...","Searching...","Diving...","Interesting...","Navigating...","Looking...","Curious?...","Browsing..."];!function(){$("#jserror").hide(),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),Array.from||(Array.from=function(){var e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},n=function(e){var t=Number(e);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*(0|Math.abs(t)):t},r=Math.pow(2,53)-1,a=function(e){var t=n(e);return Math.min(Math.max(t,0),r)};return function(e){var n=this,r=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var i,o=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof o){if(!t(o))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(i=arguments[2])}for(var s,c=a(r.length),l=t(n)?Object(new n(c)):new Array(c),u=0;c>u;)s=r[u],o?l[u]="undefined"==typeof i?o(s,u):o.call(i,s,u):l[u]=s,u+=1;return l.length=c,l}}()),document.body.insertBefore(Trianglify({width:window.innerWidth,height:window.innerHeight,cell_size:75}).canvas(),document.body.firstChild)}(),function(e){e.fn.configTextScaling=function(t,n,r){return t=.002*t||.002,r=r||Number.POSITIVE_INFINITY,this.each(function(){function a(){i.css("font-size",Math.max(Math.min(i.width()*t,r),n)+"em")}var i=e(this);a(),e(window).on("resize.fittext orientationchange.fittext",a)})}}(jQuery),$(document).ready(function(){$("h1").configTextScaling(3,2),$("h2").configTextScaling(.8,1.5),$("h3").configTextScaling(1.1,2),$("h4").configTextScaling(.5,1),$("h5").configTextScaling(.7,1.2),$("h6").configTextScaling(.4,1.1),$("p").configTextScaling(.45,1),$("a").configTextScaling(.45,1),$("span").configTextScaling(.45,1),$("input").configTextScaling(.45,1),$("cite").configTextScaling(.45,1),$("button").configTextScaling(.45,1),$("#left-arrow").height($("#query").height());var e=$("#search");e.click(function(){startQuery(!0)}),e.mouseup(function(){$("input").focus()}),$("#query").keypress(function(e){13===e.keyCode&&startQuery(!0)}),window.onpopstate=function(e){runQueryFromUrl()},$("input").focus(),$("#container").animate({opacity:1},200),runQueryFromUrl()});