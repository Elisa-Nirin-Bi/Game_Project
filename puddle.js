class Puddle {
  constructor (game, x, y,) {
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
   
    //context.fillRect(350, 400, 40, 5);"#ADD8E6"
    context.beginPath();
    context.arc(350, 400, 20, 0, 1 * Math.PI);
    context.arc(650, 400, 20, 0, 1 * Math.PI);
    context.fillStyle = "#A06152";
    context.fill();
    context.stroke()
 
    }
   
    }
