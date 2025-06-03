const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let cells = [];
let currentPlayer = 'X';
let gameActive = true;

// Create a turn indicator
const turnDisplay = document.createElement('div');
turnDisplay.className = 'turn-indicator';
turnDisplay.id = 'turnDisplay';
document.querySelector('.game-container').insertBefore(turnDisplay, board);

// Winning combinations
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function initBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push('');
  }

  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = '';
  updateTurnDisplay();
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== '' || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    statusText.textContent = `🤝 It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnDisplay();
  }
}

function checkWin() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      document.querySelectorAll('.cell')[a].classList.add('winning');
      document.querySelectorAll('.cell')[b].classList.add('winning');
      document.querySelectorAll('.cell')[c].classList.add('winning');
      return true;
    }
  }
  return false;
}

function updateTurnDisplay() {
  turnDisplay.textContent = `🧑 Player ${currentPlayer}'s Turn`;
}

resetButton.addEventListener('click', initBoard);

initBoard();