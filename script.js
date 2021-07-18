const canvasElement = document.querySelector('canvas');

 const context = canvasElement.getContext('2d');

const game = new Game(canvasElement);
const intro = document.getElementById('intro_page');
const canvasPage = document.getElementById('canvas_page');



const startBtn = document.getElementById('start_button');
startBtn.addEventListener('click', () => {
  intro.style.display = "none";
  canvasPage.style.display = "block";
  game.start();
});


  /*if(this.game.player.score === 0)  {
    const gameOver = document.getElementById('game_over_page');
    canvasPage.style.display = "none";
    gameOver.style.display = "block";
    console.log("end")
  }*/
