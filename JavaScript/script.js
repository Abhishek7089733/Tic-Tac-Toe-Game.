const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const newGameButton = document.getElementById('newGame');
const startGameButton = document.getElementById('startGame');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const gameContainer = document.querySelector('.game-container');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');

let playerXName = 'Player X';
let playerOName = 'Player O';
let currentPlayer = 'X';
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let score = { X: 0, O: 0 };

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
    statusText.textContent = `${winnerName} wins!`;
    score[currentPlayer]++;
    updateScoreboard();
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const currentPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
  statusText.textContent = `${currentPlayerName}'s turn`;
}

function resetBoard() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${playerXName}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

function newGame() {
  resetBoard();
  score = { X: 0, O: 0 };
  updateScoreboard();
}

function updateScoreboard() {
  scoreXText.textContent = `${playerXName}: ${score.X}`;
  scoreOText.textContent = `${playerOName}: ${score.O}`;
}

function startGame() {
  playerXName = playerXInput.value || 'Player X';
  playerOName = playerOInput.value || 'Player O';
  document.querySelector('.player-inputs').style.display = 'none';
  gameContainer.style.display = 'flex';
  updateScoreboard();
  resetBoard();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);
newGameButton.addEventListener('click', newGame);
startGameButton.addEventListener('click', startGame);
