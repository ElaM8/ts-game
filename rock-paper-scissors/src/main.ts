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

const getAIChoice = () => {
  const math: number = Math.floor(Math.random() * game.tokenChoices.length)
  const AIChoice = game.tokenChoices[math]
  return AIChoice
}