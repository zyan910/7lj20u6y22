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

numberButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(enteredCode.length >= 4) return;

        enteredCode += button.innerText;

        updateDisplay();

        if(enteredCode.length === 4){

            checkCode();

        }

    });

});

// --------------------
// DELETE
// --------------------

deleteButton.addEventListener("click",()=>{

    enteredCode = enteredCode.slice(0,-1);

    updateDisplay();

});

// --------------------
// CHECK CODE
// --------------------

function checkCode(){

    if(enteredCode === CORRECT_CODE){

        setTimeout(()=>{

            alert("Correct! 🎉\n\nNext milestone: Puzzle Page");

        },300);

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