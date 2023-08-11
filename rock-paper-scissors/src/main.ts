import './style.scss';
import Game from './data/types'

const game: Game = {
  tokenChoices: ["rock", "paper", "scissors", "lizard", "spock"],
  winningTokens: {
    rock: ["scissors", "lizard"],
    paper : ["rock", "spock"],
    scissors : ["paper", "lizard"],
    lizard : ["paper", "spock"],
    spock : ["rock", "scissors"]
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
let winner: string;
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
  const { tokenChoices } = game;
  const math: number = Math.floor(Math.random() * tokenChoices.length);
  AIChoice = tokenChoices[math];
  return AIChoice
}

  const handleButtonClick = (e: Event) => {
    getAIChoice()
    let userInput = (e.target as HTMLInputElement).innerText.toLowerCase();
    userInputButtons.forEach(b => b.disabled = true);
    instruction.style.visibility = "hidden"; 
    displayChoice.innerText = ` You have chosen ${userInput}. 
                                The computer player has chosen ${AIChoice}.
                              `
    return decideWinner(userInput)
}
userInputButtons.forEach(b => b.addEventListener("click", handleButtonClick));

const decideWinner = (userInput: string) => {
  const { tokenChoices, winningTokens, result: { draw, PlayerWins, AIWins } } = game
  if (AIChoice === userInput) {
    winner = draw
  } else if (userInput === tokenChoices[0] && AIChoice === "scissors") {
    winner = "As it always has, rock crushes scissors"
  } else if (userInput === tokenChoices[0] && (winningTokens[userInput].includes(AIChoice))) {
    winner = PlayerWins
  } else if (userInput === tokenChoices[1] && (winningTokens[userInput].includes(AIChoice))) {
    winner = PlayerWins
  } else if (userInput === tokenChoices[2] && (winningTokens[userInput].includes(AIChoice))) {
    winner = PlayerWins
  } else if (userInput === tokenChoices[3] && (winningTokens[userInput].includes(AIChoice))) {
    winner = PlayerWins
  } else if (userInput === tokenChoices[4] && (winningTokens[userInput].includes(AIChoice))) {
    winner = PlayerWins
  } else {
    winner = AIWins
  }
    return setTimeout(announceWinner, 3000, winner)
  }

    const announceWinner = (winner: string) => {
    setTimeout(displayResult.innerText = `${winner}!!`, 2000)
    setTimeout(resetGame, 2000)
  }

  const incrementScore = () => {
      const { draw, PlayerWins, AIWins } = game.result
    if (winner === draw) {
      computerScore ++;
      humanScore ++;
      displayHumanScore.innerText = humanScore;
      displayComputerScore.innerText = computerScore;
    } else if (winner === "As it always has, rock crushes scissors"){
      humanScore += 100;
      displayHumanScore.innerText = humanScore;
    } else if (winner === PlayerWins) {
      humanScore ++;
      displayHumanScore.innerText = humanScore;
    } else if (winner === AIWins) {
      computerScore ++;
      displayComputerScore.innerText = computerScore;
    } else {
      console.log("There's been an error. ")
    }
  }

  const resetGame = () => {
    incrementScore();
    AIChoice = "";
    winner = "";
    instruction.style.visibility = "visible"; 
    displayChoice.innerText = "";
    displayResult.innerText = "";
    userInputButtons.forEach(b => b.disabled = false);
  }