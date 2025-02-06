
const colorBox = document.getElementById("colorBox");
const colorOption = document.querySelectorAll(".colorOption");
const gameStatus = document.getElementById("gameStatus");
const scoreStatus = document.getElementById("score");
const newGameButton  = document.getElementById("newGameButton");
const gameInstructions = document.getElementById("gameInstructions");
const levelProgress = document.getElementById("levelProgress");

let score = 0;
let targetColor;
let level = 1;
let maxLevels = 5;


function randomColor() {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
}


function newGame() {
    if (level > maxLevels){
        displayEndMessage();
        return;
    }

    targetColor = randomColor(); 
    colorBox.style.backgroundColor = targetColor; 

   
    const correctIndex = Math.floor(Math.random() * 6); 
    colorOption.forEach((option, index) => {
        if (index === correctIndex) {
            option.style.backgroundColor = targetColor; 
        } else {
            option.style.backgroundColor = randomColor(); 
        }
    });

    
    gameStatus.textContent = "";
    gameInstructions.textContent = `Level ${level}: Guess the correct color!`;

    updateLevelProgress();
    enableGuess();
}


function handleGuess(e) {
    const guessedColor = e.target.style.backgroundColor;
    
    if (guessedColor === targetColor) {
        score++; 
        gameStatus.textContent = "You are a guess galaxy star!👑";
        gameStatus.style.color = "green";
    } else {
        gameStatus.textContent = "Oops! Try again😪.";
        gameStatus.style.color = "red";
    }

    scoreStatus.textContent = `Score: ${score}`; 

    level ++;
    setTimeout(newGame, 1000);
}

function enableGuess() {
    colorOption.forEach(option =>{
        option.style.pointerEvents = "auto";
        });
}

function disableGuess() {
    colorOption.forEach(option =>{
        option.style.pointerEvents = "none";
        });
}

function updateLevelProgress(){
    levelProgress.textContent = `Level: ${level - 1}/${maxLevels}`;
}

function displayEndMessage(){
    if (score === maxLevels) {
        gameStatus.textContent = "Congratulations Guess Galaxy Champion!🎉";
        gameStatus.style.color = "green";

        } else {
            gameStatus.textContent = `Game over! You reached level ${level}. Try again?😪`;
            gameStatus.style.color = "red";
        }
}


colorOption.forEach(option => {
    option.addEventListener("click", handleGuess);
});


newGameButton.addEventListener("click", () => {
    level = 1;
    score = 0;
    scoreStatus.textContent = `Score: ${score}`;
    newGame();
});

newGame();