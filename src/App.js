import React, { useState } from 'react';
import './App.css';

function App() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [winner, setWinner] = useState('');
  const [gameHistory, setGameHistory] = useState([]);

  const moves = ['Rock', 'Paper', 'Scissors'];

  const handlePlayer1NameChange = (e) => {
    setPlayer1Name(e.target.value);
  };

  const handlePlayer2NameChange = (e) => {
    setPlayer2Name(e.target.value);
  };

  const generateRandomMove = () => {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  };

  const playRound = () => {
    const player1Move = generateRandomMove();
    const player2Move = generateRandomMove();

    const roundResult = determineRoundWinner(player1Move, player2Move);
    const newScore = { ...score };

    if (roundResult === 'Player 1') {
      newScore.player1 += 1;
    } else if (roundResult === 'Player 2') {
      newScore.player2 += 1;
    }

    setGameHistory([...gameHistory, { player1Move, player2Move, roundResult }]);
    setScore(newScore);
    setRound(round + 1);

    if (round === 6) {
      
      const overallWinner = newScore.player1 > newScore.player2 ? player1Name : player2Name;
      setWinner(overallWinner);

          }
  };

  const determineRoundWinner = (move1, move2) => {
    if (move1 === move2) {
      return 'Draw';
    }
    if ((move1 === 'Rock' && move2 === 'Scissors') || (move1 === 'Paper' && move2 === 'Rock') || (move1 === 'Scissors' && move2 === 'Paper')) {
      return 'Player 1';
    }
    return 'Player 2';
  };

  return (
    <div className="App">
      <h1>Rock Paper Scissors Game</h1>
      <div>
        <label>Player 1 Name: </label>
        <input type="text" onChange={handlePlayer1NameChange} />
      </div>
      <div>
        <label>Player 2 Name: </label>
        <input type="text" onChange={handlePlayer2NameChange} />
      </div>
      <button onClick={playRound} disabled={round > 6}>
        {round <= 6 ? `Play Round ${round}` : 'Game Over'}
      </button>
      <h2>Round: {round}</h2>
      <h2>Winner: {winner}</h2>
      <h2>Score: {score.player1} - {score.player2}</h2>
      <h2>Game History:</h2>
      <ul>
        {gameHistory.map((roundData, index) => (
          <li key={index}>
            Round {index + 1}: {roundData.player1Move} vs. {roundData.player2Move} - Winner: {roundData.roundResult}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
