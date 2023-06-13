let choices = ["Rock", "Paper", "Scissor"];

function inputFormat(input){
    return input.charAt(0).toUpperCase()+input.slice(1, input.length).toLowerCase();
}

function getComputerChoice(){
    return choices[Math.floor(Math.random()*10)%3];
}

function playRound(playerSelection, computerSelection){
    if (playerSelection==computerSelection){
        console.log("Game ties!");
        return [0, 0];
    }
    else if ((playerSelection=="Rock")&&(computerSelection=="Scissor")||
    (playerSelection=="Scissor")&&(computerSelection=="Paper")||
    (playerSelection=="Paper")&&(computerSelection=="Rock")){
        console.log(`You win!${playerSelection} beats ${computerSelection}`);
        return [1, 0];
    }
    else{
        console.log(`You lose!${computerSelection} beats ${playerSelection}`);
        return [0, 1];
    }
}

function game(){
    let playerScore, computerScore;
    let playerScoreTotal = 0,
        computerScoreTotal = 0;
    for (let i=0; i<5; i++){
        [playerScore, computerScore] = playRound(inputFormat(prompt("Input your move")), getComputerChoice());
        playerScoreTotal += playerScore;
        computerScoreTotal += computerScore;

    }
    
    if (playerScoreTotal == computerScoreTotal){
        console.log("Game ties!");
    }
    else if(playerScoreTotal>computerScoreTotal){
        console.log("You win!");
    }
    else{
        console.log("Computer wins!");
    }
}
game();
