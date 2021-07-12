

  const peasantImg = new Image();
  peasantImg.src ="./images/oldman-idle-1.png"


class Peasant {
  
  
  constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

  runLogic () {
    this.y++;
    
  }

  paint () {
    const context = this.game.context;
    context.save();
  
    context.drawImage(peasantImg, 
      this.x - this.width / 2 + 300,
      this.y - this.height / 2,
      this.width,
      this.height);   
     context.restore()
    

  }}
