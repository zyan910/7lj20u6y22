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

    enteredCode="";

    updateDisplay();

    currentPhoto=0;

    updateGallery();

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
// GALLERY
// ======================================

const photos = [
    "photos/1.jpg",
    "photos/2.jpg",
    "photos/3.jpg",
    "photos/4.jpg",
    "photos/5.jpg",
    "photos/6.jpg",
    "photos/7.jpg",
    "photos/8.jpg",
    "photos/9.jpg",
    "photos/10.jpg"
];

const captions = [
    "One of my favourite memories ❤️",
    "This day still makes me smile.",
    "I wish we could relive this.",
    "You looked beautiful here.",
    "A memory I'll always treasure.",
    "Another unforgettable day.",
    "I still laugh at this one.",
    "Forever one of my favourites.",
    "I can't wait to make more memories.",
    "And this is only the beginning ❤️"
];

let currentPhoto = 0;

const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");

function updateGallery(){

    galleryImage.classList.add("fade");

    setTimeout(()=>{

        galleryImage.src = photos[currentPhoto];
        galleryCaption.textContent = captions[currentPhoto];

        galleryImage.classList.remove("fade");

    },200);

}

document.getElementById("nextBtn").addEventListener("click",()=>{

    if(currentPhoto < photos.length - 1){

        currentPhoto++;

        updateGallery();

    }else{

        showPage("final");

    }

});

document.getElementById("prevBtn").addEventListener("click",()=>{

    if(currentPhoto > 0){

        currentPhoto--;

        updateGallery();

    }

});

updateGallery();

// ======================================
// TOUCH SUPPORT
// ======================================

["nextBtn","prevBtn"].forEach(id=>{

    const button=document.getElementById(id);

    button.addEventListener("touchstart",e=>{

        e.preventDefault();

        button.click();

    });

});

// ======================================
// PRELOAD IMAGES
// ======================================

photos.forEach(src=>{

    const img=new Image();

    img.src=src;

});

// ======================================
// INITIAL PAGE
// ======================================

showPage("welcome");

