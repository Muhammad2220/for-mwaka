const hearts = document.getElementById("hearts");
const sparkles = document.getElementById("sparkles");

// Floating Hearts

for(let i=0;i<30;i++){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(15+Math.random()*25)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    heart.style.animationDelay=Math.random()*5+"s";

    hearts.appendChild(heart);

}

// Sparkles

for(let i=0;i<40;i++){

    const star=document.createElement("div");

    star.className="sparkle";

    star.style.left=Math.random()*100+"vw";

    star.style.top=Math.random()*100+"vh";

    star.style.animationDelay=Math.random()*2+"s";

    sparkles.appendChild(star);

}
