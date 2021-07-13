const imageUrls = [];

for (let i = 1; i <= 2; i++) {
  imageUrls.push(`./images/bcKImg-${i}.png`);
}

const levels = imageUrls.map(url => {
  const bckImg = new Image();
  bckImg.src = url;
  return bckImg;
});

class Background {
  constructor (game) {
    this.game = game;
  }

  paint () {
    const context = this.game.context;
    const canvas = context.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const depth= this.game.player.x;
    
    for (let i = 0; i <  levels.length; i++) {
      const level = levels[i];
      const outset = (depth * i / 2) % width;
      context.drawImage(level, -outset, 0, width, height);
      context.drawImage(level, -outset + width, 0, width, height);
    }
  }
}