const beerImg = new Image();
beerImg.src ="./images/beer.png"


class Peasant {
   constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.img = beerImg;
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
