class Obstacle {
  constructor(game, x, y, obstacleBoundary) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.obstacleBoundary = this.x - 50;
  }
  
  checkCollision (element) {
    return  (
      this.x < element.x + element.width -18 &&
      this.x + this.width -18 > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
    );
   
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    const obstacleImg = new Image();
    obstacleImg.src = './images/box.png';
    context.drawImage(
      obstacleImg,
      // this.x - this.width / 2,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
