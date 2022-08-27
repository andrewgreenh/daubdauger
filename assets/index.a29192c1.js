var E=Object.defineProperty;var H=(e,t,i)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var y=(e,t,i)=>(H(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const g of r.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&o(g)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();function M(e,t){const i=T({from:e.x,to:e.x+e.width},{from:t.x,to:t.x+t.width}),o=T({from:e.y,to:e.y+e.height},{from:t.y,to:t.y+t.height});return i&&o}function T(e,t){const i=(e.from+e.to)/2,o=Math.abs(e.from-e.to)/2,n=(t.from+t.to)/2,r=Math.abs(t.from-t.to)/2;return Math.abs(i-n)<o+r}function L(e,t){const i=t-e+1;return Math.round(Math.random()*i+e)}const s={to:(e,t)=>[e,t],add:(e,t)=>[e[0]+t[0],e[1]+t[1]],scale:(e,t)=>[e[0]*t,e[1]*t],length:e=>(e[0]**2+e[1]**2)**.5,normalize:e=>{const t=s.length(e);return[e[0]/t,e[1]/t]}};Object.assign(window,{Vector:s});const z=50;class P{constructor(){y(this,"position",s.to(L(z,d-z),L(z,l-z)));y(this,"height",20);y(this,"width",4)}paint(t){t.fillStyle="white";const[i,o]=this.position,n=this.width,r=this.height;t.save(),t.translate(i,o),t.fillRect(-n/2,-r/2,n,r),t.rotate(Math.PI/4),t.fillRect(-n/2,-r/2,n,r),t.rotate(Math.PI/4),t.fillRect(-n/2,-r/2,n,r),t.rotate(Math.PI/4),t.fillRect(-n/2,-r/2,n,r),t.restore()}}const h={UP:s.to(0,-1),UP_RIGHT:s.normalize(s.to(1,-1)),RIGHT:s.to(1,0),DOWN_RIGHT:s.normalize(s.to(1,1)),DOWN:s.to(0,1),DOWN_LEFT:s.normalize(s.to(-1,1)),LEFT:s.to(-1,0),UP_LEFT:s.normalize(s.to(1,1))},m=[h.UP,h.RIGHT,h.DOWN,h.LEFT];function w(e){let t=h.UP;function i(){t=m[(m.indexOf(t)+1)%m.length]}return{init(o){o.position=[0,l-o.size[1]]},handleInput(o){(o.position[0]===0||o.position[0]+o.size[0]===d||o.position[1]===0||o.position[1]+o.size[1]===l)&&i()},update(o){o.position=s.add(o.position,s.scale(t,e)),o.position[0]+o.size[0]>d?(i(),o.position[0]=d-o.size[0]):o.position[0]<0?(i(),o.position[0]=0):o.position[1]<0?(i(),o.position[1]=0):o.position[1]+o.size[1]>l&&(i(),o.position[1]=l-o.size[1])}}}function I(e){let t=h.RIGHT;return{init(i){i.position=[0,l-i.size[1]]},handleInput(i){i.position[1]+i.size[1]===l&&(t=s.normalize([t[0],-1]))},update(i){i.position=s.add(i.position,s.scale(t,e)),i.position[0]+i.size[0]>d?(i.position[0]=d-i.size[0],t=[t[0]*-1,t[1]]):i.position[0]<0?(i.position[0]=0,t=[t[0]*-1,t[1]]):i.position[1]<0?(i.position[1]=0,t=[t[0],t[1]*-1]):i.position[1]+i.size[1]>l&&(i.position[1]=l-i.size[1],t=s.normalize([t[0],0]))}}}function O(e){let t="RIGHT",i="RIGHT";return{init(o){o.position=[0,l-o.size[1]]},handleInput(){i!=="UP"&&i!=="DOWN"&&(i="UP")},update(o){o.position=s.add(o.position,s.scale(h[i],e)),{RIGHT:()=>{o.position[0]+o.size[0]>=d&&(t="LEFT",i="LEFT",o.position[0]=d-o.size[0])},LEFT:()=>{o.position[0]<=0&&(t="RIGHT",i="RIGHT",o.position[0]=0)},UP:()=>{o.position[1]<=0&&(i="DOWN",o.position[1]=0)},DOWN:()=>{o.position[1]+o.size[1]>=l&&(i=t,o.position[1]=l-o.size[1])}}[i]()}}}class b{constructor(t){y(this,"size",s.to(192,102));y(this,"position",s.to(0,l-this.size[1]));this.movementStrategy=t,document.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&this.movementStrategy.handleInput(this)}),document.addEventListener("click",()=>this.movementStrategy.handleInput(this))}update(){this.movementStrategy.update(this)}paint(t){t.fillStyle="red",t.fillRect(this.position[0],this.position[1],this.size[0],this.size[1])}}const a=document.createElement("canvas"),d=1920,l=1080;a.width=d;a.height=l;a.style.maxHeight="100vh";a.style.maxWidth="100vw";a.style.background="#343434";document.body.appendChild(a);const f=a.getContext("2d"),S=[O(10),O(15),O(25),w(10),w(15),w(25),I(10),I(15),I(25)];let R=0;const p=new b(S[R]);p.movementStrategy.init(p);let c=Array(10).fill(0).map(()=>new P);function D(){if(f.clearRect(0,0,d,l),f.fillStyle="white",f.strokeStyle="none",f.font="30px Arial",f.fillText(`Level ${R}`,50,50),p.update(),c=c.filter(e=>!M({x:e.position[0],y:e.position[1],height:e.height,width:e.height},{x:p.position[0],y:p.position[1],width:p.size[0],height:p.size[1]})),c.length===0){c=Array(10).fill(0).map(()=>new P);const e=S[++R];e&&(p.movementStrategy=e,p.movementStrategy.init(p))}for(const e of c)e.paint(f);p.paint(f),requestAnimationFrame(D)}requestAnimationFrame(D);
