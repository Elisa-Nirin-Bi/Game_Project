const hatManImg = new Image();
hatManImg.src ="./images/hat-man-idle-1.png"


class Water {
   constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = hatManImg;
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
