type Game = {
  tokenChoices: string[];
  winningTokens: {
    rock: string;
    paper: string;
    scissors: string;
  };
  result: {
    draw: string;
    AIWins: string;
    PlayerWins: string;
  }
};

export default Game