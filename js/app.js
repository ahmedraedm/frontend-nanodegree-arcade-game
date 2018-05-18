let xPlayer=0;
let yPlayer=0;
// Enemies our player must avoid
var Enemy = function(xLoc,yLoc,eSpeed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = xLoc;
    this.y = yLoc;
    this.speed = eSpeed; // enemy speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //Handles collision with the Player
  if((Math.abs(player.x-this.x)<75 && this.y===player.y)){
    // alert('You lose!');
    player.y = 315;
  }
  else if (player.y<60) {
    alert('You Win!');
    player.y = 315;
  }
    //Reset Enemy location & speed
  else if (this.x>500) {
    this.x = -50;
    this.speed = Math.floor(Math.random() * 120) + 80;
    //Updates the Enemy location
  }
  else{
    this.x += (this.speed*dt);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Player = function(xLoc,yLoc){
  this.sprite = 'images/char-boy.png';
  this.x = xLoc;
  this.y = yLoc;
}
Player.prototype.update = function() {
  this.x += xPlayer;
  this.y += yPlayer;
  xPlayer =0;
  yPlayer = 0;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Place the player object in a variable called player
let myPlayer = new Player(200,315);
var player = myPlayer;
// player handleInput() method.
player.handleInput = function(key){
  switch (key) {
    case 'left':
      xPlayer=-100;
      yPlayer=0 // no change
      break;
    case 'up':
      xPlayer= 0; // no change
      yPlayer= -85
      break;
    case 'right':
      xPlayer= 100;
      yPlayer= 0 // no change
      break;
    case 'down':
      xPlayer= 0; // no change
      yPlayer= 85
      break;
  }
}

// Place all enemy objects in an array called allEnemies
//Setting the Enemy initial speed & location
let e1 = new Enemy(-50,60,70);
let e2 = new Enemy(-70,60,90);
let e3 = new Enemy(-50,145,60);
let e4 = new Enemy(-90,145,70);
let e5 = new Enemy(-65,230,80);
let e6 = new Enemy(-120,230,100);
var allEnemies = [e1,e2,e3,e4,e5,e6];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
