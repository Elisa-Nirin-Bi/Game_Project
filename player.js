const playerImg = new Image();
playerImg.src = './images/oldman-idle-1.png';

const gravity = 0.2;

class Player {
  constructor(game, x, y, score) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 100;
    this.score = score;
    this.speedX = 0;
    this.speedY = 0;
  
  }
  
 runLogic() {
    this.score = 100;
     // Calculate boundaries
    const lowerBoundary =
    this.game.canvas.height - this.height - this.game.groundHeight;
    const leftBoundary = 0;
    const rightBoundary = this.game.canvas.width - 50;
    const topBoundary = 100;
    

    // Moving the player vertically
    this.speedY += gravity;
    this.y += this.speedY;

    // Ensure player doesn't go out of boundary
    if (this.y > lowerBoundary) {
      this.y = lowerBoundary;
      this.speedY = 0;
    }
    
    if (this.y < topBoundary) {
      this.y = topBoundary;
      this.speedY = 0;
    }
    
    // Moving the player horizontally
    this.x += this.speedX;
    
    // Ensure player doesn't go out of boundary
    if (this.x < leftBoundary) {
      this.x = leftBoundary;
      this.speedX = 0;
    }

    if (this.x > rightBoundary) {
      this.x = rightBoundary;
      this.speedX = 0;
    }

  }

  jump() {
    this.speedY -= 10;
    console.log(this.speedY);
  }
 
  paint() {
    const context = this.game.context;
    context.drawImage(
      playerImg,
      this.x,
      this.y,
      50,
      this.height
    );
  }
}
