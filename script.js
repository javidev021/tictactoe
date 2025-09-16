const cells = document.querySelectorAll(".cell");
const currentPlayerEl = document.getElementById("current-player");
const statusEl = document.getElementById("game-status");
const resetGameBtn = document.getElementById("reset-game");
const resetScoreBtn = document.getElementById("reset-score");
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");

let currentPlayer = "X";
let board = Array(9).fill("");
let scoreX = 0;
let scoreO = 0;
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = `Jugador ${currentPlayer} gana!`;
    highlightWinner();
    updateScore();
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusEl.textContent = "Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerEl.textContent = currentPlayer;
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

function highlightWinner() {
  winningCombinations.forEach((combination) => {
    if (combination.every((index) => board[index] === currentPlayer)) {
      combination.forEach((index) => {
        cells[index].classList.add("winner");
      });
    }
  });
}

function updateScore() {
  if (currentPlayer === "X") {
    scoreX++;
    scoreXEl.textContent = scoreX;
  } else {
    scoreO++;
    scoreOEl.textContent = scoreO;
  }
}

function resetGame() {
  board = Array(9).fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  currentPlayer = "X";
  currentPlayerEl.textContent = currentPlayer;
  statusEl.textContent = "";
  gameActive = true;
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  scoreXEl.textContent = scoreX;
  scoreOEl.textContent = scoreO;
  resetGame();
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
resetGameBtn.addEventListener("click", resetGame);
resetScoreBtn.addEventListener("click", resetScore);