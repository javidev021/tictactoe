const board = document.getElementById("board");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.addEventListener("click", handleClick);
    div.textContent = cell;
    board.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    alert(`Jugador ${currentPlayer} gana!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    alert("Empate!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // filas
    [0,3,6],[1,4,7],[2,5,8], // columnas
    [0,4,8],[2,4,6]          // diagonales
  ];
  return winConditions.some(condition =>
    condition.every(index => gameState[index] === currentPlayer)
  );
}

resetBtn.addEventListener("click", () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  createBoard();
});

createBoard();
