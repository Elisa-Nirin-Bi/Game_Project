class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.gameOver = document.getElementById('game_over_page');
    this.playGame = document.getElementById('canvas_page');
    this.winGame = document.getElementById('win_page');
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
    this.score = 50;
    this.movePlayer();
    this.player = new Player(this, 50, 100, 100);
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

  fontDefinition() {
    this.context.font = '22px sans-serif';
    this.context.fillStyle = '#FFA500';
    this.context.fillText(`${this.score}`, 670, 70);
  }

  showScore() {
    this.context.beginPath();
    this.context.beginPath();
    this.context.rect(630, 43, 100, 40);
    this.context.stroke();
    this.context.fillStyle = '#231709';
    this.context.fill();
    this.fontDefinition();
  }

  /*addObstacle() {
    const obstacleX = Math.floor(Math.random() * this.canvas.width);
    const obstacleY = 350;
    if (this.obstacles.length <= 1) {
      const obstacle = new Obstacle(this, obstacleX, obstacleY);
      this.obstacles.push(obstacle);}
      console.log(this.player.y)
    }*/

  addObstacle() {
    const obstacle = new Obstacle(this, 150, 100);
    const obstacleTwo = new Obstacle(this, 430, 100);
    this.obstacles.push(obstacle);
    this.obstacles.push(obstacleTwo);
  }

  addPeasant() {
    this.context.save();
    const peasantX = Math.random() * this.canvas.width;
    const peasantY = 150;
    const peasant = new Peasant(this, peasantX, peasantY);
    this.peasants.push(peasant);
    this.context.restore();
  }
  
  addWater() {
    this.context.save();
    const waterX = Math.random() * this.canvas.width;
    const waterY = 150;
    const water = new Water(this, waterX, waterY);
    this.waters.push(water);
    this.context.restore();
  }

  grabPeasant() {
    const player = this.player;
    this.peasants.forEach((peasant, index) => {
      if (
        /*player.x < peasant.x + peasant.width &&
        player.x + player.width > peasant.x &&*/
        player.y < peasant.y + peasant.height &&
        player.y + player.height > peasant.y
      ) {
        const audioHitPeasant = new Audio("./sound/hihat-808.wav");
        audioHitPeasant.play();
        this.peasants.splice(index, 1);
        this.score += 10;
      }
    });
  }

  grabWater() {
    const player = this.player;
    this.waters.forEach((water, index) => {
      if (
       /* player.x < water.x + water.width &&
        player.x + player.width > water.x &&*/
        player.y < water.y + water.height &&
        player.y + player.height > water.y
      ) {
        
        this.waters.splice(index, 1);
        this.score -= 10;
        console.log("go on")
      }
    });
  }
  
  hitObstacle() {
    if (
      (this.player.x > 110 && this.player.x < 120 && this.player.y === 300) ||
      (this.player.x > 370 && this.player.x < 380 && this.player.y === 300)
    ) {
      this.player.speedX -= 2;
    }
  }

  stepOnPuddle() {
    if (
      (this.player.x > 280 && this.player.x < 310 && this.player.y === 300) ||
      (this.player.x > 580 && this.player.x < 610 && this.player.y === 300)
    ) {
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
          this.player.speedX += 2;
          break;
        case 'ArrowLeft':
          this.player.speedX -= 2;
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

  resetCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runLogic() {
    this.player.runLogic();
    /*if (Math.random() < 0.01) {
      this.addObstacle();}
    
    for (const obstacle of this.obstacles) {
      this.x - this.width / 2 + 200;
      obstacle.runLogic();}*/

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
    //this.reduceSpeedBeforeObstacle();
    this.hitObstacle();
    this.grabPeasant();
    this.grabWater();
    this.removePeasants();
    this.removeWater();
 
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
    //setTimeout(this.rainPeasant(), 6000)
    this.rainPeasant();
    this.rainWater();
    this.showScore();
  }
}
