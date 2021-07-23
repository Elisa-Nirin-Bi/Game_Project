const playerImg = new Image();
playerImg.src = './images/oldman-idle-1.png';

const gravity = 0.2;

class Player {
  constructor(game, x, y, score) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 100;
    this.score = score;
    this.speedX = 0;
    this.speedY = 0;
  }

  runLogic() {
    // this.score = 100;

    // Calculate boundaries
    const lowerBoundary =
      this.game.canvas.height - this.height - this.game.groundHeight;
    const leftBoundary = 0;
    const rightBoundary = this.game.canvas.width - 50 +26;
    const topBoundary = 100;

    const newY = this.y + this.speedY;
    const newX = this.x + this.speedX;

    // Ensure player doesn't go out of boundary
    let verticalCollision = false;
    let horizontalCollision = false;

    if (newY > lowerBoundary || newY < topBoundary) {
      verticalCollision = true;
    }

    if (newX < leftBoundary || newX > rightBoundary) {
      horizontalCollision = true;
    }

    for (const obstacle of this.game.obstacles) {
      const obstacleVerticalCollision = obstacle.checkCollision({
        x: this.x,
        y: newY,
        width: this.width,
        height: this.height
      });
      if (obstacleVerticalCollision) {
        verticalCollision = true;
      }
      const obstacleHorizontalCollision = obstacle.checkCollision({
        x: newX,
        y: this.y,
        width: this.width,
        height: this.height
      });
      if (obstacleHorizontalCollision) {
        horizontalCollision = true;
      }
    }

    if (verticalCollision) {
      this.speedY = 0;
    } else {
      this.y = newY;
      this.speedY += gravity;
     
    }

    if (horizontalCollision) {
      this.speedX = 0;
    } else {
      this.x = newX;
     
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
      this.width,
      this.height
    );
  }
}
