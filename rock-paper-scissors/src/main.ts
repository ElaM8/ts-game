import './style.scss';
import Game from './data/types'



//setup game/game board logic
const game: Game = {
  tokenChoices: ["rock", "paper", "scissors"],
  winningTokens: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  },
  result: { // can I not use expressions in an object?
    draw: 'Its a draw!',
    AIWins: 'The computer has beaten the player',
    PlayerWins: 'The player has beaten the computer'
  }  
}

const instruction = document.querySelector<HTMLHeadingElement>("h3");
const displayResult = document.querySelector<HTMLDivElement>(".game__display--result");
const displayChoice = document.querySelector<HTMLDivElement>(".game__display--choice");
const userInputButtons = document.querySelectorAll<HTMLButtonElement>(".game__input--button");
let AIChoice: string;
let result: string;


if (userInputButtons.length === 0) {
  throw new Error("check that nodes exist")
}

if (!displayChoice || !instruction || !displayResult) {
  throw new Error("check selector")
}

// get computer playing token [rock, paper, or scissors]
const getAIChoice = () => {
  const math: number = Math.floor(Math.random() * game.tokenChoices.length)
  AIChoice = game.tokenChoices[math]
  console.log(AIChoice)
  return AIChoice
}
getAIChoice()

// get human player token choice, by button input
  const handleButtonClick = (e: Event) => {
    let userInput = (e.target as HTMLInputElement).innerText.toLowerCase();
    if (userInput) {
    userInputButtons.forEach(b => b.disabled = true);
    instruction.style.display = "none"; 
    displayChoice.innerText = `You have chosen ${userInput}. 
                              The computer player has chosen ${AIChoice}.`
    return decideWinner(userInput)
  }
}
userInputButtons.forEach(b => b.addEventListener("click", handleButtonClick));

  const announceWinner = () => {
    displayResult.innerText = `${result}!!`
  }

// get win decision using computer token and player's token and evaluating for winning token
const decideWinner = (userInput: string) => {
  // const { winningTokens } = game
  if (AIChoice === userInput) {
    setTimeout(announceWinner, 3000)
    result = game.result.draw
  } else if (userInput === 'paper' && AIChoice === 'rock' ||
      userInput === 'scissors' && AIChoice === 'paper' ||
      userInput === 'rock' && AIChoice === 'scissors') {
    setTimeout(announceWinner, 3000)
    result = game.result.PlayerWins
    } else {
    setTimeout(announceWinner, 3000)
    result = game.result.AIWins
    }
    return result
  }



  


// Why dono variants of this work? I'm comparing a string in an object to a string or other non {} - does that present an issue?? Doesnt work if i'm comparing properties either, sooooooo....
  // userInput == winningTokens.paper && AIChoice == 'rock' ||
  //   userInput == winningTokens.scissors && AIChoice == 'paper' ||
  //   userInput == winningTokens.rock && AIChoice == 'scissors' 