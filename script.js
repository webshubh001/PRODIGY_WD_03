let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const messageElement = document.getElementById("message");
const boardElement = document.getElementById("board");

function makeMove(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      messageElement.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every((cell) => cell !== "")) {
      messageElement.textContent = "It's a tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
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

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  messageElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value;
    cell.addEventListener("click", () => makeMove(index));
    boardElement.appendChild(cell);
  });
}
