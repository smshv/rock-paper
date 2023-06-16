let choices = ["Rock", "Paper", "Scissor"];
let lastPlayerChoice = null,
    lastComputerChoice = null;

let screenText = {
    "round-left" : 5,
    "player-score" : 0,
    "computer-score" : 0,
    "round-msg" : "",
};
const scrTextElems = document.querySelectorAll(".scr-text");

function getComputerChoice(){
    return choices[Math.floor(Math.random()*10)%3];
}

function updateScreenText(){
    scrTextElems.forEach(
      elem=>{
        elem.textContent = `${screenText[elem.classList[1]]}`;
      }  
    );
    
}

function reTransformButton(){ //remove transfrom of the last selected button
    if (lastPlayerChoice){
        lastPlayerChoice.classList.remove("selected");
        lastComputerChoice.classList.remove("selected");
    }
}

function transformButton(playerChoice, computerChoice){
}

function initalize(){
    screenText["round-left"] = 5;
    screenText["player-score"] = 0;
    screenText["computer-score"] = 0;
    screenText["round-msg"] = "No round has been played yet";
    reTransformButton();
    lastPlayerChoice = null,
    lastComputerChoice = null;
    updateScreenText();
}
function decideWinner(playerSelection, computerSelection){
    if (playerSelection==computerSelection){
        screenText["round-msg"] = "Round ties";
    }
    else if ((playerSelection=="Rock")&&(computerSelection=="Scissor")||
    (playerSelection=="Scissor")&&(computerSelection=="Paper")||
    (playerSelection=="Paper")&&(computerSelection=="Rock")){
        screenText["round-msg"] = `You win this round! ${playerSelection} beats ${computerSelection}`;
        screenText["player-score"] += 1;
    }
    else{
        screenText["round-msg"] = `You lose this round :( ${computerSelection} beats ${playerSelection}`;
        screenText["computer-score"] += 1;
    }
}
function playRound(e){
    if (!screenText["round-left"]) initalize();
    const playerSelection = e.currentTarget.id;
    const computerSelection = getComputerChoice();
    const computerButton = document.querySelector(`.computer-button > #${computerSelection}`);
    decideWinner(playerSelection, computerSelection);
    reTransformButton();
    e.currentTarget.classList.add("selected");
    computerButton.classList.add("selected");
    lastPlayerChoice = e.currentTarget;
    lastComputerChoice = computerButton;
    screenText["round-left"] -= 1;
    if (screenText["round-left"]==0){
        if (screenText["player-score"]==screenText["computer-score"])
            screenText["round-msg"] = "Game ties";
        else if(screenText["player-score"]>screenText["computer-score"])
            screenText["round-msg"] = "You win!";
        else
            screenText["round-msg"] = "You lose :(";
    }
    updateScreenText();
    e.stopPropagation();
}

initalize();

document.querySelectorAll(".player-button > button").
forEach(button=>{
    button.addEventListener("click", playRound);
});

document.querySelector(".reset-div > button").
addEventListener("click", initalize);