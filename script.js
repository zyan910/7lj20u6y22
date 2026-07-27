// ======================================
// CONFIG
// ======================================

const CORRECT_CODE = "1234"; // Change later

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

        showPage("letter");

        return;

    }

    error.innerText="That's not our special date ❤️";

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

