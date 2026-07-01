const introText = "I made this little page just to make you smile 😊";

const messages = [
  "You have a beautiful smile ❤️",
  "The world is better with you in it 🌸",
  "You are truly amazing ✨",
  "Never forget how special you are 💖",
  "Someone is smiling because of you today 😊",
  "You deserve happiness every day ☀️",
  "This is your reminder: you're doing great ❤️"
];

let introIndex = 0;
let msgIndex = 0;

const introEl = document.getElementById("intro");
const msgEl = document.getElementById("message");

// Type intro
function typeIntro() {
  if (introIndex < introText.length) {
    introEl.innerHTML += introText.charAt(introIndex);
    introIndex++;
    setTimeout(typeIntro, 50);
  }
}

// Loop messages
function showMessage() {
  msgEl.style.opacity = 0;

  setTimeout(() => {
    msgEl.innerHTML = messages[msgIndex];
    msgEl.style.opacity = 1;

    msgIndex++;
    if (msgIndex >= messages.length) msgIndex = 0;

  }, 400);
}

setTimeout(() => {
  typeIntro();
  showMessage();
  setInterval(showMessage, 3000);
}, 500);

function restart() {
  introEl.innerHTML = "";
  introIndex = 0;
  typeIntro();
}