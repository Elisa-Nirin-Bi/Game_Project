class Player {
  constructor (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

 runLogic(){
 }

  paint () {
    const context = this.game.context;
    const playerImg = new Image();
    playerImg.src = './images/woman-idle.gif';
    context.drawImage(playerImg, 
      this.x - this.width * 2,
      this.y + this.height * 5,
      50,
      this.height);   
    }
    
    }
