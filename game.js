class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  start () {
    
    this.movePlayer();
    this.player = new Player(this, 100, 100);
    this.background = new Background(this, 0, 0) 
  
    this.peasants = []; 
    this.obstacles = [];
    this.addPeasant();
    this.paint();
    this.loop();

  }
   
  addObstacle() {
    const obstacleX = Math.random() * this.canvas.width ;
    const obstacleY = 350;
    if(obstacleX < 150 && this.obstacles.length < 2){
    const obstacle = new Obstacle(this, obstacleX , obstacleY);
    this.obstacles.push(obstacle) ;}
    }
  
  addPeasant() {
    const peasantX = Math.random() * this.canvas.width;
    const peasantY = Math.random() * this.canvas.height;
    if(peasantX < 180 && this.obstacles.length > 2){
    const peasant = new Peasant(this, peasantX, peasantY);
    this.peasants.push(peasant) ;}
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
runLogic(){
    this.player.runLogic();
    if (Math.random() < 0.01) {
      this.addObstacle();
    }
    for (const obstacle of this.obstacles) {
      this.x - this.width / 2 + 200
      obstacle.runLogic();
      }
    
   //this.background.runLogic();
    if (Math.random() < 0.01) {
      this.addPeasant();
    }
   
    for (const peasant of this.peasants) {
      peasant .runLogic();
    }
}
  
  paint () {

    this.player.paint();
    for (const obstacle of this.obstacles) {
      obstacle.paint();
    }
   
    for (const peasant of this.peasants) {
      peasant.paint();
    }
  }}

