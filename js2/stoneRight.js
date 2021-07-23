class StoneRight {
  constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
  }

  runLogic () {
    this.x += 2;
  }

  paint () {
    const context = this.game.context;
    context.save();
    context.beginPath();
    context.arc(this.x - this.width , this.y - this.height , 4, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = '#AF6505';
    context.fill();
    /*context.fillStyle = 'yellow';
    context.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );*/
    context.restore();
  }
} 