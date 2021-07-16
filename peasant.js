const peasantImg = new Image();
peasantImg.src ="./images/oldman-idle-1.png"

const peasantHatManImg = new Image();
peasantHatManImg.src ="./images/hat-man-idle-1.png";

const peasantBeardedImg = new Image();
peasantBeardedImg.src ="./images/bearded-idle-1.png"

class Peasant {
   constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = [peasantImg, peasantHatManImg, peasantBeardedImg][Math.floor(Math.random()*3)];
  }

  runLogic () {
    this.y++;
   
  }
  paint () {
     const context = this.game.context;
     context.save();
     context.drawImage(this.img, 
      this.x - this.width / 2 + 100,
      this.y - this.height / 2,
      this.width,
      this.height, );
      context.restore()
  }
  
}
