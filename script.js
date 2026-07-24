// --------------------
// CONFIG
// --------------------

const CORRECT_CODE = "1234";   // Change this later

// --------------------
// PAGE ELEMENTS
// --------------------

const welcomePage = document.getElementById("welcome");
const passcodePage = document.getElementById("passcode");

const continueBtn = document.getElementById("continueBtn");

const codeDisplay = document.getElementById("codeDisplay");
const error = document.getElementById("error");

const numberButtons = document.querySelectorAll(".num");
const deleteButton = document.getElementById("delete");

// --------------------
// VARIABLES
// --------------------

let enteredCode = "";

// --------------------
// PAGE NAVIGATION
// --------------------

continueBtn.addEventListener("click", () => {

    welcomePage.classList.remove("active");
    passcodePage.classList.add("active");

});

// --------------------
// UPDATE HEARTS
// --------------------

function updateDisplay(){

    let hearts = "";

    for(let i=0;i<4;i++){

        if(i < enteredCode.length){

            hearts += "❤️ ";

        }else{

            hearts += "♡ ";

        }

    }

    codeDisplay.innerHTML = hearts;

}

// --------------------
// NUMBER BUTTONS
// --------------------

numberButtons.forEach(button => {

    function pressButton() {

        if (enteredCode.length >= 4) return;

        enteredCode += button.textContent.trim();

        updateDisplay();

        if (enteredCode.length === 4) {

            checkCode();

        }

    }

    button.addEventListener("click", pressButton);

    button.addEventListener("touchstart", function(e){

        e.preventDefault();

        pressButton();

    });

});

// --------------------
// DELETE
// --------------------

function deleteDigit(){

    enteredCode = enteredCode.slice(0,-1);

    updateDisplay();

}

deleteButton.addEventListener("click", deleteDigit);

deleteButton.addEventListener("touchstart", function(e){

    e.preventDefault();

    deleteDigit();

});

// --------------------
// CHECK CODE
// --------------------

function checkCode(){

    if(enteredCode === CORRECT_CODE){

        passcodePage.classList.remove("active");

document.getElementById("letter").classList.add("active");

    }else{

        error.innerText = "That's not our special date ❤️";

        setTimeout(()=>{

            enteredCode = "";

            updateDisplay();

            error.innerText = "";

        },1000);

    }

}

// --------------------

updateDisplay();

const memoriesBtn = document.getElementById("memoriesBtn");

if(memoriesBtn){

    memoriesBtn.addEventListener("click", ()=>{

        document.getElementById("letter").classList.remove("active");

        document.getElementById("gallery").classList.add("active");

    });

}

// ==========================
// GALLERY
// ==========================

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

const galleryImage=document.getElementById("galleryImage");
const galleryCaption=document.getElementById("galleryCaption");
const photoCounter=document.getElementById("photoCounter");

const dotsContainer=document.getElementById("galleryDots");

for(let i=0;i<photos.length;i++){

    const dot=document.createElement("div");

    dot.className="dot";

    dotsContainer.appendChild(dot);

}

const dots=document.querySelectorAll(".dot");

function updateGallery(){

    galleryImage.src=photos[currentPhoto];

    galleryCaption.innerText=captions[currentPhoto];

    photoCounter.innerText=`${currentPhoto+1} / ${photos.length}`;

    dots.forEach(dot=>dot.classList.remove("active"));

    dots[currentPhoto].classList.add("active");

}

document.getElementById("nextBtn").onclick = () => {

    if(currentPhoto < photos.length - 1){

        currentPhoto++;

        updateGallery();

    }else{

        document.getElementById("gallery").classList.remove("active");

        document.getElementById("final").classList.add("active");

    }

}

document.getElementById("prevBtn").onclick=()=>{

    if(currentPhoto>0){

        currentPhoto--;

        updateGallery();

    }

}

updateGallery();

const restartBtn = document.getElementById("restartBtn");

if(restartBtn){

    restartBtn.addEventListener("click",()=>{

        document.getElementById("final").classList.remove("active");

        document.getElementById("welcome").classList.add("active");

        currentPhoto = 0;

        updateGallery();

        enteredCode = "";

        updateDisplay();

    });

}