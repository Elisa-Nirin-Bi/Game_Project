
class Obstacle {
  constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

 runLogic(){
   
  const obstacleBoundary = 800 - this.x + this.width;
 }

  paint () {
    const context = this.game.context;  
    const obstacleImg = new Image();
    obstacleImg.src = './images/box.png';
    context.drawImage(obstacleImg, 
      this.x - this.width / 2,
      350,
      this.width,
      this.height);   
    }
    
    }