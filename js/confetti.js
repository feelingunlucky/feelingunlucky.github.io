var startConfetti,stopConfetti,toggleConfetti,removeConfetti,maxParticleCount=150,particleSpeed=2;!function(){startConfetti=a,stopConfetti=l,toggleConfetti=function(){e?l():a()},removeConfetti=function(){stopConfetti(),i=[]};var t=["DodgerBlue","OliveDrab","Gold","pink","SlateBlue","lightblue","Violet","PaleGreen","SteelBlue","SandyBrown","Chocolate","Crimson"],e=!1,n=null,i=[],o=0;function r(e,n,i){return e.color=t[Math.random()*t.length|0],e.x=Math.random()*n,e.y=Math.random()*i-i,e.diameter=10*Math.random()+5,e.tilt=10*Math.random()-10,e.tiltAngleIncrement=.07*Math.random()+.05,e.tiltAngle=0,e}function a(){var t=window.innerWidth,a=window.innerHeight;window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,16.6666667)};var l=document.getElementById("confetti-canvas");null===l&&((l=document.createElement("canvas")).setAttribute("id","confetti-canvas"),l.setAttribute("style","display:block;z-index:999999;pointer-events:none"),document.body.appendChild(l),l.width=t,l.height=a,window.addEventListener("resize",function(){l.width=window.innerWidth,l.height=window.innerHeight},!0));for(var d=l.getContext("2d");i.length<maxParticleCount;)i.push(r({},t,a));e=!0,null===n&&function t(){if(d.clearRect(0,0,window.innerWidth,window.innerHeight),0===i.length)return n=null,null;!function(){var t,n=window.innerWidth,a=window.innerHeight;o+=.01;for(var l=0;l<i.length;l++)t=i[l],!e&&t.y<-15?t.y=a+100:(t.tiltAngle+=t.tiltAngleIncrement,t.x+=Math.sin(o),t.y+=.5*(Math.cos(o)+t.diameter+particleSpeed),t.tilt=15*Math.sin(t.tiltAngle)),(t.x>n+20||t.x<-20||t.y>a)&&(e&&i.length<=maxParticleCount?r(t,n,a):(i.splice(l,1),l--))}(),function(t){for(var e,n,o=0;o<i.length;o++)e=i[o],t.beginPath(),t.lineWidth=e.diameter,t.strokeStyle=e.color,n=e.x+e.tilt,t.moveTo(n+e.diameter/2,e.y),t.lineTo(n,e.y+e.tilt+e.diameter/2),t.stroke()}(d),n=requestAnimFrame(t)}()}function l(){e=!1}}();