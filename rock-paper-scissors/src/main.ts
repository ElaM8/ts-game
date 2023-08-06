import './style.css';
import Game from './data/types'

const game: Game = {
  tokenChoices: ["rock", "paper", "scissors"],
  winningTokens: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  }
}

const userInputButtons = document.querySelectorAll<HTMLButtonElement>(".game__input--button");

if (userInputButtons.length === 0) {
  throw new Error("check that nodes exist")
}

const getAIChoice = () => {
  const math: number = Math.floor(Math.random() * game.tokenChoices.length)
  const AIChoice = game.tokenChoices[math]
  console.log(AIChoice)
  return AIChoice
}

getAIChoice()

const handleButtonClick = (e: Event) => {
  let userInput = (e.target as HTMLInputElement).innerText;
  if (userInput) {
  userInputButtons.forEach(b => b.disabled = true);
}
}

userInputButtons.forEach(b => b.addEventListener("click", handleButtonClick));

