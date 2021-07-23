class Stone {
  constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
  }

  runLogic () {
    this.y -= 2;
  }

  paint () {
    const context = this.game.context;
    context.save();
    context.beginPath();
    context.arc(this.x - this.width / 2, this.y - this.height / 2, 4, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = '#AF6505';
    context.fill();
    context.restore();
  }
} 