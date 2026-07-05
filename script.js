const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

// Move function (reusable)
function moveButton() {
    const padding = 80;

    const x = Math.random() * (window.innerWidth - padding);
    const y = Math.random() * (window.innerHeight - padding);

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

// Desktop: hover
noBtn.addEventListener("mouseover", moveButton);

// Mobile: touch (IMPORTANT FIX)
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // stops delay / double tap issues
    moveButton();
});

// Extra safety: if they manage to click it 😭
noBtn.addEventListener("click", moveButton);

// YES button
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
