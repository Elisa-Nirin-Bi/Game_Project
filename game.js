class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.background = new Background(this);
  }
  start () {
    this.movePlayer();
    this.player = new Player(this, 100, 100);
    this.peasants = []; 
    this.obstacles = [];
    this.addObstacle();
    this.addPeasant(); 
    this.paint();
    this.loop();
  }
  
  addObstacle() {
    const obstacleX = Math.random() * this.canvas.width ;
    const obstacleY = 350;
    if(obstacleX  && this.obstacles.length <= 3){
    const obstacle = new Obstacle(this, obstacleX , obstacleY);
    this.obstacles.push(obstacle) ;}
     }
    
  addPeasant() {
    this.context.save()
    const peasantX = Math.random() * this.canvas.width;
    const peasantY = 150;
    const peasant = new Peasant(this, peasantX, peasantY);
    this.peasants.push(peasant);
    this.context.restore()
    }
    
     loop () {
    window.requestAnimationFrame(()=>{
     this.runLogic();
     this.paint();
     this.loop();
    }     
  )
  }
  
 movePlayer ()  { window.addEventListener('keydown', (event) => {
  const key = event.code;
  switch (key) {
    case 'ArrowUp':
     this.player.y -= 10;
      console.log("ciao")
      break;
    case 'ArrowDown':
      this.player.y += 10;
      break;
    case 'ArrowLeft':
      this.player.x -= 10;
      break;
    case 'ArrowRight':
      this.player.x += 10;
      break;
  }
  this.context.clearRect(0, 0,  800,500);
})
  }
   
  resetCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
   
runLogic(){
    this.player.runLogic();
    if (Math.random() < 0.02) {
      this.addObstacle();
    }
    
    for (const obstacle of this.obstacles) {
      this.x - this.width / 2 + 200
      obstacle.runLogic();
      }
   
    if (Math.random() < 0.04) {
      
   this.addPeasant();
    }
   
    for (const peasant of this.peasants) {
      peasant .runLogic();
    }
}
  
  paint () {
    this.resetCanvas();
    this.background.paint();
    this.player.paint();

     for (const obstacle of this.obstacles) {
      obstacle.paint();
    }
    this.player.paint();
    for (const peasant of this.peasants) { 
      peasant.paint();
    }
  }}