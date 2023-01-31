let board = document.querySelector("#board");
let count = 0;
const drawBoard = () => {
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    board.innerHTML += `<div class='box' id='box${i}' onclick="setNumber(${i})"></div>`;
  }
};
let gameBoard = [...Array(5)].map((e) => Array(5).fill(0));
const start = document.querySelector("#start");
let game = false;
let endGame = false;
const setNumber = (value) => {
  if (!game && !endGame) {
    let x = "box" + value;
    if (!document.getElementById(x).innerHTML) {
      count++;
      document.getElementById(x).innerHTML = count;
    }
    if (count == 25) {
      start.className = "start";
    }
  } else if (!endGame) {
    let x = "box" + value;
    let row = parseInt(parseInt(value) / 5);
    let col = parseInt(parseInt(value) % 5);
    if (gameBoard[row][col] !== 1) {
      gameBoard[row][col] = 1;
      document.getElementById(x).className = "box active";
    }
    updateScore();
  }
};
drawBoard();

const startGame = () => {
  if (!game && !endGame) {
    game = true;
    start.className = "hide";
  } else if (endGame) {
    window.location.reload();
  }
};

const setValue = (value) => {
  if (game) {
    let x = "b" + value;
    document.getElementById(x).classList.toggle("active1");
  }
};

const updateScore = () => {
  let lines = 0;
  // For Vertical and horizontal line count
  for (let i = 0; i < 5; i++) {
    let inLine1 = 0;
    let inLine2 = 0;
    for (let j = 0; j < 5; j++) {
      if (gameBoard[i][j] === 1) {
        inLine1++;
      }
      if (gameBoard[j][i] === 1) {
        inLine2++;
      }
    }
    if (inLine1 === 5) {
      lines++;
    }
    if (inLine2 === 5) {
      lines++;
    }
  }
  let inLine1 = 0;
  let inLine2 = 0;
  for (let i = 0; i < 5; i++) {
    if (gameBoard[i][i] === 1) {
      inLine1++;
    }
    if (gameBoard[i][4 - i] === 1) {
      inLine2++;
    }
  }
  if (inLine1 === 5) {
    lines++;
  }
  if (inLine2 == 5) {
    lines++;
  }
  activeBingo(lines);
};

const activeBingo = (lines) => {
  if (lines >= 5) {
    lines = 5;
    alert("BINGO !!");
    start.className = "start";
    start.innerHTML = "Reset";
    endGame = true;
  }
  for (let i = 1; i < 6; i++) {
    if (lines >= i) {
      let x = "b" + i;
      document.getElementById(x).className = "box1 active1";
    }
  }
};
