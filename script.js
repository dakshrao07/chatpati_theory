const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms)),R=(a,b)=>a+Math.random()*(b-a);

// ---- bulbs + steam ----
for(let i=0;i<14;i++){const b=document.createElement('i');b.className='bulb';b.style.left=(i/13*96+2)+'%';b.style.top=(18+Math.sin(i/13*Math.PI)*16)+'px';b.style.animationDelay=(-R(0,2.4))+'s';b.style.background=['#ffb703','#ff6fa5','#7ae582','#ffb703'][i%4];$('bulbs').appendChild(b)}
for(let i=0;i<14;i++){const s=document.createElement('i');s.className='st';const z=R(60,160);s.style.cssText=`left:${R(0,100)}%;width:${z}px;height:${z}px;--t:${R(9,18)}s;--x:${R(-60,60)}px;animation-delay:${-R(0,14)}s`;$('steam').appendChild(s)}

const em=['🌶️','🫧','💖','😤','🥰','🍯','✨'];
function burst(x,y,n=8){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='pop';s.textContent=em[Math.random()*em.length|0];s.style.cssText=`left:${x}px;top:${y}px;--x:${R(-150,150)}px;--y:${R(-220,-40)}px;--r:${R(-90,90)}deg`;document.body.appendChild(s);setTimeout(()=>s.remove(),1500)}}
addEventListener('pointerdown',e=>{if(e.target.tagName!=='INPUT')burst(e.clientX,e.clientY,3)});
let tt;function toast(m,ms=2800){const e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),ms)}
const go=id=>$(id).scrollIntoView({behavior:'smooth'});

// ---- 1. order slip ----
const rows=[
 ['<div class="c">★ CHATPATI CHAAT CORNER ★</div>'],
 ['<div class="c">Order #1711 · Table: Dil ❤️</div><hr>'],
 ['<div class="r"><span>Customer</span><b>Disha Ji</b></div>'],
 ['<div class="r"><span>Waiter</span><b>Daksh</b></div><hr>'],
 ['<div class="r"><span>1× "I hate you"</span><span class="red">EXTRA TEEKHA</span></div>'],
 ['<div class="r"><span>1× Mazaak-Masti</span><span>₹0</span></div>'],
 ['<div class="r"><span>2× Chatpata-pan</span><span>FREE</span></div>'],
 ['<div class="r"><span>∞× I like you (hidden)</span><span>PRICELESS</span></div><hr>'],
 ['<div class="r"><b>Total Gussa</b><b>100%</b></div>'],
 ['<div class="r"><b>Asli Matlab</b><b class="red">???</b></div>'],
 ['<div class="c">Dobara aaiye, Disha ji 🙏</div>']
];
let ran=false;
async function printSlip(){if(ran)return;ran=true;$('slip').classList.add('on');for(const r of rows){$('slipIn').insertAdjacentHTML('beforeend',r[0]);await sleep(230)}}
new IntersectionObserver(e=>e[0].isIntersecting&&setTimeout(printSlip,500),{threshold:.4}).observe($('s1'));
$('b1').onclick=()=>go('s2');

// ---- 2. gussa meter ----
const stages=[
 ['I HATE YOU','😤','Full gussa mode on hai 🌶️'],
 ['I HATE YOU... 😒','😒','Thoda thoda pighal rahi hain...'],
 ['I h8 u (thoda sa)','😏','Aankhon mein muskaan dikh rahi hai 👀'],
 ['I... kinda like you 🙈','🥺','Dil ne vote badal diya!'],
 ['I LIKE YOU 🥰','🥰','Pakda gaya! Masti ke peeche asli matlab yahi tha 😄']
];
let last=-1,hitLove=false;
$('slider').addEventListener('input',e=>{
  const v=+e.target.value,i=Math.min(4,Math.floor(v/20.01));
  if(i!==last){last=i;const [t,f,n]=stages[i];$('stampT').textContent=t;$('face').textContent=f;$('note').textContent=n;
    $('stamp').classList.toggle('love',i>=3);$('stamp').classList.remove('shake');void $('stamp').offsetWidth;$('stamp').classList.add('shake');
    if(i===4&&!hitLove){hitLove=true;const r=$('stamp').getBoundingClientRect();burst(r.left+r.width/2,r.top,16);toast('Pakda gaya! "I hate you" = "I like you" 😏 (Daksh ka bhi yahi hai, Disha ji)',3200);setTimeout(()=>go('s3'),2600)}}
});

// ---- 3. dictionary ----
const D=[
 ['"I hate you"','masti mein','"I like you, bas seedha bolna nahi aata 😜"'],
 ['"Chup raho!"','hansi aa rahi hai','"Achha achha, aur sunao"'],
 ['"Bhaag yahan se"','ruko mat','"Arre ruko, thodi der aur baat karte hain"'],
 ['"Kuch nahi hua"','thoda mood off','"Thoda sa mana lijiye na 🙂"'],
];
D.forEach(([a,s,b])=>{const c=document.createElement('div');c.className='cd';c.innerHTML=`<div class="ci"><div class="fa">${a}<small>tap kijiye 👆</small></div><div class="ba">${b}</div></div>`;c.onclick=()=>{c.classList.toggle('f');if(document.querySelectorAll('.cd.f').length===D.length&&!c.dataset.d){c.dataset.d=1;toast('Saare translation mil gaye! Ab golgappe 🫧');setTimeout(()=>go('s4'),2200)}};$('cards').appendChild(c)});
$('cards').addEventListener('click',()=>{if(document.querySelectorAll('.cd.f').length===D.length&&!$('cards').dataset.d){$('cards').dataset.d=1;toast('Saare translation mil gaye! Ab golgappe 🫧',3000);setTimeout(()=>go('s4'),2600)}});

// ---- 4. golgappa ----
const G=[
 ['🌶️','#ff4d4d','Teekha pani: aapka gussa bhi mujhe cute lagta hai, Disha ji'],
 ['🍯','#ffb703','Meetha pani: aapki "I hate you" mein bhi mithaas hai'],
 ['🌿','#7ae582','Pudina pani: aapke saath har jhagda bhi taaza lagta hai'],
 ['🍋','#f4e04d','Khatta pani: kabhi kabhi khatti baatein, par saath aapka hi achha lagta hai'],
 ['🧄','#c8a2ff','Hing pani: aapki chatpati baatein, mera favourite swaad'],
 ['💧','#6fd3ff','Jaljeera: thandak aapki muskaan jaisi, taaza aur pyaari']
];
let pc=0;
G.forEach(([e,c,t])=>{const b=document.createElement('button');b.className='gg';b.style.setProperty('--c',c);b.textContent='🫓';b.onclick=()=>{if(b.classList.contains('done'))return;b.classList.add('done','pop');b.textContent=e;pc++;$('cnt').textContent=pc;toast(t,3600);const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top,6);if(pc===6)setTimeout(verdict,3800)};$('plate').appendChild(b)});

// ---- 5. verdict ----
const VT="Aaj ki adalat mein saabit hua ki Disha ji ne masti mein 'I hate you' bola, aur Daksh ne usme sirf 'I like you' hi suna. Gawaah golgappe bhi yahi keh rahe hain, aur saboot milte hain ki Disha ji ka bhi yahi haal hai 😄. Saza: saath mein chaat, masti, hansi aur thoda lamba saath. Ab faisla aapke haath mein hai, Disha ji.";
let vdone=false;
async function verdict(){
  if(vdone)return;vdone=true;go('s5');await sleep(900);
  $('gavel').classList.add('hit');await sleep(350);$('verdict').classList.add('on');
  const el=$('vt');for(const ch of VT){el.textContent+=ch;await sleep(22)}
  $('stamp2').classList.add('on');
}
// runaway "no" button
const no=$('no');let dodges=0;
const run=e=>{e.preventDefault();dodges++;const x=R(-110,110),y=R(-70,70);no.style.transform=`translate(${x}px,${y}px) rotate(${R(-20,20)}deg)`;
  const m=['Arre! 😝','Pakad ke dikhaiye 😜','Itna bhi gussa nahi hai 🙈','Button bhaag gaya!','Disha ji, button ko bhi thoda manaiye 😂'];
  $('endNote').textContent=m[Math.min(dodges-1,m.length-1)]};
no.addEventListener('pointerenter',run);no.addEventListener('touchstart',run,{passive:false});no.addEventListener('click',run);
$('yes').onclick=async e=>{
  for(let i=0;i<30;i++)setTimeout(()=>burst(R(0,innerWidth),innerHeight*R(.5,.95),2),i*80);
  $('fin').innerHTML='';$('endNote').innerHTML='<b style="font-size:1.3rem;color:#ffb703">Done! I like you, Disha ji 😄<br>Aur aapka bhi, hai na? 🫶<br>Chaliye golgappe khane, aaj meri taraf se 🫓</b>';
};
