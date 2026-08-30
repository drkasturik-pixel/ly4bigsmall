const rounds=[
 {item:"boy",file:"boy.svg",target:"big"},
 {item:"umbrella",file:"umbrella.svg",target:"small"},
 {item:"bird",file:"bird.svg",target:"big"},
 {item:"ball",file:"ball.svg",target:"small"},
 {item:"flower",file:"flower.svg",target:"big"},
 {item:"cat",file:"cat.svg",target:"small"},
 {item:"kite",file:"kite.svg",target:"big"},
 {item:"apple",file:"apple.svg",target:"small"},
 {item:"car",file:"car.svg",target:"big"},
 {item:"butterfly",file:"butterfly.svg",target:"small"}
];

let index=0,score=0,locked=false;
const splash=document.getElementById("splash");
const startScreen=document.getElementById("startScreen");
const game=document.getElementById("game");
const endScreen=document.getElementById("endScreen");
const pair=document.getElementById("pair");
const instruction=document.getElementById("instruction");
const progress=document.getElementById("progress");
const scoreEl=document.getElementById("score");
const feedback=document.getElementById("feedback");
const confetti=document.getElementById("confetti");
const music=document.getElementById("music");
const correctSound=document.getElementById("correctSound");
const wrongSound=document.getElementById("wrongSound");

function playMusic(){music.volume=.15;const p=music.play();if(p)p.catch(()=>{});}
function render(){
 locked=false;
 const q=rounds[index];
 instruction.textContent=`Circle the ${q.target.toUpperCase()} ${q.item}.`;
 progress.textContent=`${index+1} / 10`;
 pair.innerHTML="";
 const sizes=Math.random()<.5?["big","small"]:["small","big"];
 sizes.forEach((size,i)=>{
   const b=document.createElement("button");
   b.type="button";b.className=`choice ${size}`;
   b.dataset.size=size;
   b.innerHTML=`<img src="assets/${q.file}" alt="${size} ${q.item}"><span class="label">${size}</span>`;
   b.addEventListener("pointerup",e=>{e.preventDefault();check(size,b)});
   pair.appendChild(b);
 });
 setTimeout(()=>speak(`Circle the ${q.target} ${q.item}.`),220);
}
function confettiBurst(){
 confetti.innerHTML="";
 const colors=["#ff6b6b","#ffd43b","#69db7c","#4dabf7","#cc5de8"];
 for(let i=0;i<70;i++){
  const p=document.createElement("div");p.className="piece";
  p.style.left=Math.random()*100+"vw";
  p.style.animationDelay=Math.random()*.2+"s";
  p.style.background=colors[i%colors.length];
  confetti.appendChild(p);
 }
 setTimeout(()=>confetti.innerHTML="",1200);
}
function showCorrect(){
 feedback.textContent="✓";feedback.style.color="#35a853";feedback.classList.remove("hidden");
 correctSound.currentTime=0;correctSound.play().catch(()=>{});
 confettiBurst();
 setTimeout(()=>feedback.classList.add("hidden"),850);
}
function showWrong(){
 feedback.textContent="✕";feedback.style.color="#e53935";feedback.classList.remove("hidden");
 wrongSound.currentTime=0;wrongSound.play().catch(()=>{});
 setTimeout(()=>feedback.classList.add("hidden"),800);
}
function check(size,button){
 if(locked)return;
 const q=rounds[index];
 if(size===q.target){
   locked=true;score++;scoreEl.textContent="⭐ "+score;
   button.classList.add("selected");speak("Correct! Well done!");showCorrect();
   setTimeout(()=>{index++;if(index>=rounds.length)finish();else render()},950);
 }else{
   button.classList.add("wrong");showWrong();
   speak("Try again. Look carefully.");
   setTimeout(()=>button.classList.remove("wrong"),700);
 }
}
function start(){
 startScreen.classList.add("hidden");endScreen.classList.add("hidden");game.classList.remove("hidden");
 index=0;score=0;scoreEl.textContent="⭐ 0";playMusic();render();
}
function finish(){
 game.classList.add("hidden");endScreen.classList.remove("hidden");
 document.getElementById("finalScore").textContent=`You scored ${score} out of 10!`;
 speak(`Great job! You scored ${score} out of 10.`);
}
document.getElementById("startBtn").addEventListener("click",start);
document.getElementById("againBtn").addEventListener("click",start);
document.getElementById("hearBtn").addEventListener("click",()=>{
 const q=rounds[index];speak(`Circle the ${q.target} ${q.item}.`);
});
window.addEventListener("load",()=>setTimeout(()=>{
 splash.style.display="none";startScreen.classList.remove("hidden");
},5000));
