class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.winGame = document.getElementById('win_page');
    this.startBtn = document.getElementById('start_btn2');
    this.gameOver = document.getElementById('game_over_page2');
    this.playGame = document.getElementById('canvas_page');
    this.context = canvas.getContext('2d');
    this.background = new Background(this);
    this.puddle = new Puddle(this);
    this.groundHeight = 50;
    this.started = false;
  }

  /*displayPage() {
    if (this.score <= 0) {
      this.started = false;
      this.gameOver.style.display = 'block';
      this.playGame.style.display = 'none';
    }
  }*/

  start() {
    this.started = true;
    this.score = 0;
    this.beer = 0;
    this.water = 0
    this.movePlayer();
    this.player = new Player(this, 50, 100);
    this.peasants = [];
    this.obstacles = [];
    this.stones = [];
    this.stoneRights = [];
    this.waters = [];
    this.addObstacle();
    this.reset();
    this.addPeasant();
    this.addWater();
    this.time();
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
  fireStone () {
    const stone = new Stone(this, this.player.x + 40, this.player.y + 40);
    this.stones.push(stone);

  }
  
  fireStoneRight () {
    const stoneRight = new StoneRight(this, this.player.x + 40, this.player.y + 40);
    this.stoneRights.push(stoneRight);

  }

  scoreFontDefinition() {
    this.context.font = '22px sans-serif';
    this.context.fillStyle = '#FFA500';
    this.context.fillText(`SCORE: ${this.score}`, 640, 70);
  }

  showScore() {
    this.context.beginPath();
    this.context.rect(630, 43, 130, 40);
    this.context.stroke();
    this.context.fillStyle = '#231709';
    this.context.fill();
    this.scoreFontDefinition();
  }
  
  reset() {
    this.startDate=Date.now();
  
  }
  time() {
    let seconds=Math.floor((Date.now()- this.startDate)/1000);
    let minutes=Math.floor(seconds/60);
    seconds%=60;
   
     this.context.strokeText(minutes.toString().padStart(2,"0")+":"+seconds.toString().padStart(2,"0"),10,20);
 
  if(minutes === 1){
    this.started = false;
    this.playGame.style.display = 'none';
    this.gameOver.style.display = 'block';
  }
  }


  addObstacle() {
    const obstacle = new Obstacle(this, 150, 350);
    const obstacleFour = new Obstacle(this, 200, 350);
    const obstacleTwo = new Obstacle(this, 380, 350);
    const obstacleThree = new Obstacle(this, 600, 350);
    this.obstacles.push(obstacle);
    this.obstacles.push(obstacleTwo);
    this.obstacles.push(obstacleThree);
    this.obstacles.push(obstacleFour);
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
          case 'ArrowUp':
          this.fireStone();
          break;
          case 'ArrowDown':
          this.fireStoneRight();
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

  checkCollisionBetweenStonesAndPeasants () {
    this.stones.forEach((stone, stoneIndex) => {
      this.peasants.forEach((peasant, peasantIndex) => {
        if (
          stone.x < peasant.x + peasant.width &&
          stone.x + stone.width > peasant.x &&
          stone.y < peasant.y + peasant.height &&
          stone.y + stone.height >peasant.y
        ) {
          this.peasants.splice(peasantIndex, 1);
          this.stones.splice(stoneIndex, 1);
          this.score += 5;
          const audioHitPeasant = new Audio("./sound/hihat-808.wav");
          audioHitPeasant.play();
        }
      });
    });
  }
  
  checkCollisionBetweenStoneRightsAndPeasants () {
    this.stoneRights.forEach((stoneRight, stoneRightIndex) => {
      this.peasants.forEach((peasant, peasantIndex) => {
        if (
          stoneRight.x < peasant.x + peasant.width &&
          stoneRight.x + stoneRight.width > peasant.x &&
          stoneRight.y < peasant.y + peasant.height &&
          stoneRight.y + stoneRight.height >peasant.y
        ) {
          this.peasants.splice(peasantIndex, 1);
          this.stoneRights.splice(stoneRightIndex, 1);
          this.score += 5;
          const audioHitPeasant = new Audio("./sound/hihat-808.wav");
          audioHitPeasant.play();
        }
      });
    });
  }
  
  checkCollisionBetweenStonesAndWaters () {
    this.stones.forEach((stone, stoneIndex) => {
      this.waters.forEach((water, waterIndex) => {
        if (
          stone.x < water.x + water.width &&
          stone.x + stone.width > water.x &&
          stone.y < water.y + water.height &&
          stone.y + stone.height >water.y
        ) {
          this.waters.splice(waterIndex, 1);
          this.stones.splice(stoneIndex, 1);
          this.score += 5;
          const audioHitWater = new Audio("./sound/hihat-808.wav");
          audioHitWater .play();
        }
      });
    });
  }
  
  checkCollisionBetweenStoneRightsAndWaters () {
    this.stoneRights.forEach((stoneRight, stoneRightIndex) => {
      this.waters.forEach((water, peasantIndex) => {
        if (
          stoneRight.x < water.x + water.width &&
          stoneRight.x + stoneRight.width > water.x &&
          stoneRight.y < water.y + water.height &&
          stoneRight.y + stoneRight.height >water.y
        ) {
          this.peasants.splice(peasantIndex, 1);
          this.stoneRights.splice(stoneRightIndex, 1);
          this.score += 5;
          const audioHitWater = new Audio("./sound/hihat-808.wav");
          audioHitWater .play();
        }
      });
    });
  }
  removePeasants() {
    this.peasants.forEach((peasant, index) => {
      if (peasant.x < 0) {
        this.peasants.splice(index, 1);
      }
    });
    this.stones.forEach((stone, index) => {
      if (stone.x > this.canvas.width) {
        this.stones.splice(index, 1);
      }
    });
    this.stoneRights.forEach((stoneRight, index) => {
      if (stoneRight.x > this.canvas.width) {
        this.stoneRights.splice(index, 1);
      }
    });
  }
    
  
  removeWater() {
    this.waters.forEach((water, index) => {
      if (water.x < 0) {
        this.waters.splice(index, 1);
      }
    });
    this.stones.forEach((stone, index) => {
      if (stone.x > this.canvas.width) {
        this.stones.splice(index, 1);
      }
    });
    this.stoneRights.forEach((stoneRight, index) => {
      if (stoneRight.x > this.canvas.width) {
        this.stoneRights.splice(index, 1);
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

    if (Math.random() < 0.02) {
      this.addPeasant();
    }

    if (Math.random() < 0.02) {
      this.addWater();
    }
    for (const peasant of this.peasants) {
      peasant.runLogic();
    }
    for (const water of this.waters) {
      water.runLogic();
    }
    for (const stone of this.stones) {
      stone.runLogic();
    }
    for (const stoneRight of this.stoneRights) {
      stoneRight.runLogic();
    }
    this.checkCollisionBetweenStoneRightsAndWaters()
    this.checkCollisionBetweenStonesAndWaters();
    this.checkCollisionBetweenStonesAndPeasants();
    this.checkCollisionBetweenStoneRightsAndPeasants();
    this.stepOnPuddle();
    this.removePeasants();
    this.removeWater();
    this.time();
    this.win();
    //this.displayPage();
  }

  paint() {
    this.time();
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
    this.time();
    for (const stone of this.stones) {
      stone.paint();
    }
    for (const stoneRight of this.stoneRights) {
      stoneRight.paint();
    }
  }
}
