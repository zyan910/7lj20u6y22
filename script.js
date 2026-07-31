// ======================================
// CONFIG
// ======================================

const CORRECT_CODE = "2108";

// ======================================
// PAGES
// ======================================

const pages = {

    welcome: document.getElementById("welcome"),
    passcode: document.getElementById("passcode"),
    letter: document.getElementById("letter"),
    gallery: document.getElementById("gallery"),
    final: document.getElementById("final")

};

// ======================================
// SHOW PAGE
// ======================================

function showPage(pageName){

    Object.values(pages).forEach(page=>{

        page.classList.remove("active");

    });

    pages[pageName].classList.add("active");

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

}

// ======================================
// BUTTONS
// ======================================

document.getElementById("continueBtn").addEventListener("click",()=>{

    showPage("passcode");

});

document.getElementById("memoriesBtn").addEventListener("click",()=>{

    showPage("gallery");

});

document.getElementById("restartBtn").addEventListener("click",()=>{

    enteredCode = "";

    updateDisplay();

    showPage("welcome");

});

// ======================================
// PASSCODE
// ======================================

let enteredCode="";

const codeDisplay=document.getElementById("codeDisplay");

const error=document.getElementById("error");

function updateDisplay(){

    let display="";

    for(let i=0;i<4;i++){

        display += i<enteredCode.length ? "❤️ " : "♡ ";

    }

    codeDisplay.innerHTML=display;

}

function checkCode(){

    if(enteredCode===CORRECT_CODE){

        enteredCode="";

        updateDisplay();

        playPetals(()=>{});

        return;

    }

    error.innerText="oops that's not our date ❤️";

    setTimeout(()=>{

        enteredCode="";

        updateDisplay();

        error.innerText="";

    },1000);

}

document.querySelectorAll(".num").forEach(button=>{

    function press(){

        if(enteredCode.length>=4) return;

        enteredCode += button.textContent.trim();

        updateDisplay();

        if(enteredCode.length===4){

            checkCode();

        }

    }

    button.addEventListener("click",press);

    button.addEventListener("touchstart",e=>{

        e.preventDefault();

        press();

    });

});

function deleteDigit(){

    enteredCode=enteredCode.slice(0,-1);

    updateDisplay();

}

document.getElementById("delete").addEventListener("click",deleteDigit);

document.getElementById("delete").addEventListener("touchstart",e=>{

    e.preventDefault();

    deleteDigit();

});

updateDisplay();

// ======================================
// MEMORY WALL
// ======================================

document.getElementById("finishBtn").addEventListener("click",()=>{

    showPage("final");

});

// ======================================
// INITIAL PAGE
// ======================================

showPage("welcome");

// ======================================
// CINEMATIC BLOOM TRANSITION
// ======================================

function playPetals(callback){

    const overlay=document.getElementById("transitionOverlay");
    const container=document.getElementById("petalContainer");
    const card=document.getElementById("passcodeCard");

    overlay.classList.add("active");

    card.classList.add("hide");

    container.innerHTML="";

    const petals=8;

    for(let i=0;i<petals;i++){

        const petal=document.createElement("div");

        petal.className="petal";

        const angle=(360/petals)*i+(Math.random()*18-9);

        const distance=420;

        const x=Math.cos(angle*Math.PI/180)*distance;
        const y=Math.sin(angle*Math.PI/180)*distance;

        petal.style.setProperty("--x",x+"px");
        petal.style.setProperty("--y",y+"px");

        petal.style.setProperty(
            "--r",
            (Math.random()*240-120)+"deg"
        );

        petal.innerHTML=`

<svg viewBox="0 0 200 200">

<defs>

<radialGradient id="g${i}" cx="45%" cy="35%">

<stop offset="0%" stop-color="#ffeef6"/>

<stop offset="65%" stop-color="#f7bfd6"/>

<stop offset="100%" stop-color="#e88ab1"/>

</radialGradient>

</defs>

<path
fill="url(#g${i})"

d="M100 22

C130 15 164 42 171 78

C178 112 155 147 122 176

C112 184 101 188 100 188

C99 188 88 184 78 176

C45 147 22 112 29 78

C36 42 70 15 100 22Z"/>

</svg>

`;

        container.appendChild(petal);

    }

    setTimeout(()=>{

        showPage("letter");

    },900);

    setTimeout(()=>{

        overlay.classList.remove("active");

        container.innerHTML="";

        card.classList.remove("hide");

        callback();

    },2100);

}

// ======================================
// POLAROID ANIMATION
// ======================================

const polaroids = document.querySelectorAll(".polaroid");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

polaroids.forEach(photo=>{

    observer.observe(photo);

});


