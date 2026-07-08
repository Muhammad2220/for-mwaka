/* ======================================================
   EDIT THIS ARRAY — this is the only part you need to touch
   for the constellation. Add, remove, or rewrite memories.
   x/y are positions in a 900x460 canvas (roughly).
   ====================================================== */
const memories = [
  { x: 120, y: 340, tag: "The Beginning",  text: "The day our paths crossed, and something in me just knew you were going to matter." },
  { x: 260, y: 180, tag: "The First Trip", text: "Every place feels better when you're standing next to me. That's when I noticed it most." },
  { x: 430, y: 300, tag: "That One Night", text: "The kind of night we still laugh about — small, ordinary, and somehow unforgettable." },
  { x: 560, y: 120, tag: "The Hard Part",  text: "The moment things got difficult, and you stayed anyway. That's when I knew what we had was real." },
  { x: 700, y: 260, tag: "Right Now",      text: "Today, tomorrow, and every ordinary day in between — still choosing you." },
  { x: 800, y: 90,  tag: "What's Next",    text: "So many more stars left to fill, and I only want to fill them with you." },
];

const svgNS = "http://www.w3.org/2000/svg";
const sky = document.getElementById("sky");

// draw connecting lines first (so stars sit on top)
for (let i = 0; i < memories.length - 1; i++){
  const a = memories[i], b = memories[i+1];
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
  line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
  line.setAttribute("class", "link-line");
  line.dataset.index = i;
  sky.appendChild(line);
}

// scatter a few faint background dots for texture
for (let i = 0; i < 40; i++){
  const dot = document.createElementNS(svgNS, "circle");
  dot.setAttribute("cx", Math.random()*900);
  dot.setAttribute("cy", Math.random()*460);
  dot.setAttribute("r", Math.random()*1.2 + 0.3);
  dot.setAttribute("fill", "rgba(250,246,238,0.25)");
  sky.appendChild(dot);
}

const memoryCard = document.getElementById("memoryCard");
let litCount = 0;

memories.forEach((m, idx) => {
  const g = document.createElementNS(svgNS, "g");
  g.setAttribute("class", "star-node");
  g.setAttribute("tabindex", "0");
  g.setAttribute("role", "button");
  g.setAttribute("aria-label", m.tag);

  const glow = document.createElementNS(svgNS, "circle");
  glow.setAttribute("cx", m.x);
  glow.setAttribute("cy", m.y);
  glow.setAttribute("r", 16);
  glow.setAttribute("fill", "transparent");

  const core = document.createElementNS(svgNS, "circle");
  core.setAttribute("class", "core");
  core.setAttribute("cx", m.x);
  core.setAttribute("cy", m.y);
  core.setAttribute("r", 5);

  const label = document.createElementNS(svgNS, "text");
  label.setAttribute("class", "star-label");
  label.setAttribute("x", m.x);
  label.setAttribute("y", m.y - 16);
  label.textContent = m.tag;

  g.appendChild(glow);
  g.appendChild(core);
  g.appendChild(label);
  sky.appendChild(g);

  function activate(){
    // light this star + the line connecting to previous star
    if (!g.classList.contains("lit")){
      g.classList.add("lit");
      litCount++;
    }
    const prevLine = sky.querySelector(`.link-line[data-index="${idx-1}"]`);
    const nextLine = sky.querySelector(`.link-line[data-index="${idx}"]`);
    if (prevLine) prevLine.classList.add("lit");
    if (nextLine) nextLine.classList.add("lit");

    memoryCard.classList.remove("visible", "placeholder");
    // retrigger animation
    void memoryCard.offsetWidth;
    memoryCard.innerHTML = `<span class="tag">${m.tag}</span><p>${m.text}</p>`;
    memoryCard.classList.add("visible");
  }

  g.addEventListener("click", activate);
  g.addEventListener("keypress", (e) => { if (e.key === "Enter" || e.key === " ") activate(); });
});

// ---------- envelope / letter ----------
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");
const envelopeHint = document.getElementById("envelopeHint");

envelope.addEventListener("click", () => {
  letterPaper.classList.add("show");
  envelopeHint.style.display = "none";
  letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
});

// ---------- background twinkling canvas ----------
const canvas = document.getElementById("bg-stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
function seedStars(){
  const count = Math.floor((canvas.width * canvas.height) / 9000);
  stars = Array.from({length: count}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.1 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.005 + Math.random() * 0.01
  }));
}
resize();
seedStars();
window.addEventListener("resize", () => { resize(); seedStars(); });

let t = 0;
function draw(){
  t += 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(250,246,238,${0.15 + twinkle * 0.5})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
