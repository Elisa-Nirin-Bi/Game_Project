
class Obstacle {
  constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

 runLogic(){
 }

  paint () {
    const context = this.game.context;
    
    const obstacleImg = new Image();
    obstacleImg.src = './images/box.png';
    context.drawImage(obstacleImg, 
      this.x - this.width / 2 + 100,
      350,
      this.width,
      this.height);   
    }
    
    }