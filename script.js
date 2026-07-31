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

        playPetals(()=>{

            showPage("letter");

        });

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
// PETAL ANIMATION
// ======================================

function playPetals(callback){

    const container = document.getElementById("petalContainer");

    container.innerHTML = "";

    for(let i=0;i<25;i++){

        const petal = document.createElement("div");

        petal.className = "petal";

        const angle = Math.random() * Math.PI * 2;
        const distance = 350 + Math.random() * 250;

        petal.style.left = "50%";
        petal.style.top = "50%";

        petal.style.setProperty("--x",
            Math.cos(angle) * distance + "px");

        petal.style.setProperty("--y",
            Math.sin(angle) * distance + "px");

        petal.style.setProperty("--r",
            (Math.random()*720-360)+"deg");

        petal.style.animationDelay =
            (Math.random()*0.2)+"s";

        container.appendChild(petal);

    }

    setTimeout(()=>{

        container.innerHTML="";

        callback();

    },2200);

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


