class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.background = new Background(this);
    this.puddle = new Puddle(this);
    this.groundHeight = 50;
  }

  start() {
    this.score = 100;
    this.movePlayer();
    this.player = new Player(this, 50, 100, 100);
    this.peasants = [];
    this.obstacles = [];
    this.addObstacle();
    this.addPeasant();
    this.paint();
    this.loop();
  }
  rainPeasant(){
  for (const peasant of this.peasants) {
   peasant.paint();
  }}
   
  fontDefinition() {
    this.context.font = '22px sans-serif';
    this.context.fillStyle = '#ADD8E6';
    this.context.fillText(`${this.score}`, 710, 70);
  }

  showScore() {
    this.context.beginPath();
    this.context.arc(730, 63, 25, 0, 2 * Math.PI);
    this.context.fillStyle = '#231709';
    this.context.fill();
    this.fontDefinition();
  }

  addObstacle() {
    const obstacleX = Math.floor(Math.random() * this.canvas.width);
    const obstacleY = 350;
    if (obstacleX && this.obstacles.length <= 1) {
      const obstacle = new Obstacle(this, obstacleX, obstacleY);
      this.obstacles.push(obstacle);}
      console.log(this.obstacles.length)
    }
     
  addPeasant() {
    this.context.save();
    const peasantX = Math.random() * this.canvas.width;
    const peasantY = 150;
    const peasant = new Peasant(this, peasantX, peasantY);
    this.peasants.push(peasant);
    this.context.restore();
  }
  grabPeasant () {
    const player = this.player;
    this.peasants.forEach((peasant, index) => {
      if (
          player.x < peasant.x + peasant.width &&
          player.x + player.width > peasant.x &&
          player.y < peasant.y + peasant.height &&
          player.y + player.height > peasant.y
       
      ) {
        /*const audioHitPeasant = new Audio("./sound/hihat-808.wav");
        audioHitPeasant.play();*/
        this.peasants.splice(index, 1);
        this.score -= 10;
        
      }
    });
  }
  
  hitObstacle () {
    const player = this.player;
    const obstacle = this.obstacle;
    for (const obstacle of this.obstacles)  {
      if (
          player.x < obstacle.x + obstacle.width  &&
          player.x + player.width > obstacle.x  &&
          player.y < obstacle.y + obstacle.height  &&
          player.y + player.height  > obstacle.y
      ) {
        /*const audioHitObstacle = new Audio("./sound/clap-fat.wav");
        audioHitObstacle.play();*/
        this.score -= 10;
        console.log("hit")
      }
    }
  }
  reduceSpeedBeforeObstacle(){
     if(this.player.x < this.obstacleBoundary) {
       this.player.speedX = 0;
       console.log("stop")
     }
    }
  
  reduceSpeedOnPuddle(){
      const puddleBoundary = 800 - this.puddle.width;
       if(this.player.x < this.puddleBoundary){
        this.player.speedX = 0;
        console.log("stopPuddle")
       }
     } 
  
  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.paint();
      this.loop();
    });
  }

  movePlayer() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
          this.player.speedX += 3;
          break;
        case 'ArrowLeft':
          this.player.speedX -= 3;
          break;
        case 'Space':
          this.player.jump();
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
  
  resetCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runLogic() {
    this.player.runLogic();
    this.hitObstacle();
    if (Math.random() < 0.01) {
      this.addObstacle();}
    
    for (const obstacle of this.obstacles) {
      this.x - this.width / 2 + 200;
      obstacle.runLogic();
    
    if (Math.random() < 0.03) {
      this.addPeasant();
    }

    for (const peasant of this.peasants) {
      peasant.runLogic();
    }
   
    this.reduceSpeedBeforeObstacle();
    this.reduceSpeedOnPuddle();
    this.grabPeasant();  
    this.removePeasants();
  }}

  paint() {
    this.resetCanvas();
    this.background.paint();
    this.puddle.paint();
    this.player.paint();

    for (const obstacle of this.obstacles) {
      obstacle.paint();
    }
 
    /*for (const peasant of this.peasants) {
      peasant.paint();
    }*/
    setTimeout(this.rainPeasant(), 6000)
    
    this.showScore();
  }
}

