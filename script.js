const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const message = document.getElementById("message");

// Make the "No" button run away 😆
noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});

// When they say YES 💖
yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;
        font-family:Arial;background:linear-gradient(135deg,#a1ffce,#faffd1);text-align:center;">
            <div>
                <h1>Yay!! 😭💖</h1>
                <p>You just made someone very happy hehe</p>
            </div>
        </div>
    `;
});
