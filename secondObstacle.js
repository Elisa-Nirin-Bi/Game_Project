class secondObstacle {
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
    
    const secondObstacleImg = new Image();
    secondObstacleImg.src = './images/obstacle2.png';
    context.drawImage(secondObstacleImg, 
      this.x - this.width / 2 + 100,
      350,
      this.width,
      this.height);   
    }
    
    }