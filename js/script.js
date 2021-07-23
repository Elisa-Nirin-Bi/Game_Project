const canvasElement = document.querySelector('canvas');


const startGame = document.getElementById('intro_page');
const playGame = document.getElementById('canvas_page');
const gameOverGame = document.getElementById('game_over_page');


const game = new Game(canvasElement);

const startBtn = document.getElementById('start_button');
startBtn.addEventListener('click', () => {
  startGame.style.display = "none";
  playGame.style.display = "block";
  game.start();
});

const playAgainBtn = document.getElementById('game_over_button');
playAgainBtn.addEventListener('click', () => {
  playGame.style.display = "block";
  gameOverGame.style.display = "none";
  game.start();
});



  /*if(this.game.player.score === 0)  {
    const gameOver = document.getElementById('game_over_page');
    canvasPage.style.display = "none";
    gameOver.style.display = "block";
    console.log("end")
  }*/
