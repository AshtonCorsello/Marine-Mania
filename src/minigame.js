//////////////////////////////////////////////////////////////////////
/////////////////////////////MINIGAME FUNCTIONS///////////////////////
//////////////////////////////////////////////////////////////////////

var death = true;
var currentDead = false;
var displayBox;
var miniplayer;
var plankX;
var plankWidth;
var pSetup = false;
var fSetup = false;
var onPlank = false;
let plank1, plank2, plank3, plank4, plank5;
let foe1, foe2, foe3, foe4;
let foes = [];
let planks = [];

function isFirstDeath(){ // Checks to see if this is the player's first death
  return death;
}

function isCurrentlyDead(){ // Checks to see if the player is currently dead
  return currentDead;
}

function isPlankSetup(){ // Checks to see if the planks have been intialized
  return pSetup;
}

function isFoeSetup(){ // Checks to see if the foes have been initialized
  return fSetup;
}

function minigameDisplay(){// Displays the minigame
  miniplayer.display();
  miniplayer.update();
  if(isPlankSetup() == false){// First time setup for the planks
    plankSetup();
  }
  if(isFoeSetup() == false){// FIrst time setup for the foes
    foeSetup();
  }
  plankMove(); // Planks move left and right
  plankCollision(); // Checks to see if the player is on the planks
  foeMove(); // Foes move left and right
  foeCollision(); // Checks to see if the foes have collided with the player
  if(miniplayer.y < (CANV_HEIGHT/2)-(CANV_HEIGHT/5.1)){// If the player reaches the top plank
    minigameEnd();
  }
}

function minigameEnd(){ // Ends the minigame and returns the state back to normal
  removeElements(icon);
  unpause();
  minigameOpenShield(); // Gives the player a shield for 5 secs after death
  currentDead = false;
  death = false;
  player.setHitFalse();
}

function plankSetup(){// Setup for the planks on the board
  displaybox = rect(CANV_WIDTH/2, CANV_HEIGHT/2, CANV_HEIGHT/2, CANV_HEIGHT/2); // Dedicates the space the on death minigame should be displayed in
  plankWidth = random([(CANV_HEIGHT/4), (CANV_HEIGHT/8), (CANV_HEIGHT/6)]);
  plankX = (CANV_WIDTH/2);
  plankDirection = random(["left", "right"]);
  plank1 = new Plank(plankX, (CANV_HEIGHT/2)+(CANV_HEIGHT/5), plankWidth, (CANV_HEIGHT/10), plankDirection);
  plankWidth = random([(CANV_HEIGHT/4), (CANV_HEIGHT/8), (CANV_HEIGHT/6)]);
  plankX = random([(CANV_WIDTH/2)+(CANV_HEIGHT/10), (CANV_WIDTH/2), (CANV_WIDTH/2)-(CANV_HEIGHT/10)]);
  plankDirection = random(["left", "right"]);
  plank2 = new Plank(plankX, (CANV_HEIGHT/2)+(CANV_HEIGHT/10), plankWidth, (CANV_HEIGHT/10), plankDirection);
  plankWidth = random([(CANV_HEIGHT/4), (CANV_HEIGHT/8), (CANV_HEIGHT/6)]);
  plankX = random([(CANV_WIDTH/2)+(CANV_HEIGHT/10), (CANV_WIDTH/2), (CANV_WIDTH/2)-(CANV_HEIGHT/10)]);
  plankDirection = random(["left", "right"]);
  plank3 = new Plank(plankX, (CANV_HEIGHT/2), plankWidth, (CANV_HEIGHT/10), plankDirection);
  plankWidth = random([(CANV_HEIGHT/4), (CANV_HEIGHT/8), (CANV_HEIGHT/6)]);
  plankX = random([(CANV_WIDTH/2)+(CANV_HEIGHT/10), (CANV_WIDTH/2), (CANV_WIDTH/2)-(CANV_HEIGHT/10)]);
  plankDirection = random(["left", "right"]);
  plank4 = new Plank(plankX, (CANV_HEIGHT/2)-(CANV_HEIGHT/5), plankWidth, (CANV_HEIGHT/10), plankDirection);
  plankWidth = random([(CANV_HEIGHT/4), (CANV_HEIGHT/8), (CANV_HEIGHT/6)]);
  plankX = random([(CANV_WIDTH/2)+(CANV_HEIGHT/10), (CANV_WIDTH/2), (CANV_WIDTH/2)-(CANV_HEIGHT/10)]);
  plankDirection = random(["left", "right"]);
  plank5 = new Plank(plankX, (CANV_HEIGHT/2)-(CANV_HEIGHT/10), plankWidth, (CANV_HEIGHT/10), plankDirection);
  planks = [plank1, plank2, plank3, plank4, plank5];
  pSetup = true;
}

function plankMove(){// Calls all planks to move
  displaybox = rect(CANV_WIDTH/2, CANV_HEIGHT/2, CANV_HEIGHT/2, CANV_HEIGHT/2); // Dedicates the space the on death minigame should be displayed in
  for(let i = 0; i< planks.length; ++i){
    planks[i].move();
  }
}

function foeSetup(){ // Setup for the foes on the board
  foeX = random([(CANV_WIDTH/2)-(CANV_HEIGHT/6), (CANV_WIDTH/2),(CANV_WIDTH/2)+(CANV_HEIGHT/6)]);
  if(foeX == (CANV_WIDTH/2)-(CANV_HEIGHT/4)){
    foeDirection = "right";
  }
  else{
    foeDirection = "left";
  }
  foeImg = random([enemy1Image, enemy2Image]);
  foe1 = new Foe(foeX, (CANV_HEIGHT/2)+(CANV_HEIGHT/10), (CANV_HEIGHT/10), (CANV_HEIGHT/10), foeDirection, foeImg);
  foeX = random([(CANV_WIDTH/2)-(CANV_HEIGHT/6), (CANV_WIDTH/2),(CANV_WIDTH/2)+(CANV_HEIGHT/6)]);
  if(foeX == (CANV_WIDTH/2)-(CANV_HEIGHT/4)){
    foeDirection = "right";
  }
  else{
    foeDirection = "left";
  }
  foeImg = random([enemy1Image, enemy2Image]);
  foe2 = new Foe(foeX, (CANV_HEIGHT/2), (CANV_HEIGHT/10), (CANV_HEIGHT/10), foeDirection, foeImg);
  foeX = random([(CANV_WIDTH/2)-(CANV_HEIGHT/6), (CANV_WIDTH/2),(CANV_WIDTH/2)+(CANV_HEIGHT/6)]);
  if(foeX == (CANV_WIDTH/2)-(CANV_HEIGHT/4)){
    foeDirection = "right";
  }
  else{
    foeDirection = "left";
  }
  foeImg = random([enemy1Image, enemy2Image]);
  foe3 = new Foe(foeX, (CANV_HEIGHT/2)-(CANV_HEIGHT/5), (CANV_HEIGHT/10), (CANV_HEIGHT/10), foeDirection, foeImg);
  foeX = random([(CANV_WIDTH/2)-(CANV_HEIGHT/6), (CANV_WIDTH/2),(CANV_WIDTH/2)+(CANV_HEIGHT/6)]);
  if(foeX == (CANV_WIDTH/2)-(CANV_HEIGHT/4)){
    foeDirection = "right";
  }
  else{
    foeDirection = "left";
  }
  foeImg = random([enemy1Image, enemy2Image]);
  foe4 = new Foe(foeX, (CANV_HEIGHT/2)-(CANV_HEIGHT/10), (CANV_HEIGHT/10), (CANV_HEIGHT/10), foeDirection, foeImg);
  foes = [foe1, foe2, foe3, foe4];
  fSetup = true;
}

function foeMove(){// Calls all foes to move
  for(let i = 0; i< foes.length; ++i){
    foes[i].move();
  }
}

function plankCollision(){// Checks to see if the player is on a plank, if not game over
  onPlank = false;
  for(let i = 0; i< planks.length; ++i){
    if(planks[i].x-planks[i].width/2 <= miniplayer.x && miniplayer.x <= planks[i].x+planks[i].width/2){
      if(planks[i].y-planks[i].height <= miniplayer.y && miniplayer.y <= planks[i].y+planks[i].height){
        onPlank = true;
      }
    }
  }
  if(onPlank == false){
    icon.remove();
    unpause();
    changeMode(9);
  }
}

function foeCollision(){// Checks to see if the player has collided with one of the foes, if so game over
  for(let i = 0; i < foes.length; ++i){
    if(foes[i].x-foes[i].size < miniplayer.x && miniplayer.x < foes[i].x+foes[i].size){
      if(foes[i].y-foes[i].size < miniplayer.y && miniplayer.y < foes[i].y+foes[i].size){
        icon.remove();
        unpause();
        changeMode(9);
      }
    }
  }
}

class Plank{
  constructor(x, y, width, height, direction){
    this.x = x; 
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
  }

  move(){
    if(this.direction == "right"){
      this.x += 1;
      if((CANV_WIDTH/2)+(CANV_HEIGHT/10) < this.x ){
        this.direction = "left";
      }
    }
    else{
      this.x -= 1;
      if(this.x < (CANV_WIDTH/2)-(CANV_HEIGHT/10)){
        this.direction = "right";
      }
    }
    rect(this.x, this.y, this.width, this.height);
  }
}

class Foe{
  constructor(x, y, width, height, direction, img){
    this.x = x; 
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.img = img;
    this.size = 10*CANV_SCALAR;
  }
  
  move(){
    if(this.direction == "right"){
      this.x += 1;
      if((CANV_WIDTH/2)+(CANV_HEIGHT/6) < this.x){
        this.direction = "left";
      }
    }
    else{
      this.x -= 1;
      if(this.x < (CANV_WIDTH/2)-(CANV_HEIGHT/4)){
        this.direction = "right";
      }
    }
    image(this.img, this.x, this.y);
  }
}
