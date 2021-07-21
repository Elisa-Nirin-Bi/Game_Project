const waterImg = new Image();
waterImg.src ="./images/water.png"


class Water {
   constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.img = waterImg;
  }

  runLogic () {
    this.y++;
   
  }
  paint () {
     const context = this.game.context;
     context.save();
     context.drawImage(this.img, 
      this.x,
      this.y,
      this.width,
      this.height, );
      context.restore()
  }
  
}
