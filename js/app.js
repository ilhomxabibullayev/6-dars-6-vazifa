const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

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

const handleCellClick = (index) => {
    if (boardState[index] !== '' || !gameActive) {
        return;
    }
    boardState[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;
    checkResult();
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `${currentPlayer} g‘olib chiqdi`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.innerText = "Durrang";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    statusDisplay.innerText = `Hozirgi o'yinchi: ${currentPlayer}`;
};

const createBoard = () => {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
};

const resetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerText = "O'yinni boshlang";
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
};

createBoard();
resetButton.addEventListener("click", resetGame);