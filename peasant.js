const coinImg = new Image();
coinImg.src ="./images/coin.png"


class Peasant {
   constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.img = coinImg;
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
