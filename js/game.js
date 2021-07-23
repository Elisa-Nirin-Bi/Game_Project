class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.playGame = document.getElementById('canvas_page');
    this.gameOver = document.getElementById('game_over_page');
    this.winGame = document.getElementById('win_game');
    this.context = canvas.getContext('2d');
    this.background = new Background(this);
    this.puddle = new Puddle(this);
    this.groundHeight = 50;
    this.started = false;
  }

  displayPage() {
    if (this.score <= 0) {
      this.started = false;
      this.gameOver.style.display = 'block';
      this.playGame.style.display = 'none';
    }
  }

  start() {
    this.started = true;
    this.score = 100;
    this.beer = 0;
    this.water = 0
    this.movePlayer();
    this.player = new Player(this, 50, 100);
    this.peasants = [];
    this.obstacles = [];
    this.waters = [];
    this.addObstacle();
    this.addPeasant();
    this.addWater();
    this.paint();
    this.loop();
  }

  rainPeasant() {
    for (const peasant of this.peasants) {
      peasant.paint();
    }
  }
  rainWater() {
    for (const water of this.waters) {
      water.paint();
    }
  }

  scoreFontDefinition() {
    this.context.font = '22px sans-serif';
    this.context.fillStyle = '#FFA500';
    this.context.fillText(`${this.score}`, 670, 70);
  }
  drinksFontDefinition() {
    this.context.font = '15px sans-serif';
    this.context.fillStyle = '#FFA500';
    this.context.fillText(`BEERS: ${this.beer}` , 640,110);
    this.context.fillText(`WATERS: ${this.water}`, 640,130);
  }
  showScore() {
    this.context.beginPath();
    this.context.rect(630, 43, 100, 40);
    this.context.stroke();
    this.context.fillStyle = '#231709';
    this.context.fill();
    this.scoreFontDefinition();
  }
  
  showDrunkDrinks() {
    this.context.beginPath();
    this.context.rect(630, 93, 100, 40);
    this.context.stroke();
    this.context.fillStyle = '#231709';
    this.context.fill();
    this.drinksFontDefinition();
  }

  addObstacle() {
    const obstacle = new Obstacle(this, 150, 350);
    const obstacleTwo = new Obstacle(this, 380, 350);
    const obstacleThree = new Obstacle(this, 600, 350);
    this.obstacles.push(obstacle);
    this.obstacles.push(obstacleTwo);
    this.obstacles.push(obstacleThree);
  }

  addPeasant() {
  
   const minimumXForPeasant = 100;
    const maximumXForPeasant = this.canvas.width;
    const peasantX =
      Math.random() * (maximumXForPeasant - minimumXForPeasant) +
      minimumXForPeasant;

    const peasantY = 0;
    const peasant = new Peasant(this, peasantX, peasantY);

    if (this.peasants.length <= 2) {
      this.peasants.push(peasant);
    }
  }

  addWater() {
    this.context.save();
    const waterX = Math.random() * this.canvas.width;
    const waterY = 150;
    const water = new Water(this, waterX, waterY);
    this.waters.push(water);
    this.context.restore();
  }

  stepOnPuddle() {
    if (this.player.x > 250 && this.player.x < 280 && this.player.y > 298 || 
      this.player.x > 530 && this.player.x < 560 && this.player.y  > 298)
     {
      const audioPuddle = new Audio("./sound/retro.wav");
      audioPuddle.play();
      this.started = false;
      this.gameOver.style.display = 'block';
      this.playGame.style.display = 'none';
    }
  }
  grabPeasant() {
    const player = this.player;
    this.peasants.forEach((peasant, index) => {
      if (
        player.x + player.width - 28> peasant.x &&
        player.x < peasant.x + peasant.width - 20 &&
        player.y + player.height - 18 > peasant.y &&
        player.y < peasant.y + peasant.height -18
      ) {
        const audioHitPeasant = new Audio("./sound/hihat-808.wav");
        audioHitPeasant.play();
        this.peasants.splice(index, 1);
        this.score += 10;
        this.beer +=1
      }
    
  })}

  grabWater() {
    const player = this.player;
    this.waters.forEach((water, index) => {
      if (
        player.x < water.x + water.width &&
        player.x + player.width > water.x &&
        player.y < water.y + water.height &&
        player.y + player.height > water.y
      ) {
        this.waters.splice(index, 1);
        this.score -= 10;
        this.water +=1
      }
    });
  }

  loop() {
    this.runLogic();
    this.paint();
    if (this.started) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  movePlayer() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
          this.player.speedX += 5;
          break;
        case 'ArrowLeft':
          this.player.speedX -= 5;
          break;
        case 'Space':
          this.player.jump();
      }
      this.context.clearRect(0, 0, 800, 500);
    });

    window.addEventListener('keyup', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
          this.player.speedX = 0;
          break;
        case 'ArrowLeft':
          this.player.speedX = 0;
          break;
      }
      this.context.clearRect(0, 0, 800, 500);
    });
  }

  removePeasants() {
    this.peasants.forEach((peasants, i) => {
      if (peasants.y > this.canvas.height - 40) {
        this.peasants.splice(i, 1);
      }
    });
  }

  removeWater() {
    this.waters.forEach((waters, i) => {
      if (waters.y > this.canvas.height - 40) {
        this.waters.splice(i, 1);
      }
    });
  }

  win(){
    if(this.score >=150){
      const audioWin = new Audio("./sound/win.wav");
      audioWin.play();
      this.started = false;
      this.playGame.style.display = 'none';
      this.winGame.style.display = 'block';
     
    }
  }

  resetCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runLogic() {
    this.player.runLogic();

    if (Math.random() < 0.03) {
      this.addPeasant();
    }

    if (Math.random() < 0.03) {
      this.addWater();
    }
    for (const peasant of this.peasants) {
      peasant.runLogic();
    }
    for (const water of this.waters) {
      water.runLogic();
    }

    this.stepOnPuddle();
    this.grabPeasant();
    this.grabWater();
    this.removePeasants();
    this.removeWater();
    this.win();
    this.displayPage();
  }

  paint() {
    this.resetCanvas();
    this.background.paint();
    this.puddle.paint();
    this.player.paint();

    for (const obstacle of this.obstacles) {
      obstacle.paint();
    }

    for (const peasant of this.peasants) {
      peasant.paint();
    }

    for (const water of this.waters) {
      water.paint();
    }
    this.rainPeasant();
    this.rainWater();
    this.showScore();
    this.showDrunkDrinks();
  }
}
