const canvasElement = document.querySelector('canvas');

// const context = canvasElement.getContext('2d');

const game = new Game(canvasElement);
const startGame2 = document.getElementById('intro_page2');
const playGame = document.getElementById('canvas_page');
const gameOverGame = document.getElementById('game_over_page2');
const winGame = document.getElementById('win_page');

const startBtn2 = document.getElementById('start_btn2');
startBtn2.addEventListener('click', () => {
  startGame2.style.display = "none";
  playGame.style.display = "block";
  game.start();
});


const playAgainBtn = document.getElementById('game_over_button');
playAgainBtn.addEventListener('click', () => {
  playGame.style.display = "block";
  gameOverGame.style.display = "none";
  game.start();
});

const winBtn = document.getElementById('win_button');
winBtn.addEventListener('click', () => {
  playGame.style.display = "block";
  winGame.style.display = "none";
  game.start();
});
