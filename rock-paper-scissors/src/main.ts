import './style.scss';
import Game from './data/types'

const game: Game = {
  tokenChoices: ["rock", "paper", "scissors", "lizard", "spock"],
  winningTokens: {
    "rock": ["scissors", "lizard"],
    "paper": ["rock", "spock"],
    "scissors": ["paper", "lizard"],
    "lizard": ["paper", "spock"],
    "spock": ["rock", "scissors"]
  },
  result: {
    draw: 'Its a draw',
    AIWins: 'The computer has beaten the human',
    PlayerWins: 'You have beaten the computer'
  }  
}

const instruction = document.querySelector<HTMLHeadingElement>("h3");
const displayResult = document.querySelector<HTMLDivElement>(".game__display--result");
const displayChoice = document.querySelector<HTMLDivElement>(".game__display--choice");
const userInputButtons = document.querySelectorAll<HTMLButtonElement>(".game__input--button");
const displayHumanScore = document.querySelector<HTMLDivElement>(".human-score");
const displayComputerScore = document.querySelector<HTMLDivElement>(".computer-score");

let AIChoice: string;
let result: string;
let humanScore: number = 0;
let computerScore: number = 0;
displayHumanScore.innerText = humanScore;
displayComputerScore.innerText = computerScore;

if (userInputButtons.length === 0) {
  throw new Error("check that nodes exist")
}

if (!displayChoice || 
  !instruction || 
  !displayResult || 
  !displayComputerScore || 
  !displayHumanScore) {
  throw new Error("check selector")
}

const getAIChoice = () => {
  const math: number = Math.floor(Math.random() * game.tokenChoices.length)
  AIChoice = game.tokenChoices[math]
  return AIChoice
}

  const handleButtonClick = (e: Event) => {
    getAIChoice()
    let userInput = (e.target as HTMLInputElement).innerText.toLowerCase();
    if (userInput) {
    userInputButtons.forEach(b => b.disabled = true);
    instruction.style.visibility = "hidden"; 
    displayChoice.innerText = `You have chosen ${userInput}. 
                              The computer player has chosen ${AIChoice}.`
    return decideWinner(userInput)
  }
}
userInputButtons.forEach(b => b.addEventListener("click", handleButtonClick));

const decideWinner = (userInput: string) => {
  const { winningTokens } = game
  if (AIChoice === userInput) {
    result = game.result.draw
  } else if (userInput === "paper" && (winningTokens["paper"].includes(AIChoice))) {
    result = game.result.PlayerWins
  } else if (userInput === "rock" && (winningTokens["rock"].includes(AIChoice))) {
    result = game.result.PlayerWins
  } else if (userInput === "scissors" && (winningTokens["scissors"].includes(AIChoice))) {
    result = game.result.PlayerWins
  } else if (userInput === "lizard" && (winningTokens["lizard"].includes(AIChoice))) {
    result = game.result.PlayerWins
  } else if (userInput === "spock" && (winningTokens["spock"].includes(AIChoice))) {
    result = game.result.PlayerWins
  } else {
    result = game.result.AIWins
  }
    return setTimeout(announceWinner, 3000, result)
  }

    const announceWinner = (result: string) => {
    setTimeout(displayResult.innerText = `${result}!!`, 2000)
    setTimeout(resetGame, 2000)
  }

  // TODO: add button option to reset
  // TODO: add confetti

  const incrementScore = () => {
      if (result === game.result.draw) {
      computerScore ++;
      humanScore ++;
      displayHumanScore.innerText = humanScore;
      displayComputerScore.innerText = computerScore;
    } else if (result === game.result.PlayerWins) {
      humanScore ++;
      displayHumanScore.innerText = humanScore;
    } else if (result === game.result.AIWins) {
      computerScore ++;
      displayComputerScore.innerText = computerScore;
    } else {
      console.log("There's been an error. ")
    }
  }

  // TODO: add input for how many games to play. Can just add up both scores and if => input, then were done. 
 // TODO: Also add, we're done final winner announcement 

  const resetGame = () => {
    incrementScore();
    AIChoice = "";
    result = "";
    instruction.style.visibility = "visible"; 
    displayChoice.innerText = "";
    displayResult.innerText = "";
    userInputButtons.forEach(b => b.disabled = false);
  }