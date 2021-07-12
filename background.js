class Background {
  constructor (game, x, y) {
    this.game = game;
    this.x = 0;
    this.y = y;
    this.width = 400;
    this.height = 500;
  }

 runLogic(){
   
 }

  paint () {
    
    const context = this.game.context;
     const backgroundImg = new Image();
    backgroundImg.src = './images/n.png';
        context.drawImage(backgroundImg, 
       0,
      0,
      this.width,
      this.height);
        
        }

        
    }
    
    
