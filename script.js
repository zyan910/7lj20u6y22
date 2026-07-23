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

